import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createHmac } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { Miniflare, convertV4MiniflareOptions } from 'miniflare';

test('Workers sends SDK requests and rejects redirects without forwarding credentials', { timeout: 30000 }, async t => {
  const requests = [];
  let redirectStatus = null;
  const origin = async (request, response) => {
    const chunks = [];
    for await (const chunk of request) chunks.push(chunk);
    const url = new URL(request.url, `https://${request.headers.host}`);
    requests.push({ url, headers: request.headers, body: Buffer.concat(chunks) });
    response.setHeader('Content-Type', 'application/json');
    if (redirectStatus !== null) {
      response.statusCode = redirectStatus;
      response.setHeader('Location', 'https://redirect.example/capture');
    } else response.statusCode = url.hostname === 'api.telegram.org' ? 200 : 202;
    // A successful-looking body must never turn a redirect into a Bot API success.
    response.end(JSON.stringify({ ok: true, result: true }));
  };

  const bundle = await build({
    stdin: {
      resolveDir: fileURLToPath(new URL('..', import.meta.url)),
      contents: `
        import { createWebTgSupport, fetchBotApi } from 'tg-support-sdk';
        const client = createWebTgSupport({
          botToken: '1:worker-test-token',
          service: { url: 'https://service.example/v1', botSecret: 'tgs1.00000000-0000-4000-8000-000000000007.AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' },
          keys: { tokenKey: new Uint8Array(32), seal: { current: 'Ab3x', keys: { Ab3x: new Uint8Array(32) } } },
          supportGroupId: -1, features: { notificationsTopic: false, welcomeHint: false },
          transport: { kind: 'push', hostUrl: 'https://host.example/commands' }, configRevision: 1,
        });
        const telegram = fetchBotApi({ token: '1:worker-test-token' });
        export default {
          async fetch(request) {
            const result = new URL(request.url).pathname === '/service'
              ? await client.send([{ type: 'operation_result', eventId: 'worker-result', opId: '0', attemptToken: 'AAAAAAAAAAAAAAAAAAAAAA', outcome: { kind: 'rejected_by_host', reason: 'binding_invalid' } }])
              : await telegram.call({ method: 'pinChatMessage', params: { chat_id: -1, message_id: 1 } });
            return Response.json(result);
          },
        };
      `,
    },
    bundle: true, write: false, format: 'esm', platform: 'browser', target: 'es2022',
  });
  const runtime = new Miniflare(convertV4MiniflareOptions({
    modules: true, script: bundle.outputFiles[0].text, compatibilityDate: '2026-10-06',
    outboundService: { node: origin },
  }));
  t.after(() => runtime.dispose());

  for (const api of ['service', 'telegram']) {
    await t.test(api, async t => {
      redirectStatus = null;
      requests.length = 0;
      const accepted = await (await runtime.dispatchFetch(`https://host.example/${api}`)).json();
      assert.deepEqual(accepted, api === 'service' ? { kind: 'accepted' } : { ok: true });
      assert.equal(requests.length, 1);
      const sent = requests[0];
      if (api === 'service') {
        assert.equal(sent.url.href, 'https://service.example/v1/events');
        const timestamp = sent.headers['x-tg-support-timestamp'];
        const signature = createHmac('sha256', Buffer.alloc(32))
          .update(`TGS1-REQ\n${timestamp}\nPOST\n/v1/events\n`).update(sent.body).digest('hex');
        assert.equal(sent.headers['x-tg-support-signature'], `v1=${signature}`);
        assert.equal(sent.headers['x-tg-support-bot'], '00000000-0000-4000-8000-000000000007');
      } else assert.equal(sent.url.href, 'https://api.telegram.org/bot1:worker-test-token/pinChatMessage');

      for (const status of [301, 302, 303, 307, 308]) {
        await t.test(`HTTP ${status}`, async () => {
          redirectStatus = status;
          requests.length = 0;
          const rejected = await (await runtime.dispatchFetch(`https://host.example/${api}`)).json();
          assert.deepEqual(rejected, api === 'service'
            ? { kind: 'retryable', reason: 'network' }
            : { ok: false, kind: 'transport', description: 'Telegram request failed.' });
          assert.equal(requests.length, 1, 'The redirect target must receive no request or credentials');
          assert.notEqual(requests[0].url.hostname, 'redirect.example');
        });
      }
    });
  }
});
