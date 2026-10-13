import type { Event, Outcome, Command as WireCommand, Method, MethodParams, TemplateId, BlobPurpose, TokenPurpose } from "tg-support-protocol";

type Camel<S extends string> = S extends `${infer A}_${infer B}` ? `${A}${Capitalize<Camel<B>>}` : S;
type Known<T> = { [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K] };
export type CamelData<T> = T extends readonly (infer U)[] ? CamelData<U>[] : T extends object
  ? { [K in keyof Known<T> as K extends string ? Camel<K> : K]: CamelData<T[K]> } : T;
export type TgSupportEvent = CamelData<Event>;
export type TgSupportOutcome = CamelData<Outcome>;
export type Command = Omit<CamelData<WireCommand>, "params"> & { params: Readonly<Record<string, unknown>>; receivedAt: number; expiresAt: number };
export type CommandRecipe = { [M in Method]: { method: M; params: MethodParams[M] } }[Method];
export type { Method, TemplateId, BlobPurpose, TokenPurpose };
export type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
export type TelegramUserProfile = { firstName?: string; lastName?: string; username?: string; languageCode?: string };
export type FormattedText = { text: string; entities?: readonly Record<string, Json>[] };
export type RenderContext = { profile: TelegramUserProfile | null; language: string; verifiedUserId: number | null; reactions: string | null };
export type Render = (context: RenderContext) => FormattedText;
export type TemplateConfig = { languages: readonly string[]; fallback: string; overrides?: Partial<Record<TemplateId, Partial<Record<string, Render>>>> };
export type TgSupportKeys = { tokenKey: Uint8Array; seal: { current: string; keys: Readonly<Record<string, Uint8Array>> } };
export type TgSupportConfig = {
  service: { url: string; botSecret: string };
  keys: TgSupportKeys;
  supportGroupId: number;
  previousSupportGroupIds?: readonly number[];
  features: { notificationsTopic: boolean; welcomeHint: boolean };
  transport: { kind: "push"; hostUrl: string } | { kind: "pull" };
  attemptDeadlineSeconds?: number;
  configRevision: number;
  templates?: TemplateConfig;
};
export type Fetch = (request: Request) => Promise<Response>;
export type Clock = { now(): number };
export type Logger = { debug?(event: { kind: string }): void; warn?(event: { kind: string; reason?: string }): void };
export type TgSupportOptions = { fetch?: Fetch; clock?: Clock; logger?: Logger; resolveProfile?: (userId: number) => Promise<TelegramUserProfile | null> };
export type WaitUntil = (promise: Promise<unknown>) => void;
export type SendResult =
  | { kind: "accepted" }
  | { kind: "retryable"; reason: "network" | "rate_limited" | "server_error"; retryAfterMs?: number }
  | { kind: "fatal"; status: number; reason: string; detail: string; acceptedTypes?: readonly string[] };
export type BotApiOutcome =
  | { ok: true; messageId?: number; threadId?: number }
  | { ok: false; kind: "telegram"; errorCode: number; description: string; retryAfter: number | null }
  | { ok: false; kind: "transport"; description: string };
export type TelegramRequest = { [M in Method]: { method: M; params: TelegramParams[M] } }[Method];
type Target = { chat_id: number };
type MessageTarget = Target & { message_id: number };
type Thread = { message_thread_id?: number };
type Reply = { reply_parameters?: { message_id: number } };
export type TelegramParams = {
  createForumTopic: Target & { name: string };
  editForumTopic: Target & { message_thread_id: number; name: string };
  unpinAllForumTopicMessages: Target & { message_thread_id: number };
  sendMessage: Target & Thread & Reply & FormattedText;
  copyMessage: Target & Thread & Reply & { from_chat_id: number; message_id: number };
  editMessageText: MessageTarget & FormattedText & { link_preview_options?: Record<string, Json> };
  editMessageCaption: MessageTarget & { caption: string; caption_entities?: readonly Record<string, Json>[]; show_caption_above_media?: boolean };
  deleteMessage: MessageTarget;
  setMessageReaction: MessageTarget & { reaction: readonly Record<string, Json>[] };
  pinChatMessage: MessageTarget & { disable_notification?: boolean };
};
export type GroupFacts = { found: false } | { found: true; isForum: boolean; botStatus: string; canManageTopics: boolean };
export interface BotApi {
  call(request: TelegramRequest): Promise<BotApiOutcome>;
  getProfile(request: { method: "getChat"; chatId: number }): Promise<{ ok: true; profile: TelegramUserProfile } | Extract<BotApiOutcome, { ok: false }>>;
  getMe(): Promise<{ id: number; username: string }>;
  inspectGroup(chatId: number, botId: number): Promise<GroupFacts>;
}
export interface TgSupport {
  normalize(update: unknown): Promise<TgSupportEvent | null>;
  hostNotice(user: { id: number; profile: TelegramUserProfile }, text: FormattedText, idempotencyKey?: string): Promise<TgSupportEvent>;
  userForget(userId: number): Promise<TgSupportEvent>;
  send(events: readonly TgSupportEvent[]): Promise<SendResult>;
  receivePush(request: Request): Promise<{ response: Response; commands: Command[] }>;
  handleUpdate(update: unknown, options?: { waitUntil?: WaitUntil }): Promise<void>;
  handleCommandRequest(request: Request, options?: { waitUntil?: WaitUntil }): Promise<Response>;
  execute(command: Command): Promise<TgSupportEvent | null>;
  claim(): Promise<Command[]>;
  heartbeat(command: Command): Promise<{ kind: "accepted"; command: Command } | Exclude<SendResult, { kind: "accepted" }>>;
  readonly allowedUpdates: readonly string[];
}
