/* Generated from schema/v1/schema.json. Run npm run generate; do not edit. */
export const METHOD_CATALOG = {
  "createForumTopic": {
    "params": "CreateForumTopicParams",
    "creates": "topic",
    "slots": {
      "chat_id": {
        "kind": "addressee",
        "purposes": [
          "group_chat"
        ]
      },
      "name": {
        "kind": "template",
        "templates": [
          "topic_title",
          "notifications_topic_title"
        ]
      }
    }
  },
  "editForumTopic": {
    "params": "EditForumTopicParams",
    "creates": null,
    "slots": {
      "chat_id": {
        "kind": "addressee",
        "purposes": [
          "group_chat"
        ]
      },
      "message_thread_id": {
        "kind": "sealed",
        "purpose": "thread_id"
      },
      "name": {
        "kind": "template",
        "templates": [
          "topic_title"
        ]
      }
    }
  },
  "unpinAllForumTopicMessages": {
    "params": "UnpinAllForumTopicMessagesParams",
    "creates": null,
    "slots": {
      "chat_id": {
        "kind": "addressee",
        "purposes": [
          "group_chat"
        ]
      },
      "message_thread_id": {
        "kind": "sealed",
        "purpose": "thread_id"
      }
    }
  },
  "sendMessage": {
    "params": "SendMessageParams",
    "creates": "message",
    "slots": {
      "chat_id": {
        "kind": "addressee",
        "purposes": [
          "group_chat",
          "private_chat"
        ]
      },
      "message_thread_id": {
        "kind": "sealed",
        "purpose": "thread_id",
        "optional": true
      },
      "text": {
        "kind": "text",
        "purpose": "notice_text",
        "templates": [
          "topic_header",
          "new_user_notice",
          "welcome_hint",
          "user_edited",
          "edited_by_support",
          "replaced_by_support",
          "user_reacted"
        ]
      },
      "reply_to_message_id": {
        "kind": "sealed",
        "purpose": "message_id",
        "optional": true
      }
    }
  },
  "copyMessage": {
    "params": "CopyMessageParams",
    "creates": "message",
    "slots": {
      "chat_id": {
        "kind": "addressee",
        "purposes": [
          "group_chat",
          "private_chat"
        ]
      },
      "message_thread_id": {
        "kind": "sealed",
        "purpose": "thread_id",
        "optional": true
      },
      "from_chat_id": {
        "kind": "addressee",
        "purposes": [
          "group_chat",
          "private_chat"
        ]
      },
      "message_id": {
        "kind": "sealed",
        "purpose": "message_id"
      },
      "reply_to_message_id": {
        "kind": "sealed",
        "purpose": "message_id",
        "optional": true
      }
    }
  },
  "editMessageText": {
    "params": "EditMessageTextParams",
    "creates": null,
    "slots": {
      "chat_id": {
        "kind": "addressee",
        "purposes": [
          "group_chat",
          "private_chat"
        ]
      },
      "message_id": {
        "kind": "sealed",
        "purpose": "message_id"
      },
      "source_message_id": {
        "kind": "sealed",
        "purpose": "message_id",
        "optional": true
      },
      "content": {
        "kind": "sealed",
        "purpose": "edit_content",
        "field": "text",
        "optional": true
      },
      "text": {
        "kind": "template",
        "templates": [
          "user_reacted"
        ],
        "optional": true
      }
    }
  },
  "editMessageCaption": {
    "params": "EditMessageCaptionParams",
    "creates": null,
    "slots": {
      "chat_id": {
        "kind": "addressee",
        "purposes": [
          "group_chat",
          "private_chat"
        ]
      },
      "message_id": {
        "kind": "sealed",
        "purpose": "message_id"
      },
      "source_message_id": {
        "kind": "sealed",
        "purpose": "message_id",
        "optional": true
      },
      "content": {
        "kind": "sealed",
        "purpose": "edit_content",
        "field": "caption"
      }
    }
  },
  "deleteMessage": {
    "params": "DeleteMessageParams",
    "creates": null,
    "slots": {
      "chat_id": {
        "kind": "addressee",
        "purposes": [
          "group_chat",
          "private_chat"
        ]
      },
      "message_id": {
        "kind": "sealed",
        "purpose": "message_id"
      }
    }
  },
  "setMessageReaction": {
    "params": "SetMessageReactionParams",
    "creates": null,
    "slots": {
      "chat_id": {
        "kind": "addressee",
        "purposes": [
          "group_chat",
          "private_chat"
        ]
      },
      "message_id": {
        "kind": "sealed",
        "purpose": "message_id"
      },
      "source_message_id": {
        "kind": "sealed",
        "purpose": "message_id",
        "optional": true
      },
      "reaction": {
        "kind": "reaction",
        "purpose": "reactions",
        "open": "👀"
      }
    }
  },
  "pinChatMessage": {
    "params": "PinChatMessageParams",
    "creates": null,
    "slots": {
      "chat_id": {
        "kind": "addressee",
        "purposes": [
          "group_chat",
          "private_chat"
        ]
      },
      "message_id": {
        "kind": "sealed",
        "purpose": "message_id"
      },
      "disable_notification": {
        "kind": "open",
        "optional": true
      }
    }
  }
} as const;
