/* Generated from schema/v1/schema.json. Run npm run generate; do not edit. */

/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "Token".
 */
export type Token = string;
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "SealedBlob".
 */
export type SealedBlob = string;
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "EventId".
 */
export type EventId = string;
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "OpId".
 */
export type OpId = string;
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "AttemptToken".
 */
export type AttemptToken = string;
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "DeadlineSeconds".
 */
export type DeadlineSeconds = number;
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "TokenPurpose".
 */
export type TokenPurpose = "user" | "group" | "message" | "thread" | "profile";
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "BlobPurpose".
 */
export type BlobPurpose =
  | "private_chat"
  | "group_chat"
  | "message_id"
  | "thread_id"
  | "language"
  | "edit_content"
  | "reactions"
  | "notice_text"
  | "binding"
  | "start_payload";
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "TemplateId".
 */
export type TemplateId =
  | "topic_title"
  | "topic_header"
  | "new_user_notice"
  | "notifications_topic_title"
  | "welcome_hint"
  | "user_edited"
  | "edited_by_support"
  | "replaced_by_support"
  | "user_reacted";
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "Method".
 */
export type Method =
  | "createForumTopic"
  | "editForumTopic"
  | "unpinAllForumTopicMessages"
  | "sendMessage"
  | "copyMessage"
  | "editMessageText"
  | "editMessageCaption"
  | "deleteMessage"
  | "setMessageReaction"
  | "pinChatMessage";
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "ParamValue".
 */
export type ParamValue = (string | number | boolean | null) | SealedRef | TemplateRef;
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "BotConfiguredEvent".
 */
export type BotConfiguredEvent = BotConfiguredEvent1;
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "SupportMessageEvent".
 */
export type SupportMessageEvent = SupportMessageEvent1;
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "Created".
 */
export type Created = null | CreatedMessage | CreatedTopic;
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "Outcome".
 */
export type Outcome = SuccessOutcome | TelegramErrorOutcome | TransportErrorOutcome | HostRejectedOutcome;
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "Event".
 */
export type Event =
  | BotConfiguredEvent
  | UserMessageEvent
  | UserInteractionEvent
  | UserEditEvent
  | UserReactionEvent
  | SupportMessageEvent
  | SupportEditEvent
  | SupportReactionEvent
  | HostNoticeEvent
  | UserForgetEvent
  | OperationResultEvent;
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "HostRequest".
 */
export type HostRequest = PushEnvelope | ChallengeRequest;
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "TopicNameRef".
 */
export type TopicNameRef = TopicTitleRef | NotificationsTitleRef;
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "TextTemplateRef".
 */
export type TextTemplateRef =
  | {
      template: "topic_header" | "new_user_notice";
      language: SealedRef;
      user: SealedRef;
      source?: SealedRef;
      [k: string]: unknown | undefined;
    }
  | {
      template: "welcome_hint" | "user_edited" | "edited_by_support" | "replaced_by_support";
      language: SealedRef;
      [k: string]: unknown | undefined;
    }
  | {
      template: "user_reacted";
      language: SealedRef;
      reactions: SealedRef;
      [k: string]: unknown | undefined;
    };
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "TextRef".
 */
export type TextRef = SealedRef | TextTemplateRef;
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "EditMessageTextParams".
 */
export type EditMessageTextParams = EditMessageTextContentParams | EditMessageTextTemplateParams;
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "Binding".
 */
export type Binding = TopicBinding | NoticeBinding;
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "EditContentPayload".
 */
export type EditContentPayload = TextEditPayload | CaptionEditPayload;

/**
 * Wire contracts from docs/design/protocol.md. Unknown fields are accepted and consumers use only documented fields. Command envelope validation precedes method authorization; method recipes and AEAD address checks are separate.
 */
