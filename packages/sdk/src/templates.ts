import type { FormattedText, TemplateId, TemplateConfig, TelegramUserProfile } from "./types.ts";

export function renderTemplate(id: TemplateId, code: string | null, profile: TelegramUserProfile | null, config?: TemplateConfig, verifiedUserId: number | null = null): FormattedText {
  const languages = config?.languages ?? ["ru", "en"];
  const fallback = config?.fallback ?? "en";
  const requested = code?.toLowerCase() ?? "";
  const requestedLanguage = languages.find((item) => item === requested) ?? languages.find((item) => item === requested.split("-")[0]) ?? fallback;
  const translations = config?.overrides?.[id];
  const language = translations?.[requestedLanguage] || !translations?.[fallback] ? requestedLanguage : fallback;
  const override = translations?.[language];
  let rendered: FormattedText;
  if (override) rendered = override({ profile, language, verifiedUserId });
  else {
    const fullName = [profile?.firstName, profile?.lastName].filter((part) => part && part.trim() !== "").join(" ");
    const name = fullName || (profile?.username ? `@${profile.username}` : "");
    const texts: Record<TemplateId, string> = language === "ru" ? {
      topic_title: name, topic_header: "Пользователь:", new_user_notice: "🆕 Новый пользователь:",
      notifications_topic_title: "Уведомления", welcome_hint: "Если нужна помощь — просто напишите в этот чат, мы передадим сообщение в поддержку.",
      user_edited: "✏️ Пользователь изменил сообщение.", edited_by_support: "✏️ Сообщение выше было изменено поддержкой.", replaced_by_support: "🔁 Предыдущее сообщение нельзя было изменить, поэтому мы удалили его и отправили новое.",
    } : {
      topic_title: name, topic_header: "User:", new_user_notice: "🆕 New user:",
      notifications_topic_title: "Notifications", welcome_hint: "If you need help, just write in this chat — we will forward it to support.",
      user_edited: "✏️ The user edited this message.", edited_by_support: "✏️ The message above was edited by support.", replaced_by_support: "🔁 The previous message could not be edited, so we deleted it and sent a new one.",
    };
    rendered = { text: texts[id] };
    if (id === "topic_title" && verifiedUserId !== null) rendered = { text: [name || null, `(#u${verifiedUserId})`].filter((part) => part !== null).join(" • ") };
    if ((id === "topic_header" || id === "new_user_notice") && verifiedUserId !== null) {
      const label = texts[id]; const prefix = fullName ? `${label} ` : `${label} 👤 `; const linked = fullName || String(verifiedUserId);
      const tail = [profile?.username ? `@${profile.username}` : null, `(#u${verifiedUserId})`].filter((part) => part !== null).join(" ");
      const instruction = id === "topic_header" ? language === "ru" ? "Пишите в этой теме, и пользователь получит ответ в своём чате с ботом." : "Write in this topic and the user will receive your reply in their chat with the bot." : language === "ru" ? "Чтобы написать пользователю, ответьте на это сообщение." : "Reply to this message to contact the user.";
      rendered = { text: `${prefix}${linked} ${tail}\n\n${instruction}`, entities: [{ type: "text_link", offset: prefix.length, length: linked.length, url: `tg://user?id=${verifiedUserId}` }] };
    }
  }
  return id === "topic_title" ? { ...rendered, text: Array.from(rendered.text).slice(0, 128).join("") } : rendered;
}