export interface ProtocolV1 {
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "SealedRef".
 */
export interface SealedRef {
  sealed: SealedBlob;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "TemplateRef".
 */
export interface TemplateRef {
  template: string;
  language: SealedRef;
  user?: SealedRef;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "Revision".
 */
export interface Revision {
  edit_date: number;
  update_id: number;
  [k: string]: unknown | undefined;
}
export interface BotConfiguredEvent1 {
  type: "bot_configured";
  event_id: EventId;
  telegram_bot_id: number;
  group: Token;
  group_chat: SealedBlob;
  features: {
    notifications_topic: boolean;
    welcome_hint: boolean;
    [k: string]: unknown | undefined;
  };
  transport: "push" | "pull";
  host_url: string | null;
  deadline_seconds: DeadlineSeconds;
  sdk_version: string;
  config_revision: number;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "UserMessageEvent".
 */
export interface UserMessageEvent {
  type: "user_message";
  event_id: EventId;
  user: Token;
  chat: SealedBlob;
  profile: Token;
  language: SealedBlob;
  message: Token;
  message_id: SealedBlob;
  reply_to: Token | null;
  copyable: boolean;
  is_bot_command: boolean;
  is_start: boolean;
  start_payload?: SealedBlob;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "UserInteractionEvent".
 */
export interface UserInteractionEvent {
  type: "user_interaction";
  event_id: EventId;
  user: Token;
  chat: SealedBlob;
  profile: Token;
  language: SealedBlob;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "UserEditEvent".
 */
export interface UserEditEvent {
  type: "user_edit";
  event_id: EventId;
  user: Token;
  message: Token;
  revision: Revision;
  field: "text" | "caption";
  content: SealedBlob;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "UserReactionEvent".
 */
export interface UserReactionEvent {
  type: "user_reaction";
  event_id: EventId;
  user: Token;
  message: Token;
  reactions: SealedBlob;
  cleared?: boolean;
  [k: string]: unknown | undefined;
}
export interface SupportMessageEvent1 {
  type: "support_message";
  event_id: EventId;
  group: Token;
  thread: Token;
  message: Token;
  message_id: SealedBlob;
  reply_to: Token | null;
  reply_scoped_message_id: SealedBlob | null;
  copyable: boolean;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "SupportEditEvent".
 */
export interface SupportEditEvent {
  type: "support_edit";
  event_id: EventId;
  group: Token;
  thread: Token;
  message: Token;
  revision: Revision;
  field: "text" | "caption";
  content: SealedBlob;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "SupportReactionEvent".
 */
export interface SupportReactionEvent {
  type: "support_reaction";
  event_id: EventId;
  group: Token;
  message: Token;
  reactions: SealedBlob;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "HostNoticeEvent".
 */
export interface HostNoticeEvent {
  type: "host_notice";
  event_id: EventId;
  user: Token;
  chat: SealedBlob;
  profile: Token;
  language: SealedBlob;
  text: SealedBlob;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "UserForgetEvent".
 */
export interface UserForgetEvent {
  type: "user_forget";
  event_id: EventId;
  user: Token;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "CreatedMessage".
 */
export interface CreatedMessage {
  kind: "message";
  message: Token;
  message_id: SealedBlob;
  binding: SealedBlob | null;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "CreatedTopic".
 */
export interface CreatedTopic {
  kind: "topic";
  thread: Token;
  thread_id: SealedBlob;
  binding: SealedBlob | null;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "SuccessOutcome".
 */
export interface SuccessOutcome {
  kind: "success";
  created: Created;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "TelegramErrorOutcome".
 */
export interface TelegramErrorOutcome {
  kind: "telegram_error";
  error_code: number;
  description: string;
  retry_after: number | null;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "TransportErrorOutcome".
 */
export interface TransportErrorOutcome {
  kind: "transport_error";
  description?: string;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "HostRejectedOutcome".
 */
export interface HostRejectedOutcome {
  kind: "rejected_by_host";
  reason: string;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "OperationResultEvent".
 */
export interface OperationResultEvent {
  type: "operation_result";
  event_id: EventId;
  op_id: OpId;
  attempt_token: AttemptToken;
  outcome: Outcome;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "EventBatch".
 */
export interface EventBatch {
  /**
   * @minItems 1
   * @maxItems 100
   */
  events: Event[];
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "Command".
 */
export interface Command {
  op_id: OpId;
  attempt_token: AttemptToken;
  deadline_seconds: DeadlineSeconds;
  subject: Token;
  method: string;
  params: {
    [k: string]: unknown | undefined;
  };
  binding: SealedBlob | null;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "PushEnvelope".
 */
export interface PushEnvelope {
  kind: "commands";
  /**
   * @minItems 1
   * @maxItems 50
   */
  commands: Command[];
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "ChallengeRequest".
 */
export interface ChallengeRequest {
  kind: "challenge";
  nonce: string;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "ChallengeResponse".
 */
export interface ChallengeResponse {
  kind: "challenge";
  response: string;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "ClaimRequest".
 */
export interface ClaimRequest {
  max?: number;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "ClaimResponse".
 */
export interface ClaimResponse {
  /**
   * @maxItems 50
   */
  commands: Command[];
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "HeartbeatRequest".
 */
export interface HeartbeatRequest {
  op_id: OpId;
  attempt_token: AttemptToken;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "HeartbeatResponse".
 */
export interface HeartbeatResponse {
  extended: true;
  remaining_seconds: number;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "RejectResponse".
 */
export interface RejectResponse {
  reason: string;
  index?: number;
  detail?: string;
  accepted_types?: string[];
  min_version?: string;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "TopicTitleRef".
 */
export interface TopicTitleRef {
  template: "topic_title";
  language: SealedRef;
  user: SealedRef;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "NotificationsTitleRef".
 */
export interface NotificationsTitleRef {
  template: "notifications_topic_title";
  language: SealedRef;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "CreateForumTopicParams".
 */
export interface CreateForumTopicParams {
  chat_id: SealedRef;
  name: TopicNameRef;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "EditForumTopicParams".
 */
export interface EditForumTopicParams {
  chat_id: SealedRef;
  message_thread_id: SealedRef;
  name: TopicTitleRef;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "UnpinAllForumTopicMessagesParams".
 */
export interface UnpinAllForumTopicMessagesParams {
  chat_id: SealedRef;
  message_thread_id: SealedRef;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "SendMessageParams".
 */
export interface SendMessageParams {
  chat_id: SealedRef;
  message_thread_id?: SealedRef | null;
  text: TextRef;
  reply_to_message_id?: SealedRef | null;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "CopyMessageParams".
 */
export interface CopyMessageParams {
  chat_id: SealedRef;
  message_thread_id?: SealedRef | null;
  from_chat_id: SealedRef;
  message_id: SealedRef;
  reply_to_message_id?: SealedRef | null;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "EditMessageTextContentParams".
 */
export interface EditMessageTextContentParams {
  chat_id: SealedRef;
  message_id: SealedRef;
  source_message_id?: SealedRef;
  content: SealedRef;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "EditMessageTextTemplateParams".
 */
export interface EditMessageTextTemplateParams {
  chat_id: SealedRef;
  message_id: SealedRef;
  text: TextTemplateRef;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "EditMessageCaptionParams".
 */
export interface EditMessageCaptionParams {
  chat_id: SealedRef;
  message_id: SealedRef;
  source_message_id?: SealedRef;
  content: SealedRef;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "DeleteMessageParams".
 */
export interface DeleteMessageParams {
  chat_id: SealedRef;
  message_id: SealedRef;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "SetMessageReactionParams".
 */
export interface SetMessageReactionParams {
  chat_id: SealedRef;
  message_id: SealedRef;
  source_message_id?: SealedRef;
  reaction: SealedRef | "👀";
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "PinChatMessageParams".
 */
export interface PinChatMessageParams {
  chat_id: SealedRef;
  message_id: SealedRef;
  disable_notification?: boolean;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "PrivateChatPayload".
 */
export interface PrivateChatPayload {
  chat_id: number;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "GroupChatPayload".
 */
export interface GroupChatPayload {
  chat_id: number;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "MessageIdPayload".
 */
export interface MessageIdPayload {
  message_id: number;
  chat_id: number;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "ThreadIdPayload".
 */
export interface ThreadIdPayload {
  thread_id: number;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "LanguagePayload".
 */
export interface LanguagePayload {
  language_code: string | null;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "StartPayloadPayload".
 */
export interface StartPayloadPayload {
  payload: string;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "TopicBinding".
 */
export interface TopicBinding {
  kind: "topic";
  thread: Token;
  user: Token;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "NoticeBinding".
 */
export interface NoticeBinding {
  kind: "notice";
  notice: Token;
  user: Token;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "TextEditPayload".
 */
export interface TextEditPayload {
  field: "text";
  text: string;
  entities?: {
    [k: string]: unknown | undefined;
  }[];
  link_preview_options?: {
    [k: string]: unknown | undefined;
  };
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "CaptionEditPayload".
 */
export interface CaptionEditPayload {
  field: "caption";
  caption: string;
  caption_entities?: {
    [k: string]: unknown | undefined;
  }[];
  show_caption_above_media?: boolean;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "ReactionsPayload".
 */
export interface ReactionsPayload {
  reaction: {
    type: string;
    [k: string]: unknown | undefined;
  }[];
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `ProtocolV1`'s JSON-Schema
 * via the `definition` "NoticeTextPayload".
 */
export interface NoticeTextPayload {
  text: string;
  entities?: {
    [k: string]: unknown | undefined;
  }[];
  [k: string]: unknown | undefined;
}

export interface SchemaTypes {
  Token: Token;
  SealedBlob: SealedBlob;
  EventId: EventId;
  OpId: OpId;
  AttemptToken: AttemptToken;
  DeadlineSeconds: DeadlineSeconds;
  TokenPurpose: TokenPurpose;
  BlobPurpose: BlobPurpose;
  TemplateId: TemplateId;
  Method: Method;
  SealedRef: SealedRef;
  TemplateRef: TemplateRef;
  ParamValue: ParamValue;
  Revision: Revision;
  BotConfiguredEvent: BotConfiguredEvent;
  UserMessageEvent: UserMessageEvent;
  UserInteractionEvent: UserInteractionEvent;
  UserEditEvent: UserEditEvent;
  UserReactionEvent: UserReactionEvent;
  SupportMessageEvent: SupportMessageEvent;
  SupportEditEvent: SupportEditEvent;
  SupportReactionEvent: SupportReactionEvent;
  HostNoticeEvent: HostNoticeEvent;
  UserForgetEvent: UserForgetEvent;
  CreatedMessage: CreatedMessage;
  CreatedTopic: CreatedTopic;
  Created: Created;
  SuccessOutcome: SuccessOutcome;
  TelegramErrorOutcome: TelegramErrorOutcome;
  TransportErrorOutcome: TransportErrorOutcome;
  HostRejectedOutcome: HostRejectedOutcome;
  Outcome: Outcome;
  OperationResultEvent: OperationResultEvent;
  Event: Event;
  EventBatch: EventBatch;
  Command: Command;
  PushEnvelope: PushEnvelope;
  ChallengeRequest: ChallengeRequest;
  ChallengeResponse: ChallengeResponse;
  HostRequest: HostRequest;
  ClaimRequest: ClaimRequest;
  ClaimResponse: ClaimResponse;
  HeartbeatRequest: HeartbeatRequest;
  HeartbeatResponse: HeartbeatResponse;
  RejectResponse: RejectResponse;
  TopicTitleRef: TopicTitleRef;
  NotificationsTitleRef: NotificationsTitleRef;
  TopicNameRef: TopicNameRef;
  TextTemplateRef: TextTemplateRef;
  TextRef: TextRef;
  CreateForumTopicParams: CreateForumTopicParams;
  EditForumTopicParams: EditForumTopicParams;
  UnpinAllForumTopicMessagesParams: UnpinAllForumTopicMessagesParams;
  SendMessageParams: SendMessageParams;
  CopyMessageParams: CopyMessageParams;
  EditMessageTextContentParams: EditMessageTextContentParams;
  EditMessageTextTemplateParams: EditMessageTextTemplateParams;
  EditMessageTextParams: EditMessageTextParams;
  EditMessageCaptionParams: EditMessageCaptionParams;
  DeleteMessageParams: DeleteMessageParams;
  SetMessageReactionParams: SetMessageReactionParams;
  PinChatMessageParams: PinChatMessageParams;
  PrivateChatPayload: PrivateChatPayload;
  GroupChatPayload: GroupChatPayload;
  MessageIdPayload: MessageIdPayload;
  ThreadIdPayload: ThreadIdPayload;
  LanguagePayload: LanguagePayload;
  StartPayloadPayload: StartPayloadPayload;
  TopicBinding: TopicBinding;
  NoticeBinding: NoticeBinding;
  Binding: Binding;
  TextEditPayload: TextEditPayload;
  CaptionEditPayload: CaptionEditPayload;
  EditContentPayload: EditContentPayload;
  ReactionsPayload: ReactionsPayload;
  NoticeTextPayload: NoticeTextPayload;
}

export interface MethodParams {
  createForumTopic: CreateForumTopicParams;
  editForumTopic: EditForumTopicParams;
  unpinAllForumTopicMessages: UnpinAllForumTopicMessagesParams;
  sendMessage: SendMessageParams;
  copyMessage: CopyMessageParams;
  editMessageText: EditMessageTextParams;
  editMessageCaption: EditMessageCaptionParams;
  deleteMessage: DeleteMessageParams;
  setMessageReaction: SetMessageReactionParams;
  pinChatMessage: PinChatMessageParams;
}
