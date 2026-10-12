/* Generated from schema/v1/schema.json. Run npm run generate; do not edit. */
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};

// ../../node_modules/ajv/dist/runtime/ucs2length.js
var require_ucs2length = __commonJS({
  "../../node_modules/ajv/dist/runtime/ucs2length.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function ucs2length(str) {
      const len = str.length;
      let length = 0;
      let pos = 0;
      let value;
      while (pos < len) {
        length++;
        value = str.charCodeAt(pos++);
        if (value >= 55296 && value <= 56319 && pos < len) {
          value = str.charCodeAt(pos);
          if ((value & 64512) === 56320)
            pos++;
        }
      }
      return length;
    }
    exports.default = ucs2length;
    ucs2length.code = 'require("ajv/dist/runtime/ucs2length").default';
  }
});

// validators.generated.js
var Token = validate11;
var pattern0 = new RegExp("^[A-Za-z0-9_-]{43}$", "u");
function validate11(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data === "string") {
    if (!pattern0.test(data)) {
      const err0 = { instancePath, schemaPath: "#/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]{43}$" }, message: 'must match pattern "^[A-Za-z0-9_-]{43}$"' };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
  } else {
    const err1 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "string" }, message: "must be string" };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate11.errors = vErrors;
  return errors === 0;
}
var SealedBlob = validate12;
var func2 = require_ucs2length().default;
var pattern1 = new RegExp("^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$", "u");
function validate12(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data === "string") {
    if (func2(data) > 65536) {
      const err0 = { instancePath, schemaPath: "#/maxLength", keyword: "maxLength", params: { limit: 65536 }, message: "must NOT have more than 65536 characters" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (!pattern1.test(data)) {
      const err1 = { instancePath, schemaPath: "#/pattern", keyword: "pattern", params: { pattern: "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$" }, message: 'must match pattern "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$"' };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
  } else {
    const err2 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "string" }, message: "must be string" };
    if (vErrors === null) {
      vErrors = [err2];
    } else {
      vErrors.push(err2);
    }
    errors++;
  }
  validate12.errors = vErrors;
  return errors === 0;
}
var EventId = validate13;
var pattern2 = new RegExp("^[A-Za-z0-9_.:-]+$", "u");
function validate13(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data === "string") {
    if (func2(data) > 64) {
      const err0 = { instancePath, schemaPath: "#/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (func2(data) < 1) {
      const err1 = { instancePath, schemaPath: "#/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (!pattern2.test(data)) {
      const err2 = { instancePath, schemaPath: "#/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_.:-]+$" }, message: 'must match pattern "^[A-Za-z0-9_.:-]+$"' };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
  } else {
    const err3 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "string" }, message: "must be string" };
    if (vErrors === null) {
      vErrors = [err3];
    } else {
      vErrors.push(err3);
    }
    errors++;
  }
  validate13.errors = vErrors;
  return errors === 0;
}
var OpId = validate14;
var pattern3 = new RegExp("^[0-9]{1,20}$", "u");
function validate14(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data === "string") {
    if (!pattern3.test(data)) {
      const err0 = { instancePath, schemaPath: "#/pattern", keyword: "pattern", params: { pattern: "^[0-9]{1,20}$" }, message: 'must match pattern "^[0-9]{1,20}$"' };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
  } else {
    const err1 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "string" }, message: "must be string" };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate14.errors = vErrors;
  return errors === 0;
}
var AttemptToken = validate15;
var pattern4 = new RegExp("^[A-Za-z0-9_-]{22}$", "u");
function validate15(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data === "string") {
    if (!pattern4.test(data)) {
      const err0 = { instancePath, schemaPath: "#/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]{22}$" }, message: 'must match pattern "^[A-Za-z0-9_-]{22}$"' };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
  } else {
    const err1 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "string" }, message: "must be string" };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate15.errors = vErrors;
  return errors === 0;
}
var DeadlineSeconds = validate16;
function validate16(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (!(typeof data == "number" && (!(data % 1) && !isNaN(data)) && isFinite(data))) {
    const err0 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (typeof data == "number" && isFinite(data)) {
    if (data > 600 || isNaN(data)) {
      const err1 = { instancePath, schemaPath: "#/maximum", keyword: "maximum", params: { comparison: "<=", limit: 600 }, message: "must be <= 600" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data < 30 || isNaN(data)) {
      const err2 = { instancePath, schemaPath: "#/minimum", keyword: "minimum", params: { comparison: ">=", limit: 30 }, message: "must be >= 30" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
  }
  validate16.errors = vErrors;
  return errors === 0;
}
var TokenPurpose = validate17;
var schema18 = { "type": "string", "enum": ["user", "group", "message", "thread", "profile"], "title": "TokenPurpose" };
function validate17(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data !== "string") {
    const err0 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "string" }, message: "must be string" };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (!(data === "user" || data === "group" || data === "message" || data === "thread" || data === "profile")) {
    const err1 = { instancePath, schemaPath: "#/enum", keyword: "enum", params: { allowedValues: schema18.enum }, message: "must be equal to one of the allowed values" };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate17.errors = vErrors;
  return errors === 0;
}
var BlobPurpose = validate18;
var schema19 = { "type": "string", "enum": ["private_chat", "group_chat", "message_id", "thread_id", "language", "edit_content", "reactions", "notice_text", "binding"], "title": "BlobPurpose" };
function validate18(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data !== "string") {
    const err0 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "string" }, message: "must be string" };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (!(data === "private_chat" || data === "group_chat" || data === "message_id" || data === "thread_id" || data === "language" || data === "edit_content" || data === "reactions" || data === "notice_text" || data === "binding")) {
    const err1 = { instancePath, schemaPath: "#/enum", keyword: "enum", params: { allowedValues: schema19.enum }, message: "must be equal to one of the allowed values" };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate18.errors = vErrors;
  return errors === 0;
}
var TemplateId = validate19;
var schema20 = { "type": "string", "enum": ["topic_title", "topic_header", "new_user_notice", "notifications_topic_title", "welcome_hint", "user_edited", "edited_by_support", "replaced_by_support"], "title": "TemplateId" };
function validate19(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data !== "string") {
    const err0 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "string" }, message: "must be string" };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (!(data === "topic_title" || data === "topic_header" || data === "new_user_notice" || data === "notifications_topic_title" || data === "welcome_hint" || data === "user_edited" || data === "edited_by_support" || data === "replaced_by_support")) {
    const err1 = { instancePath, schemaPath: "#/enum", keyword: "enum", params: { allowedValues: schema20.enum }, message: "must be equal to one of the allowed values" };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate19.errors = vErrors;
  return errors === 0;
}
var Method = validate20;
var schema21 = { "type": "string", "enum": ["createForumTopic", "editForumTopic", "unpinAllForumTopicMessages", "sendMessage", "copyMessage", "editMessageText", "editMessageCaption", "deleteMessage", "setMessageReaction", "pinChatMessage"], "title": "Method" };
function validate20(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data !== "string") {
    const err0 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "string" }, message: "must be string" };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (!(data === "createForumTopic" || data === "editForumTopic" || data === "unpinAllForumTopicMessages" || data === "sendMessage" || data === "copyMessage" || data === "editMessageText" || data === "editMessageCaption" || data === "deleteMessage" || data === "setMessageReaction" || data === "pinChatMessage")) {
    const err1 = { instancePath, schemaPath: "#/enum", keyword: "enum", params: { allowedValues: schema21.enum }, message: "must be equal to one of the allowed values" };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate20.errors = vErrors;
  return errors === 0;
}
var SealedRef = validate21;
function validate21(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.sealed === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "sealed" }, message: "must have required property 'sealed'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.sealed !== void 0) {
      let data0 = data.sealed;
      if (typeof data0 === "string") {
        if (func2(data0) > 65536) {
          const err1 = { instancePath: instancePath + "/sealed", schemaPath: "#/definitions/SealedBlob/maxLength", keyword: "maxLength", params: { limit: 65536 }, message: "must NOT have more than 65536 characters" };
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        }
        if (!pattern1.test(data0)) {
          const err2 = { instancePath: instancePath + "/sealed", schemaPath: "#/definitions/SealedBlob/pattern", keyword: "pattern", params: { pattern: "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$" }, message: 'must match pattern "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$"' };
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        }
      } else {
        const err3 = { instancePath: instancePath + "/sealed", schemaPath: "#/definitions/SealedBlob/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
  } else {
    const err4 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err4];
    } else {
      vErrors.push(err4);
    }
    errors++;
  }
  validate21.errors = vErrors;
  return errors === 0;
}
var TemplateRef = validate22;
function validate22(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.template === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "template" }, message: "must have required property 'template'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.language === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "language" }, message: "must have required property 'language'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.template !== void 0) {
      if (typeof data.template !== "string") {
        const err2 = { instancePath: instancePath + "/template", schemaPath: "#/properties/template/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.language !== void 0) {
      if (!validate21(data.language, { instancePath: instancePath + "/language", parentData: data, parentDataProperty: "language", rootData })) {
        vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
    }
    if (data.user !== void 0) {
      if (!validate21(data.user, { instancePath: instancePath + "/user", parentData: data, parentDataProperty: "user", rootData })) {
        vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err3 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err3];
    } else {
      vErrors.push(err3);
    }
    errors++;
  }
  validate22.errors = vErrors;
  return errors === 0;
}
var ParamValue = validate25;
var schema25 = { "anyOf": [{ "type": ["string", "number", "boolean", "null"] }, { "$ref": "#/definitions/SealedRef" }, { "$ref": "#/definitions/TemplateRef" }], "title": "ParamValue" };
function validate25(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  const _errs0 = errors;
  let valid0 = false;
  const _errs1 = errors;
  if (typeof data !== "string" && !(typeof data == "number" && isFinite(data)) && typeof data !== "boolean" && data !== null) {
    const err0 = { instancePath, schemaPath: "#/anyOf/0/type", keyword: "type", params: { type: schema25.anyOf[0].type }, message: "must be string,number,boolean,null" };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  var _valid0 = _errs1 === errors;
  valid0 = valid0 || _valid0;
  if (!valid0) {
    const _errs3 = errors;
    if (!validate21(data, { instancePath, parentData, parentDataProperty, rootData })) {
      vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
      errors = vErrors.length;
    }
    var _valid0 = _errs3 === errors;
    valid0 = valid0 || _valid0;
    if (!valid0) {
      const _errs4 = errors;
      if (!validate22(data, { instancePath, parentData, parentDataProperty, rootData })) {
        vErrors = vErrors === null ? validate22.errors : vErrors.concat(validate22.errors);
        errors = vErrors.length;
      }
      var _valid0 = _errs4 === errors;
      valid0 = valid0 || _valid0;
    }
  }
  if (!valid0) {
    const err1 = { instancePath, schemaPath: "#/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  } else {
    errors = _errs0;
    if (vErrors !== null) {
      if (_errs0) {
        vErrors.length = _errs0;
      } else {
        vErrors = null;
      }
    }
  }
  validate25.errors = vErrors;
  return errors === 0;
}
var Revision = validate28;
function validate28(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.edit_date === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "edit_date" }, message: "must have required property 'edit_date'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.update_id === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "update_id" }, message: "must have required property 'update_id'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.edit_date !== void 0) {
      let data0 = data.edit_date;
      if (!(typeof data0 == "number" && (!(data0 % 1) && !isNaN(data0)) && isFinite(data0))) {
        const err2 = { instancePath: instancePath + "/edit_date", schemaPath: "#/properties/edit_date/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
      if (typeof data0 == "number" && isFinite(data0)) {
        if (data0 < 0 || isNaN(data0)) {
          const err3 = { instancePath: instancePath + "/edit_date", schemaPath: "#/properties/edit_date/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        }
      }
    }
    if (data.update_id !== void 0) {
      let data1 = data.update_id;
      if (!(typeof data1 == "number" && (!(data1 % 1) && !isNaN(data1)) && isFinite(data1))) {
        const err4 = { instancePath: instancePath + "/update_id", schemaPath: "#/properties/update_id/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
      if (typeof data1 == "number" && isFinite(data1)) {
        if (data1 < 0 || isNaN(data1)) {
          const err5 = { instancePath: instancePath + "/update_id", schemaPath: "#/properties/update_id/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
      }
    }
  } else {
    const err6 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err6];
    } else {
      vErrors.push(err6);
    }
    errors++;
  }
  validate28.errors = vErrors;
  return errors === 0;
}
var BotConfiguredEvent = validate29;
var schema27 = { "type": "object", "properties": { "type": { "const": "bot_configured" }, "event_id": { "$ref": "#/definitions/EventId" }, "telegram_bot_id": { "type": "integer", "minimum": 1, "maximum": 9007199254740991 }, "group": { "$ref": "#/definitions/Token" }, "group_chat": { "$ref": "#/definitions/SealedBlob" }, "features": { "type": "object", "properties": { "notifications_topic": { "type": "boolean" }, "welcome_hint": { "type": "boolean" } }, "required": ["notifications_topic", "welcome_hint"], "additionalProperties": true }, "transport": { "type": "string", "enum": ["push", "pull"] }, "host_url": { "anyOf": [{ "type": "string", "minLength": 1, "maxLength": 2048, "pattern": "^https://" }, { "type": "null" }] }, "deadline_seconds": { "$ref": "#/definitions/DeadlineSeconds" }, "sdk_version": { "type": "string", "minLength": 1, "maxLength": 64, "pattern": "^[^/]+/[0-9]+\\.[0-9]+\\.[0-9]+(?:-[0-9A-Za-z.-]+)?(?:\\+[0-9A-Za-z.-]+)?$" }, "config_revision": { "type": "integer", "minimum": 0, "maximum": 9007199254740991 } }, "required": ["type", "event_id", "telegram_bot_id", "group", "group_chat", "features", "transport", "host_url", "deadline_seconds", "sdk_version", "config_revision"], "additionalProperties": true, "allOf": [{ "if": { "properties": { "transport": { "const": "pull" } } }, "then": { "properties": { "host_url": { "type": "null" } } } }, { "if": { "properties": { "transport": { "const": "push" } } }, "then": { "properties": { "host_url": { "type": "string" } } } }], "title": "BotConfiguredEvent" };
var pattern9 = new RegExp("^https://", "u");
var pattern10 = new RegExp("^[^/]+/[0-9]+\\.[0-9]+\\.[0-9]+(?:-[0-9A-Za-z.-]+)?(?:\\+[0-9A-Za-z.-]+)?$", "u");
function validate29(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  const _errs2 = errors;
  let valid1 = true;
  const _errs3 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.transport !== void 0) {
      if ("pull" !== data.transport) {
        const err0 = {};
        if (vErrors === null) {
          vErrors = [err0];
        } else {
          vErrors.push(err0);
        }
        errors++;
      }
    }
  }
  var _valid0 = _errs3 === errors;
  errors = _errs2;
  if (vErrors !== null) {
    if (_errs2) {
      vErrors.length = _errs2;
    } else {
      vErrors = null;
    }
  }
  if (_valid0) {
    const _errs5 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.host_url !== void 0) {
        if (data.host_url !== null) {
          const err1 = { instancePath: instancePath + "/host_url", schemaPath: "#/allOf/0/then/properties/host_url/type", keyword: "type", params: { type: "null" }, message: "must be null" };
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        }
      }
    }
    var _valid0 = _errs5 === errors;
    valid1 = _valid0;
  }
  if (!valid1) {
    const err2 = { instancePath, schemaPath: "#/allOf/0/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
    if (vErrors === null) {
      vErrors = [err2];
    } else {
      vErrors.push(err2);
    }
    errors++;
  }
  const _errs9 = errors;
  let valid4 = true;
  const _errs10 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.transport !== void 0) {
      if ("push" !== data.transport) {
        const err3 = {};
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
  }
  var _valid1 = _errs10 === errors;
  errors = _errs9;
  if (vErrors !== null) {
    if (_errs9) {
      vErrors.length = _errs9;
    } else {
      vErrors = null;
    }
  }
  if (_valid1) {
    const _errs12 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.host_url !== void 0) {
        if (typeof data.host_url !== "string") {
          const err4 = { instancePath: instancePath + "/host_url", schemaPath: "#/allOf/1/then/properties/host_url/type", keyword: "type", params: { type: "string" }, message: "must be string" };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
      }
    }
    var _valid1 = _errs12 === errors;
    valid4 = _valid1;
  }
  if (!valid4) {
    const err5 = { instancePath, schemaPath: "#/allOf/1/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
    if (vErrors === null) {
      vErrors = [err5];
    } else {
      vErrors.push(err5);
    }
    errors++;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.type === void 0) {
      const err6 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "type" }, message: "must have required property 'type'" };
      if (vErrors === null) {
        vErrors = [err6];
      } else {
        vErrors.push(err6);
      }
      errors++;
    }
    if (data.event_id === void 0) {
      const err7 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "event_id" }, message: "must have required property 'event_id'" };
      if (vErrors === null) {
        vErrors = [err7];
      } else {
        vErrors.push(err7);
      }
      errors++;
    }
    if (data.telegram_bot_id === void 0) {
      const err8 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "telegram_bot_id" }, message: "must have required property 'telegram_bot_id'" };
      if (vErrors === null) {
        vErrors = [err8];
      } else {
        vErrors.push(err8);
      }
      errors++;
    }
    if (data.group === void 0) {
      const err9 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "group" }, message: "must have required property 'group'" };
      if (vErrors === null) {
        vErrors = [err9];
      } else {
        vErrors.push(err9);
      }
      errors++;
    }
    if (data.group_chat === void 0) {
      const err10 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "group_chat" }, message: "must have required property 'group_chat'" };
      if (vErrors === null) {
        vErrors = [err10];
      } else {
        vErrors.push(err10);
      }
      errors++;
    }
    if (data.features === void 0) {
      const err11 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "features" }, message: "must have required property 'features'" };
      if (vErrors === null) {
        vErrors = [err11];
      } else {
        vErrors.push(err11);
      }
      errors++;
    }
    if (data.transport === void 0) {
      const err12 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "transport" }, message: "must have required property 'transport'" };
      if (vErrors === null) {
        vErrors = [err12];
      } else {
        vErrors.push(err12);
      }
      errors++;
    }
    if (data.host_url === void 0) {
      const err13 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "host_url" }, message: "must have required property 'host_url'" };
      if (vErrors === null) {
        vErrors = [err13];
      } else {
        vErrors.push(err13);
      }
      errors++;
    }
    if (data.deadline_seconds === void 0) {
      const err14 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "deadline_seconds" }, message: "must have required property 'deadline_seconds'" };
      if (vErrors === null) {
        vErrors = [err14];
      } else {
        vErrors.push(err14);
      }
      errors++;
    }
    if (data.sdk_version === void 0) {
      const err15 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "sdk_version" }, message: "must have required property 'sdk_version'" };
      if (vErrors === null) {
        vErrors = [err15];
      } else {
        vErrors.push(err15);
      }
      errors++;
    }
    if (data.config_revision === void 0) {
      const err16 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "config_revision" }, message: "must have required property 'config_revision'" };
      if (vErrors === null) {
        vErrors = [err16];
      } else {
        vErrors.push(err16);
      }
      errors++;
    }
    if (data.type !== void 0) {
      if ("bot_configured" !== data.type) {
        const err17 = { instancePath: instancePath + "/type", schemaPath: "#/properties/type/const", keyword: "const", params: { allowedValue: "bot_configured" }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err17];
        } else {
          vErrors.push(err17);
        }
        errors++;
      }
    }
    if (data.event_id !== void 0) {
      let data5 = data.event_id;
      if (typeof data5 === "string") {
        if (func2(data5) > 64) {
          const err18 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" };
          if (vErrors === null) {
            vErrors = [err18];
          } else {
            vErrors.push(err18);
          }
          errors++;
        }
        if (func2(data5) < 1) {
          const err19 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err19];
          } else {
            vErrors.push(err19);
          }
          errors++;
        }
        if (!pattern2.test(data5)) {
          const err20 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_.:-]+$" }, message: 'must match pattern "^[A-Za-z0-9_.:-]+$"' };
          if (vErrors === null) {
            vErrors = [err20];
          } else {
            vErrors.push(err20);
          }
          errors++;
        }
      } else {
        const err21 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err21];
        } else {
          vErrors.push(err21);
        }
        errors++;
      }
    }
    if (data.telegram_bot_id !== void 0) {
      let data6 = data.telegram_bot_id;
      if (!(typeof data6 == "number" && (!(data6 % 1) && !isNaN(data6)) && isFinite(data6))) {
        const err22 = { instancePath: instancePath + "/telegram_bot_id", schemaPath: "#/properties/telegram_bot_id/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
        if (vErrors === null) {
          vErrors = [err22];
        } else {
          vErrors.push(err22);
        }
        errors++;
      }
      if (typeof data6 == "number" && isFinite(data6)) {
        if (data6 > 9007199254740991 || isNaN(data6)) {
          const err23 = { instancePath: instancePath + "/telegram_bot_id", schemaPath: "#/properties/telegram_bot_id/maximum", keyword: "maximum", params: { comparison: "<=", limit: 9007199254740991 }, message: "must be <= 9007199254740991" };
          if (vErrors === null) {
            vErrors = [err23];
          } else {
            vErrors.push(err23);
          }
          errors++;
        }
        if (data6 < 1 || isNaN(data6)) {
          const err24 = { instancePath: instancePath + "/telegram_bot_id", schemaPath: "#/properties/telegram_bot_id/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" };
          if (vErrors === null) {
            vErrors = [err24];
          } else {
            vErrors.push(err24);
          }
          errors++;
        }
      }
    }
    if (data.group !== void 0) {
      let data7 = data.group;
      if (typeof data7 === "string") {
        if (!pattern0.test(data7)) {
          const err25 = { instancePath: instancePath + "/group", schemaPath: "#/definitions/Token/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]{43}$" }, message: 'must match pattern "^[A-Za-z0-9_-]{43}$"' };
          if (vErrors === null) {
            vErrors = [err25];
          } else {
            vErrors.push(err25);
          }
          errors++;
        }
      } else {
        const err26 = { instancePath: instancePath + "/group", schemaPath: "#/definitions/Token/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err26];
        } else {
          vErrors.push(err26);
        }
        errors++;
      }
    }
    if (data.group_chat !== void 0) {
      let data8 = data.group_chat;
      if (typeof data8 === "string") {
        if (func2(data8) > 65536) {
          const err27 = { instancePath: instancePath + "/group_chat", schemaPath: "#/definitions/SealedBlob/maxLength", keyword: "maxLength", params: { limit: 65536 }, message: "must NOT have more than 65536 characters" };
          if (vErrors === null) {
            vErrors = [err27];
          } else {
            vErrors.push(err27);
          }
          errors++;
        }
        if (!pattern1.test(data8)) {
          const err28 = { instancePath: instancePath + "/group_chat", schemaPath: "#/definitions/SealedBlob/pattern", keyword: "pattern", params: { pattern: "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$" }, message: 'must match pattern "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$"' };
          if (vErrors === null) {
            vErrors = [err28];
          } else {
            vErrors.push(err28);
          }
          errors++;
        }
      } else {
        const err29 = { instancePath: instancePath + "/group_chat", schemaPath: "#/definitions/SealedBlob/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err29];
        } else {
          vErrors.push(err29);
        }
        errors++;
      }
    }
    if (data.features !== void 0) {
      let data9 = data.features;
      if (data9 && typeof data9 == "object" && !Array.isArray(data9)) {
        if (data9.notifications_topic === void 0) {
          const err30 = { instancePath: instancePath + "/features", schemaPath: "#/properties/features/required", keyword: "required", params: { missingProperty: "notifications_topic" }, message: "must have required property 'notifications_topic'" };
          if (vErrors === null) {
            vErrors = [err30];
          } else {
            vErrors.push(err30);
          }
          errors++;
        }
        if (data9.welcome_hint === void 0) {
          const err31 = { instancePath: instancePath + "/features", schemaPath: "#/properties/features/required", keyword: "required", params: { missingProperty: "welcome_hint" }, message: "must have required property 'welcome_hint'" };
          if (vErrors === null) {
            vErrors = [err31];
          } else {
            vErrors.push(err31);
          }
          errors++;
        }
        if (data9.notifications_topic !== void 0) {
          if (typeof data9.notifications_topic !== "boolean") {
            const err32 = { instancePath: instancePath + "/features/notifications_topic", schemaPath: "#/properties/features/properties/notifications_topic/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
            if (vErrors === null) {
              vErrors = [err32];
            } else {
              vErrors.push(err32);
            }
            errors++;
          }
        }
        if (data9.welcome_hint !== void 0) {
          if (typeof data9.welcome_hint !== "boolean") {
            const err33 = { instancePath: instancePath + "/features/welcome_hint", schemaPath: "#/properties/features/properties/welcome_hint/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
            if (vErrors === null) {
              vErrors = [err33];
            } else {
              vErrors.push(err33);
            }
            errors++;
          }
        }
      } else {
        const err34 = { instancePath: instancePath + "/features", schemaPath: "#/properties/features/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err34];
        } else {
          vErrors.push(err34);
        }
        errors++;
      }
    }
    if (data.transport !== void 0) {
      let data12 = data.transport;
      if (typeof data12 !== "string") {
        const err35 = { instancePath: instancePath + "/transport", schemaPath: "#/properties/transport/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err35];
        } else {
          vErrors.push(err35);
        }
        errors++;
      }
      if (!(data12 === "push" || data12 === "pull")) {
        const err36 = { instancePath: instancePath + "/transport", schemaPath: "#/properties/transport/enum", keyword: "enum", params: { allowedValues: schema27.properties.transport.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err36];
        } else {
          vErrors.push(err36);
        }
        errors++;
      }
    }
    if (data.host_url !== void 0) {
      let data13 = data.host_url;
      const _errs38 = errors;
      let valid12 = false;
      const _errs39 = errors;
      if (typeof data13 === "string") {
        if (func2(data13) > 2048) {
          const err37 = { instancePath: instancePath + "/host_url", schemaPath: "#/properties/host_url/anyOf/0/maxLength", keyword: "maxLength", params: { limit: 2048 }, message: "must NOT have more than 2048 characters" };
          if (vErrors === null) {
            vErrors = [err37];
          } else {
            vErrors.push(err37);
          }
          errors++;
        }
        if (func2(data13) < 1) {
          const err38 = { instancePath: instancePath + "/host_url", schemaPath: "#/properties/host_url/anyOf/0/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err38];
          } else {
            vErrors.push(err38);
          }
          errors++;
        }
        if (!pattern9.test(data13)) {
          const err39 = { instancePath: instancePath + "/host_url", schemaPath: "#/properties/host_url/anyOf/0/pattern", keyword: "pattern", params: { pattern: "^https://" }, message: 'must match pattern "^https://"' };
          if (vErrors === null) {
            vErrors = [err39];
          } else {
            vErrors.push(err39);
          }
          errors++;
        }
      } else {
        const err40 = { instancePath: instancePath + "/host_url", schemaPath: "#/properties/host_url/anyOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err40];
        } else {
          vErrors.push(err40);
        }
        errors++;
      }
      var _valid2 = _errs39 === errors;
      valid12 = valid12 || _valid2;
      if (!valid12) {
        const _errs41 = errors;
        if (data13 !== null) {
          const err41 = { instancePath: instancePath + "/host_url", schemaPath: "#/properties/host_url/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
          if (vErrors === null) {
            vErrors = [err41];
          } else {
            vErrors.push(err41);
          }
          errors++;
        }
        var _valid2 = _errs41 === errors;
        valid12 = valid12 || _valid2;
      }
      if (!valid12) {
        const err42 = { instancePath: instancePath + "/host_url", schemaPath: "#/properties/host_url/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
        if (vErrors === null) {
          vErrors = [err42];
        } else {
          vErrors.push(err42);
        }
        errors++;
      } else {
        errors = _errs38;
        if (vErrors !== null) {
          if (_errs38) {
            vErrors.length = _errs38;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.deadline_seconds !== void 0) {
      let data14 = data.deadline_seconds;
      if (!(typeof data14 == "number" && (!(data14 % 1) && !isNaN(data14)) && isFinite(data14))) {
        const err43 = { instancePath: instancePath + "/deadline_seconds", schemaPath: "#/definitions/DeadlineSeconds/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
        if (vErrors === null) {
          vErrors = [err43];
        } else {
          vErrors.push(err43);
        }
        errors++;
      }
      if (typeof data14 == "number" && isFinite(data14)) {
        if (data14 > 600 || isNaN(data14)) {
          const err44 = { instancePath: instancePath + "/deadline_seconds", schemaPath: "#/definitions/DeadlineSeconds/maximum", keyword: "maximum", params: { comparison: "<=", limit: 600 }, message: "must be <= 600" };
          if (vErrors === null) {
            vErrors = [err44];
          } else {
            vErrors.push(err44);
          }
          errors++;
        }
        if (data14 < 30 || isNaN(data14)) {
          const err45 = { instancePath: instancePath + "/deadline_seconds", schemaPath: "#/definitions/DeadlineSeconds/minimum", keyword: "minimum", params: { comparison: ">=", limit: 30 }, message: "must be >= 30" };
          if (vErrors === null) {
            vErrors = [err45];
          } else {
            vErrors.push(err45);
          }
          errors++;
        }
      }
    }
    if (data.sdk_version !== void 0) {
      let data15 = data.sdk_version;
      if (typeof data15 === "string") {
        if (func2(data15) > 64) {
          const err46 = { instancePath: instancePath + "/sdk_version", schemaPath: "#/properties/sdk_version/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" };
          if (vErrors === null) {
            vErrors = [err46];
          } else {
            vErrors.push(err46);
          }
          errors++;
        }
        if (func2(data15) < 1) {
          const err47 = { instancePath: instancePath + "/sdk_version", schemaPath: "#/properties/sdk_version/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err47];
          } else {
            vErrors.push(err47);
          }
          errors++;
        }
        if (!pattern10.test(data15)) {
          const err48 = { instancePath: instancePath + "/sdk_version", schemaPath: "#/properties/sdk_version/pattern", keyword: "pattern", params: { pattern: "^[^/]+/[0-9]+\\.[0-9]+\\.[0-9]+(?:-[0-9A-Za-z.-]+)?(?:\\+[0-9A-Za-z.-]+)?$" }, message: 'must match pattern "^[^/]+/[0-9]+\\.[0-9]+\\.[0-9]+(?:-[0-9A-Za-z.-]+)?(?:\\+[0-9A-Za-z.-]+)?$"' };
          if (vErrors === null) {
            vErrors = [err48];
          } else {
            vErrors.push(err48);
          }
          errors++;
        }
      } else {
        const err49 = { instancePath: instancePath + "/sdk_version", schemaPath: "#/properties/sdk_version/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err49];
        } else {
          vErrors.push(err49);
        }
        errors++;
      }
    }
    if (data.config_revision !== void 0) {
      let data16 = data.config_revision;
      if (!(typeof data16 == "number" && (!(data16 % 1) && !isNaN(data16)) && isFinite(data16))) {
        const err50 = { instancePath: instancePath + "/config_revision", schemaPath: "#/properties/config_revision/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
        if (vErrors === null) {
          vErrors = [err50];
        } else {
          vErrors.push(err50);
        }
        errors++;
      }
      if (typeof data16 == "number" && isFinite(data16)) {
        if (data16 > 9007199254740991 || isNaN(data16)) {
          const err51 = { instancePath: instancePath + "/config_revision", schemaPath: "#/properties/config_revision/maximum", keyword: "maximum", params: { comparison: "<=", limit: 9007199254740991 }, message: "must be <= 9007199254740991" };
          if (vErrors === null) {
            vErrors = [err51];
          } else {
            vErrors.push(err51);
          }
          errors++;
        }
        if (data16 < 0 || isNaN(data16)) {
          const err52 = { instancePath: instancePath + "/config_revision", schemaPath: "#/properties/config_revision/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
          if (vErrors === null) {
            vErrors = [err52];
          } else {
            vErrors.push(err52);
          }
          errors++;
        }
      }
    }
  } else {
    const err53 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err53];
    } else {
      vErrors.push(err53);
    }
    errors++;
  }
  validate29.errors = vErrors;
  return errors === 0;
}
var UserMessageEvent = validate30;
function validate30(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  const _errs1 = errors;
  let valid0 = true;
  const _errs2 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.is_start !== void 0) {
      if (true !== data.is_start) {
        const err0 = {};
        if (vErrors === null) {
          vErrors = [err0];
        } else {
          vErrors.push(err0);
        }
        errors++;
      }
    }
  }
  var _valid0 = _errs2 === errors;
  errors = _errs1;
  if (vErrors !== null) {
    if (_errs1) {
      vErrors.length = _errs1;
    } else {
      vErrors = null;
    }
  }
  if (_valid0) {
    const _errs4 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.is_bot_command !== void 0) {
        if (true !== data.is_bot_command) {
          const err1 = { instancePath: instancePath + "/is_bot_command", schemaPath: "#/then/properties/is_bot_command/const", keyword: "const", params: { allowedValue: true }, message: "must be equal to constant" };
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        }
      }
    }
    var _valid0 = _errs4 === errors;
    valid0 = _valid0;
  }
  if (!valid0) {
    const err2 = { instancePath, schemaPath: "#/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
    if (vErrors === null) {
      vErrors = [err2];
    } else {
      vErrors.push(err2);
    }
    errors++;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.type === void 0) {
      const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "type" }, message: "must have required property 'type'" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.event_id === void 0) {
      const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "event_id" }, message: "must have required property 'event_id'" };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    if (data.user === void 0) {
      const err5 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "user" }, message: "must have required property 'user'" };
      if (vErrors === null) {
        vErrors = [err5];
      } else {
        vErrors.push(err5);
      }
      errors++;
    }
    if (data.chat === void 0) {
      const err6 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "chat" }, message: "must have required property 'chat'" };
      if (vErrors === null) {
        vErrors = [err6];
      } else {
        vErrors.push(err6);
      }
      errors++;
    }
    if (data.profile === void 0) {
      const err7 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "profile" }, message: "must have required property 'profile'" };
      if (vErrors === null) {
        vErrors = [err7];
      } else {
        vErrors.push(err7);
      }
      errors++;
    }
    if (data.language === void 0) {
      const err8 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "language" }, message: "must have required property 'language'" };
      if (vErrors === null) {
        vErrors = [err8];
      } else {
        vErrors.push(err8);
      }
      errors++;
    }
    if (data.message === void 0) {
      const err9 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "message" }, message: "must have required property 'message'" };
      if (vErrors === null) {
        vErrors = [err9];
      } else {
        vErrors.push(err9);
      }
      errors++;
    }
    if (data.message_id === void 0) {
      const err10 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "message_id" }, message: "must have required property 'message_id'" };
      if (vErrors === null) {
        vErrors = [err10];
      } else {
        vErrors.push(err10);
      }
      errors++;
    }
    if (data.reply_to === void 0) {
      const err11 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "reply_to" }, message: "must have required property 'reply_to'" };
      if (vErrors === null) {
        vErrors = [err11];
      } else {
        vErrors.push(err11);
      }
      errors++;
    }
    if (data.copyable === void 0) {
      const err12 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "copyable" }, message: "must have required property 'copyable'" };
      if (vErrors === null) {
        vErrors = [err12];
      } else {
        vErrors.push(err12);
      }
      errors++;
    }
    if (data.is_bot_command === void 0) {
      const err13 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "is_bot_command" }, message: "must have required property 'is_bot_command'" };
      if (vErrors === null) {
        vErrors = [err13];
      } else {
        vErrors.push(err13);
      }
      errors++;
    }
    if (data.is_start === void 0) {
      const err14 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "is_start" }, message: "must have required property 'is_start'" };
      if (vErrors === null) {
        vErrors = [err14];
      } else {
        vErrors.push(err14);
      }
      errors++;
    }
    if (data.type !== void 0) {
      if ("user_message" !== data.type) {
        const err15 = { instancePath: instancePath + "/type", schemaPath: "#/properties/type/const", keyword: "const", params: { allowedValue: "user_message" }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err15];
        } else {
          vErrors.push(err15);
        }
        errors++;
      }
    }
    if (data.event_id !== void 0) {
      let data3 = data.event_id;
      if (typeof data3 === "string") {
        if (func2(data3) > 64) {
          const err16 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" };
          if (vErrors === null) {
            vErrors = [err16];
          } else {
            vErrors.push(err16);
          }
          errors++;
        }
        if (func2(data3) < 1) {
          const err17 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err17];
          } else {
            vErrors.push(err17);
          }
          errors++;
        }
        if (!pattern2.test(data3)) {
          const err18 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_.:-]+$" }, message: 'must match pattern "^[A-Za-z0-9_.:-]+$"' };
          if (vErrors === null) {
            vErrors = [err18];
          } else {
            vErrors.push(err18);
          }
          errors++;
        }
      } else {
        const err19 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err19];
        } else {
          vErrors.push(err19);
        }
        errors++;
      }
    }
    if (data.user !== void 0) {
      let data4 = data.user;
      if (typeof data4 === "string") {
        if (!pattern0.test(data4)) {
          const err20 = { instancePath: instancePath + "/user", schemaPath: "#/definitions/Token/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]{43}$" }, message: 'must match pattern "^[A-Za-z0-9_-]{43}$"' };
          if (vErrors === null) {
            vErrors = [err20];
          } else {
            vErrors.push(err20);
          }
          errors++;
        }
      } else {
        const err21 = { instancePath: instancePath + "/user", schemaPath: "#/definitions/Token/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err21];
        } else {
          vErrors.push(err21);
        }
        errors++;
      }
    }
    if (data.chat !== void 0) {
      let data5 = data.chat;
      if (typeof data5 === "string") {
        if (func2(data5) > 65536) {
          const err22 = { instancePath: instancePath + "/chat", schemaPath: "#/definitions/SealedBlob/maxLength", keyword: "maxLength", params: { limit: 65536 }, message: "must NOT have more than 65536 characters" };
          if (vErrors === null) {
            vErrors = [err22];
          } else {
            vErrors.push(err22);
          }
          errors++;
        }
        if (!pattern1.test(data5)) {
          const err23 = { instancePath: instancePath + "/chat", schemaPath: "#/definitions/SealedBlob/pattern", keyword: "pattern", params: { pattern: "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$" }, message: 'must match pattern "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$"' };
          if (vErrors === null) {
            vErrors = [err23];
          } else {
            vErrors.push(err23);
          }
          errors++;
        }
      } else {
        const err24 = { instancePath: instancePath + "/chat", schemaPath: "#/definitions/SealedBlob/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err24];
        } else {
          vErrors.push(err24);
        }
        errors++;
      }
    }
    if (data.profile !== void 0) {
      let data6 = data.profile;
      if (typeof data6 === "string") {
        if (!pattern0.test(data6)) {
          const err25 = { instancePath: instancePath + "/profile", schemaPath: "#/definitions/Token/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]{43}$" }, message: 'must match pattern "^[A-Za-z0-9_-]{43}$"' };
          if (vErrors === null) {
            vErrors = [err25];
          } else {
            vErrors.push(err25);
          }
          errors++;
        }
      } else {
        const err26 = { instancePath: instancePath + "/profile", schemaPath: "#/definitions/Token/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err26];
        } else {
          vErrors.push(err26);
        }
        errors++;
      }
    }
    if (data.language !== void 0) {
      let data7 = data.language;
      if (typeof data7 === "string") {
        if (func2(data7) > 65536) {
          const err27 = { instancePath: instancePath + "/language", schemaPath: "#/definitions/SealedBlob/maxLength", keyword: "maxLength", params: { limit: 65536 }, message: "must NOT have more than 65536 characters" };
          if (vErrors === null) {
            vErrors = [err27];
          } else {
            vErrors.push(err27);
          }
          errors++;
        }
        if (!pattern1.test(data7)) {
          const err28 = { instancePath: instancePath + "/language", schemaPath: "#/definitions/SealedBlob/pattern", keyword: "pattern", params: { pattern: "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$" }, message: 'must match pattern "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$"' };
          if (vErrors === null) {
            vErrors = [err28];
          } else {
            vErrors.push(err28);
          }
          errors++;
        }
      } else {
        const err29 = { instancePath: instancePath + "/language", schemaPath: "#/definitions/SealedBlob/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err29];
        } else {
          vErrors.push(err29);
        }
        errors++;
      }
    }
    if (data.message !== void 0) {
      let data8 = data.message;
      if (typeof data8 === "string") {
        if (!pattern0.test(data8)) {
          const err30 = { instancePath: instancePath + "/message", schemaPath: "#/definitions/Token/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]{43}$" }, message: 'must match pattern "^[A-Za-z0-9_-]{43}$"' };
          if (vErrors === null) {
            vErrors = [err30];
          } else {
            vErrors.push(err30);
          }
          errors++;
        }
      } else {
        const err31 = { instancePath: instancePath + "/message", schemaPath: "#/definitions/Token/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err31];
        } else {
          vErrors.push(err31);
        }
        errors++;
      }
    }
    if (data.message_id !== void 0) {
      let data9 = data.message_id;
      if (typeof data9 === "string") {
        if (func2(data9) > 65536) {
          const err32 = { instancePath: instancePath + "/message_id", schemaPath: "#/definitions/SealedBlob/maxLength", keyword: "maxLength", params: { limit: 65536 }, message: "must NOT have more than 65536 characters" };
          if (vErrors === null) {
            vErrors = [err32];
          } else {
            vErrors.push(err32);
          }
          errors++;
        }
        if (!pattern1.test(data9)) {
          const err33 = { instancePath: instancePath + "/message_id", schemaPath: "#/definitions/SealedBlob/pattern", keyword: "pattern", params: { pattern: "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$" }, message: 'must match pattern "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$"' };
          if (vErrors === null) {
            vErrors = [err33];
          } else {
            vErrors.push(err33);
          }
          errors++;
        }
      } else {
        const err34 = { instancePath: instancePath + "/message_id", schemaPath: "#/definitions/SealedBlob/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err34];
        } else {
          vErrors.push(err34);
        }
        errors++;
      }
    }
    if (data.reply_to !== void 0) {
      let data10 = data.reply_to;
      const _errs30 = errors;
      let valid11 = false;
      const _errs31 = errors;
      if (typeof data10 === "string") {
        if (!pattern0.test(data10)) {
          const err35 = { instancePath: instancePath + "/reply_to", schemaPath: "#/definitions/Token/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]{43}$" }, message: 'must match pattern "^[A-Za-z0-9_-]{43}$"' };
          if (vErrors === null) {
            vErrors = [err35];
          } else {
            vErrors.push(err35);
          }
          errors++;
        }
      } else {
        const err36 = { instancePath: instancePath + "/reply_to", schemaPath: "#/definitions/Token/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err36];
        } else {
          vErrors.push(err36);
        }
        errors++;
      }
      var _valid1 = _errs31 === errors;
      valid11 = valid11 || _valid1;
      if (!valid11) {
        const _errs34 = errors;
        if (data10 !== null) {
          const err37 = { instancePath: instancePath + "/reply_to", schemaPath: "#/properties/reply_to/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
          if (vErrors === null) {
            vErrors = [err37];
          } else {
            vErrors.push(err37);
          }
          errors++;
        }
        var _valid1 = _errs34 === errors;
        valid11 = valid11 || _valid1;
      }
      if (!valid11) {
        const err38 = { instancePath: instancePath + "/reply_to", schemaPath: "#/properties/reply_to/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
        if (vErrors === null) {
          vErrors = [err38];
        } else {
          vErrors.push(err38);
        }
        errors++;
      } else {
        errors = _errs30;
        if (vErrors !== null) {
          if (_errs30) {
            vErrors.length = _errs30;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.copyable !== void 0) {
      if (typeof data.copyable !== "boolean") {
        const err39 = { instancePath: instancePath + "/copyable", schemaPath: "#/properties/copyable/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
        if (vErrors === null) {
          vErrors = [err39];
        } else {
          vErrors.push(err39);
        }
        errors++;
      }
    }
    if (data.is_bot_command !== void 0) {
      if (typeof data.is_bot_command !== "boolean") {
        const err40 = { instancePath: instancePath + "/is_bot_command", schemaPath: "#/properties/is_bot_command/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
        if (vErrors === null) {
          vErrors = [err40];
        } else {
          vErrors.push(err40);
        }
        errors++;
      }
    }
    if (data.is_start !== void 0) {
      if (typeof data.is_start !== "boolean") {
        const err41 = { instancePath: instancePath + "/is_start", schemaPath: "#/properties/is_start/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
        if (vErrors === null) {
          vErrors = [err41];
        } else {
          vErrors.push(err41);
        }
        errors++;
      }
    }
  } else {
    const err42 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err42];
    } else {
      vErrors.push(err42);
    }
    errors++;
  }
  validate30.errors = vErrors;
  return errors === 0;
}
var UserInteractionEvent = validate31;
function validate31(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.type === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "type" }, message: "must have required property 'type'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.event_id === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "event_id" }, message: "must have required property 'event_id'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.user === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "user" }, message: "must have required property 'user'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.chat === void 0) {
      const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "chat" }, message: "must have required property 'chat'" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.profile === void 0) {
      const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "profile" }, message: "must have required property 'profile'" };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    if (data.language === void 0) {
      const err5 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "language" }, message: "must have required property 'language'" };
      if (vErrors === null) {
        vErrors = [err5];
      } else {
        vErrors.push(err5);
      }
      errors++;
    }
    if (data.type !== void 0) {
      if ("user_interaction" !== data.type) {
        const err6 = { instancePath: instancePath + "/type", schemaPath: "#/properties/type/const", keyword: "const", params: { allowedValue: "user_interaction" }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
    }
    if (data.event_id !== void 0) {
      let data1 = data.event_id;
      if (typeof data1 === "string") {
        if (func2(data1) > 64) {
          const err7 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        }
        if (func2(data1) < 1) {
          const err8 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err8];
          } else {
            vErrors.push(err8);
          }
          errors++;
        }
        if (!pattern2.test(data1)) {
          const err9 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_.:-]+$" }, message: 'must match pattern "^[A-Za-z0-9_.:-]+$"' };
          if (vErrors === null) {
            vErrors = [err9];
          } else {
            vErrors.push(err9);
          }
          errors++;
        }
      } else {
        const err10 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err10];
        } else {
          vErrors.push(err10);
        }
        errors++;
      }
    }
    if (data.user !== void 0) {
      let data2 = data.user;
      if (typeof data2 === "string") {
        if (!pattern0.test(data2)) {
          const err11 = { instancePath: instancePath + "/user", schemaPath: "#/definitions/Token/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]{43}$" }, message: 'must match pattern "^[A-Za-z0-9_-]{43}$"' };
          if (vErrors === null) {
            vErrors = [err11];
          } else {
            vErrors.push(err11);
          }
          errors++;
        }
      } else {
        const err12 = { instancePath: instancePath + "/user", schemaPath: "#/definitions/Token/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err12];
        } else {
          vErrors.push(err12);
        }
        errors++;
      }
    }
    if (data.chat !== void 0) {
      let data3 = data.chat;
      if (typeof data3 === "string") {
        if (func2(data3) > 65536) {
          const err13 = { instancePath: instancePath + "/chat", schemaPath: "#/definitions/SealedBlob/maxLength", keyword: "maxLength", params: { limit: 65536 }, message: "must NOT have more than 65536 characters" };
          if (vErrors === null) {
            vErrors = [err13];
          } else {
            vErrors.push(err13);
          }
          errors++;
        }
        if (!pattern1.test(data3)) {
          const err14 = { instancePath: instancePath + "/chat", schemaPath: "#/definitions/SealedBlob/pattern", keyword: "pattern", params: { pattern: "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$" }, message: 'must match pattern "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$"' };
          if (vErrors === null) {
            vErrors = [err14];
          } else {
            vErrors.push(err14);
          }
          errors++;
        }
      } else {
        const err15 = { instancePath: instancePath + "/chat", schemaPath: "#/definitions/SealedBlob/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err15];
        } else {
          vErrors.push(err15);
        }
        errors++;
      }
    }
    if (data.profile !== void 0) {
      let data4 = data.profile;
      if (typeof data4 === "string") {
        if (!pattern0.test(data4)) {
          const err16 = { instancePath: instancePath + "/profile", schemaPath: "#/definitions/Token/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]{43}$" }, message: 'must match pattern "^[A-Za-z0-9_-]{43}$"' };
          if (vErrors === null) {
            vErrors = [err16];
          } else {
            vErrors.push(err16);
          }
          errors++;
        }
      } else {
        const err17 = { instancePath: instancePath + "/profile", schemaPath: "#/definitions/Token/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err17];
        } else {
          vErrors.push(err17);
        }
        errors++;
      }
    }
    if (data.language !== void 0) {
      let data5 = data.language;
      if (typeof data5 === "string") {
        if (func2(data5) > 65536) {
          const err18 = { instancePath: instancePath + "/language", schemaPath: "#/definitions/SealedBlob/maxLength", keyword: "maxLength", params: { limit: 65536 }, message: "must NOT have more than 65536 characters" };
          if (vErrors === null) {
            vErrors = [err18];
          } else {
            vErrors.push(err18);
          }
          errors++;
        }
        if (!pattern1.test(data5)) {
          const err19 = { instancePath: instancePath + "/language", schemaPath: "#/definitions/SealedBlob/pattern", keyword: "pattern", params: { pattern: "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$" }, message: 'must match pattern "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$"' };
          if (vErrors === null) {
            vErrors = [err19];
          } else {
            vErrors.push(err19);
          }
          errors++;
        }
      } else {
        const err20 = { instancePath: instancePath + "/language", schemaPath: "#/definitions/SealedBlob/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err20];
        } else {
          vErrors.push(err20);
        }
        errors++;
      }
    }
  } else {
    const err21 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err21];
    } else {
      vErrors.push(err21);
    }
    errors++;
  }
  validate31.errors = vErrors;
  return errors === 0;
}
var UserEditEvent = validate32;
var schema47 = { "type": "object", "properties": { "type": { "const": "user_edit" }, "event_id": { "$ref": "#/definitions/EventId" }, "user": { "$ref": "#/definitions/Token" }, "message": { "$ref": "#/definitions/Token" }, "revision": { "$ref": "#/definitions/Revision" }, "field": { "type": "string", "enum": ["text", "caption"] }, "content": { "$ref": "#/definitions/SealedBlob" } }, "required": ["type", "event_id", "user", "message", "revision", "field", "content"], "additionalProperties": true, "title": "UserEditEvent" };
function validate32(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.type === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "type" }, message: "must have required property 'type'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.event_id === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "event_id" }, message: "must have required property 'event_id'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.user === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "user" }, message: "must have required property 'user'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.message === void 0) {
      const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "message" }, message: "must have required property 'message'" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.revision === void 0) {
      const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "revision" }, message: "must have required property 'revision'" };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    if (data.field === void 0) {
      const err5 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "field" }, message: "must have required property 'field'" };
      if (vErrors === null) {
        vErrors = [err5];
      } else {
        vErrors.push(err5);
      }
      errors++;
    }
    if (data.content === void 0) {
      const err6 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "content" }, message: "must have required property 'content'" };
      if (vErrors === null) {
        vErrors = [err6];
      } else {
        vErrors.push(err6);
      }
      errors++;
    }
    if (data.type !== void 0) {
      if ("user_edit" !== data.type) {
        const err7 = { instancePath: instancePath + "/type", schemaPath: "#/properties/type/const", keyword: "const", params: { allowedValue: "user_edit" }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      }
    }
    if (data.event_id !== void 0) {
      let data1 = data.event_id;
      if (typeof data1 === "string") {
        if (func2(data1) > 64) {
          const err8 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" };
          if (vErrors === null) {
            vErrors = [err8];
          } else {
            vErrors.push(err8);
          }
          errors++;
        }
        if (func2(data1) < 1) {
          const err9 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err9];
          } else {
            vErrors.push(err9);
          }
          errors++;
        }
        if (!pattern2.test(data1)) {
          const err10 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_.:-]+$" }, message: 'must match pattern "^[A-Za-z0-9_.:-]+$"' };
          if (vErrors === null) {
            vErrors = [err10];
          } else {
            vErrors.push(err10);
          }
          errors++;
        }
      } else {
        const err11 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err11];
        } else {
          vErrors.push(err11);
        }
        errors++;
      }
    }
    if (data.user !== void 0) {
      let data2 = data.user;
      if (typeof data2 === "string") {
        if (!pattern0.test(data2)) {
          const err12 = { instancePath: instancePath + "/user", schemaPath: "#/definitions/Token/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]{43}$" }, message: 'must match pattern "^[A-Za-z0-9_-]{43}$"' };
          if (vErrors === null) {
            vErrors = [err12];
          } else {
            vErrors.push(err12);
          }
          errors++;
        }
      } else {
        const err13 = { instancePath: instancePath + "/user", schemaPath: "#/definitions/Token/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err13];
        } else {
          vErrors.push(err13);
        }
        errors++;
      }
    }
    if (data.message !== void 0) {
      let data3 = data.message;
      if (typeof data3 === "string") {
        if (!pattern0.test(data3)) {
          const err14 = { instancePath: instancePath + "/message", schemaPath: "#/definitions/Token/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]{43}$" }, message: 'must match pattern "^[A-Za-z0-9_-]{43}$"' };
          if (vErrors === null) {
            vErrors = [err14];
          } else {
            vErrors.push(err14);
          }
          errors++;
        }
      } else {
        const err15 = { instancePath: instancePath + "/message", schemaPath: "#/definitions/Token/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err15];
        } else {
          vErrors.push(err15);
        }
        errors++;
      }
    }
    if (data.revision !== void 0) {
      let data4 = data.revision;
      if (data4 && typeof data4 == "object" && !Array.isArray(data4)) {
        if (data4.edit_date === void 0) {
          const err16 = { instancePath: instancePath + "/revision", schemaPath: "#/definitions/Revision/required", keyword: "required", params: { missingProperty: "edit_date" }, message: "must have required property 'edit_date'" };
          if (vErrors === null) {
            vErrors = [err16];
          } else {
            vErrors.push(err16);
          }
          errors++;
        }
        if (data4.update_id === void 0) {
          const err17 = { instancePath: instancePath + "/revision", schemaPath: "#/definitions/Revision/required", keyword: "required", params: { missingProperty: "update_id" }, message: "must have required property 'update_id'" };
          if (vErrors === null) {
            vErrors = [err17];
          } else {
            vErrors.push(err17);
          }
          errors++;
        }
        if (data4.edit_date !== void 0) {
          let data5 = data4.edit_date;
          if (!(typeof data5 == "number" && (!(data5 % 1) && !isNaN(data5)) && isFinite(data5))) {
            const err18 = { instancePath: instancePath + "/revision/edit_date", schemaPath: "#/definitions/Revision/properties/edit_date/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
            if (vErrors === null) {
              vErrors = [err18];
            } else {
              vErrors.push(err18);
            }
            errors++;
          }
          if (typeof data5 == "number" && isFinite(data5)) {
            if (data5 < 0 || isNaN(data5)) {
              const err19 = { instancePath: instancePath + "/revision/edit_date", schemaPath: "#/definitions/Revision/properties/edit_date/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
              if (vErrors === null) {
                vErrors = [err19];
              } else {
                vErrors.push(err19);
              }
              errors++;
            }
          }
        }
        if (data4.update_id !== void 0) {
          let data6 = data4.update_id;
          if (!(typeof data6 == "number" && (!(data6 % 1) && !isNaN(data6)) && isFinite(data6))) {
            const err20 = { instancePath: instancePath + "/revision/update_id", schemaPath: "#/definitions/Revision/properties/update_id/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
            if (vErrors === null) {
              vErrors = [err20];
            } else {
              vErrors.push(err20);
            }
            errors++;
          }
          if (typeof data6 == "number" && isFinite(data6)) {
            if (data6 < 0 || isNaN(data6)) {
              const err21 = { instancePath: instancePath + "/revision/update_id", schemaPath: "#/definitions/Revision/properties/update_id/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
              if (vErrors === null) {
                vErrors = [err21];
              } else {
                vErrors.push(err21);
              }
              errors++;
            }
          }
        }
      } else {
        const err22 = { instancePath: instancePath + "/revision", schemaPath: "#/definitions/Revision/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err22];
        } else {
          vErrors.push(err22);
        }
        errors++;
      }
    }
    if (data.field !== void 0) {
      let data7 = data.field;
      if (typeof data7 !== "string") {
        const err23 = { instancePath: instancePath + "/field", schemaPath: "#/properties/field/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err23];
        } else {
          vErrors.push(err23);
        }
        errors++;
      }
      if (!(data7 === "text" || data7 === "caption")) {
        const err24 = { instancePath: instancePath + "/field", schemaPath: "#/properties/field/enum", keyword: "enum", params: { allowedValues: schema47.properties.field.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err24];
        } else {
          vErrors.push(err24);
        }
        errors++;
      }
    }
    if (data.content !== void 0) {
      let data8 = data.content;
      if (typeof data8 === "string") {
        if (func2(data8) > 65536) {
          const err25 = { instancePath: instancePath + "/content", schemaPath: "#/definitions/SealedBlob/maxLength", keyword: "maxLength", params: { limit: 65536 }, message: "must NOT have more than 65536 characters" };
          if (vErrors === null) {
            vErrors = [err25];
          } else {
            vErrors.push(err25);
          }
          errors++;
        }
        if (!pattern1.test(data8)) {
          const err26 = { instancePath: instancePath + "/content", schemaPath: "#/definitions/SealedBlob/pattern", keyword: "pattern", params: { pattern: "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$" }, message: 'must match pattern "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$"' };
          if (vErrors === null) {
            vErrors = [err26];
          } else {
            vErrors.push(err26);
          }
          errors++;
        }
      } else {
        const err27 = { instancePath: instancePath + "/content", schemaPath: "#/definitions/SealedBlob/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err27];
        } else {
          vErrors.push(err27);
        }
        errors++;
      }
    }
  } else {
    const err28 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err28];
    } else {
      vErrors.push(err28);
    }
    errors++;
  }
  validate32.errors = vErrors;
  return errors === 0;
}
var UserReactionEvent = validate33;
function validate33(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.type === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "type" }, message: "must have required property 'type'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.event_id === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "event_id" }, message: "must have required property 'event_id'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.user === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "user" }, message: "must have required property 'user'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.message === void 0) {
      const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "message" }, message: "must have required property 'message'" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.reactions === void 0) {
      const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "reactions" }, message: "must have required property 'reactions'" };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    if (data.type !== void 0) {
      if ("user_reaction" !== data.type) {
        const err5 = { instancePath: instancePath + "/type", schemaPath: "#/properties/type/const", keyword: "const", params: { allowedValue: "user_reaction" }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
    }
    if (data.event_id !== void 0) {
      let data1 = data.event_id;
      if (typeof data1 === "string") {
        if (func2(data1) > 64) {
          const err6 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" };
          if (vErrors === null) {
            vErrors = [err6];
          } else {
            vErrors.push(err6);
          }
          errors++;
        }
        if (func2(data1) < 1) {
          const err7 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        }
        if (!pattern2.test(data1)) {
          const err8 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_.:-]+$" }, message: 'must match pattern "^[A-Za-z0-9_.:-]+$"' };
          if (vErrors === null) {
            vErrors = [err8];
          } else {
            vErrors.push(err8);
          }
          errors++;
        }
      } else {
        const err9 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err9];
        } else {
          vErrors.push(err9);
        }
        errors++;
      }
    }
    if (data.user !== void 0) {
      let data2 = data.user;
      if (typeof data2 === "string") {
        if (!pattern0.test(data2)) {
          const err10 = { instancePath: instancePath + "/user", schemaPath: "#/definitions/Token/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]{43}$" }, message: 'must match pattern "^[A-Za-z0-9_-]{43}$"' };
          if (vErrors === null) {
            vErrors = [err10];
          } else {
            vErrors.push(err10);
          }
          errors++;
        }
      } else {
        const err11 = { instancePath: instancePath + "/user", schemaPath: "#/definitions/Token/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err11];
        } else {
          vErrors.push(err11);
        }
        errors++;
      }
    }
    if (data.message !== void 0) {
      let data3 = data.message;
      if (typeof data3 === "string") {
        if (!pattern0.test(data3)) {
          const err12 = { instancePath: instancePath + "/message", schemaPath: "#/definitions/Token/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]{43}$" }, message: 'must match pattern "^[A-Za-z0-9_-]{43}$"' };
          if (vErrors === null) {
            vErrors = [err12];
          } else {
            vErrors.push(err12);
          }
          errors++;
        }
      } else {
        const err13 = { instancePath: instancePath + "/message", schemaPath: "#/definitions/Token/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err13];
        } else {
          vErrors.push(err13);
        }
        errors++;
      }
    }
    if (data.reactions !== void 0) {
      let data4 = data.reactions;
      if (typeof data4 === "string") {
        if (func2(data4) > 65536) {
          const err14 = { instancePath: instancePath + "/reactions", schemaPath: "#/definitions/SealedBlob/maxLength", keyword: "maxLength", params: { limit: 65536 }, message: "must NOT have more than 65536 characters" };
          if (vErrors === null) {
            vErrors = [err14];
          } else {
            vErrors.push(err14);
          }
          errors++;
        }
        if (!pattern1.test(data4)) {
          const err15 = { instancePath: instancePath + "/reactions", schemaPath: "#/definitions/SealedBlob/pattern", keyword: "pattern", params: { pattern: "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$" }, message: 'must match pattern "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$"' };
          if (vErrors === null) {
            vErrors = [err15];
          } else {
            vErrors.push(err15);
          }
          errors++;
        }
      } else {
        const err16 = { instancePath: instancePath + "/reactions", schemaPath: "#/definitions/SealedBlob/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err16];
        } else {
          vErrors.push(err16);
        }
        errors++;
      }
    }
  } else {
    const err17 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err17];
    } else {
      vErrors.push(err17);
    }
    errors++;
  }
  validate33.errors = vErrors;
  return errors === 0;
}
var SupportMessageEvent = validate34;
function validate34(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  const _errs2 = errors;
  let valid1 = true;
  const _errs3 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.reply_to !== void 0) {
      if (data.reply_to !== null) {
        const err0 = {};
        if (vErrors === null) {
          vErrors = [err0];
        } else {
          vErrors.push(err0);
        }
        errors++;
      }
    }
  }
  var _valid0 = _errs3 === errors;
  errors = _errs2;
  if (vErrors !== null) {
    if (_errs2) {
      vErrors.length = _errs2;
    } else {
      vErrors = null;
    }
  }
  if (_valid0) {
    const _errs6 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.reply_scoped_message_id !== void 0) {
        if (data.reply_scoped_message_id !== null) {
          const err1 = { instancePath: instancePath + "/reply_scoped_message_id", schemaPath: "#/allOf/0/then/properties/reply_scoped_message_id/type", keyword: "type", params: { type: "null" }, message: "must be null" };
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        }
      }
    }
    var _valid0 = _errs6 === errors;
    valid1 = _valid0;
  }
  if (!valid1) {
    const err2 = { instancePath, schemaPath: "#/allOf/0/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
    if (vErrors === null) {
      vErrors = [err2];
    } else {
      vErrors.push(err2);
    }
    errors++;
  }
  const _errs10 = errors;
  let valid4 = true;
  const _errs11 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.reply_to !== void 0) {
      if (typeof data.reply_to !== "string") {
        const err3 = {};
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
  }
  var _valid1 = _errs11 === errors;
  errors = _errs10;
  if (vErrors !== null) {
    if (_errs10) {
      vErrors.length = _errs10;
    } else {
      vErrors = null;
    }
  }
  if (_valid1) {
    const _errs14 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.reply_scoped_message_id !== void 0) {
        let data3 = data.reply_scoped_message_id;
        if (typeof data3 === "string") {
          if (func2(data3) > 65536) {
            const err4 = { instancePath: instancePath + "/reply_scoped_message_id", schemaPath: "#/definitions/SealedBlob/maxLength", keyword: "maxLength", params: { limit: 65536 }, message: "must NOT have more than 65536 characters" };
            if (vErrors === null) {
              vErrors = [err4];
            } else {
              vErrors.push(err4);
            }
            errors++;
          }
          if (!pattern1.test(data3)) {
            const err5 = { instancePath: instancePath + "/reply_scoped_message_id", schemaPath: "#/definitions/SealedBlob/pattern", keyword: "pattern", params: { pattern: "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$" }, message: 'must match pattern "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$"' };
            if (vErrors === null) {
              vErrors = [err5];
            } else {
              vErrors.push(err5);
            }
            errors++;
          }
        } else {
          const err6 = { instancePath: instancePath + "/reply_scoped_message_id", schemaPath: "#/definitions/SealedBlob/type", keyword: "type", params: { type: "string" }, message: "must be string" };
          if (vErrors === null) {
            vErrors = [err6];
          } else {
            vErrors.push(err6);
          }
          errors++;
        }
      }
    }
    var _valid1 = _errs14 === errors;
    valid4 = _valid1;
  }
  if (!valid4) {
    const err7 = { instancePath, schemaPath: "#/allOf/1/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
    if (vErrors === null) {
      vErrors = [err7];
    } else {
      vErrors.push(err7);
    }
    errors++;
  }
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.type === void 0) {
      const err8 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "type" }, message: "must have required property 'type'" };
      if (vErrors === null) {
        vErrors = [err8];
      } else {
        vErrors.push(err8);
      }
      errors++;
    }
    if (data.event_id === void 0) {
      const err9 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "event_id" }, message: "must have required property 'event_id'" };
      if (vErrors === null) {
        vErrors = [err9];
      } else {
        vErrors.push(err9);
      }
      errors++;
    }
    if (data.group === void 0) {
      const err10 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "group" }, message: "must have required property 'group'" };
      if (vErrors === null) {
        vErrors = [err10];
      } else {
        vErrors.push(err10);
      }
      errors++;
    }
    if (data.thread === void 0) {
      const err11 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "thread" }, message: "must have required property 'thread'" };
      if (vErrors === null) {
        vErrors = [err11];
      } else {
        vErrors.push(err11);
      }
      errors++;
    }
    if (data.message === void 0) {
      const err12 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "message" }, message: "must have required property 'message'" };
      if (vErrors === null) {
        vErrors = [err12];
      } else {
        vErrors.push(err12);
      }
      errors++;
    }
    if (data.message_id === void 0) {
      const err13 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "message_id" }, message: "must have required property 'message_id'" };
      if (vErrors === null) {
        vErrors = [err13];
      } else {
        vErrors.push(err13);
      }
      errors++;
    }
    if (data.reply_to === void 0) {
      const err14 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "reply_to" }, message: "must have required property 'reply_to'" };
      if (vErrors === null) {
        vErrors = [err14];
      } else {
        vErrors.push(err14);
      }
      errors++;
    }
    if (data.reply_scoped_message_id === void 0) {
      const err15 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "reply_scoped_message_id" }, message: "must have required property 'reply_scoped_message_id'" };
      if (vErrors === null) {
        vErrors = [err15];
      } else {
        vErrors.push(err15);
      }
      errors++;
    }
    if (data.copyable === void 0) {
      const err16 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "copyable" }, message: "must have required property 'copyable'" };
      if (vErrors === null) {
        vErrors = [err16];
      } else {
        vErrors.push(err16);
      }
      errors++;
    }
    if (data.type !== void 0) {
      if ("support_message" !== data.type) {
        const err17 = { instancePath: instancePath + "/type", schemaPath: "#/properties/type/const", keyword: "const", params: { allowedValue: "support_message" }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err17];
        } else {
          vErrors.push(err17);
        }
        errors++;
      }
    }
    if (data.event_id !== void 0) {
      let data5 = data.event_id;
      if (typeof data5 === "string") {
        if (func2(data5) > 64) {
          const err18 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" };
          if (vErrors === null) {
            vErrors = [err18];
          } else {
            vErrors.push(err18);
          }
          errors++;
        }
        if (func2(data5) < 1) {
          const err19 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err19];
          } else {
            vErrors.push(err19);
          }
          errors++;
        }
        if (!pattern2.test(data5)) {
          const err20 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_.:-]+$" }, message: 'must match pattern "^[A-Za-z0-9_.:-]+$"' };
          if (vErrors === null) {
            vErrors = [err20];
          } else {
            vErrors.push(err20);
          }
          errors++;
        }
      } else {
        const err21 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err21];
        } else {
          vErrors.push(err21);
        }
        errors++;
      }
    }
    if (data.group !== void 0) {
      let data6 = data.group;
      if (typeof data6 === "string") {
        if (!pattern0.test(data6)) {
          const err22 = { instancePath: instancePath + "/group", schemaPath: "#/definitions/Token/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]{43}$" }, message: 'must match pattern "^[A-Za-z0-9_-]{43}$"' };
          if (vErrors === null) {
            vErrors = [err22];
          } else {
            vErrors.push(err22);
          }
          errors++;
        }
      } else {
        const err23 = { instancePath: instancePath + "/group", schemaPath: "#/definitions/Token/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err23];
        } else {
          vErrors.push(err23);
        }
        errors++;
      }
    }
    if (data.thread !== void 0) {
      let data7 = data.thread;
      if (typeof data7 === "string") {
        if (!pattern0.test(data7)) {
          const err24 = { instancePath: instancePath + "/thread", schemaPath: "#/definitions/Token/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]{43}$" }, message: 'must match pattern "^[A-Za-z0-9_-]{43}$"' };
          if (vErrors === null) {
            vErrors = [err24];
          } else {
            vErrors.push(err24);
          }
          errors++;
        }
      } else {
        const err25 = { instancePath: instancePath + "/thread", schemaPath: "#/definitions/Token/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err25];
        } else {
          vErrors.push(err25);
        }
        errors++;
      }
    }
    if (data.message !== void 0) {
      let data8 = data.message;
      if (typeof data8 === "string") {
        if (!pattern0.test(data8)) {
          const err26 = { instancePath: instancePath + "/message", schemaPath: "#/definitions/Token/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]{43}$" }, message: 'must match pattern "^[A-Za-z0-9_-]{43}$"' };
          if (vErrors === null) {
            vErrors = [err26];
          } else {
            vErrors.push(err26);
          }
          errors++;
        }
      } else {
        const err27 = { instancePath: instancePath + "/message", schemaPath: "#/definitions/Token/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err27];
        } else {
          vErrors.push(err27);
        }
        errors++;
      }
    }
    if (data.message_id !== void 0) {
      let data9 = data.message_id;
      if (typeof data9 === "string") {
        if (func2(data9) > 65536) {
          const err28 = { instancePath: instancePath + "/message_id", schemaPath: "#/definitions/SealedBlob/maxLength", keyword: "maxLength", params: { limit: 65536 }, message: "must NOT have more than 65536 characters" };
          if (vErrors === null) {
            vErrors = [err28];
          } else {
            vErrors.push(err28);
          }
          errors++;
        }
        if (!pattern1.test(data9)) {
          const err29 = { instancePath: instancePath + "/message_id", schemaPath: "#/definitions/SealedBlob/pattern", keyword: "pattern", params: { pattern: "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$" }, message: 'must match pattern "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$"' };
          if (vErrors === null) {
            vErrors = [err29];
          } else {
            vErrors.push(err29);
          }
          errors++;
        }
      } else {
        const err30 = { instancePath: instancePath + "/message_id", schemaPath: "#/definitions/SealedBlob/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err30];
        } else {
          vErrors.push(err30);
        }
        errors++;
      }
    }
    if (data.reply_to !== void 0) {
      let data10 = data.reply_to;
      const _errs36 = errors;
      let valid14 = false;
      const _errs37 = errors;
      if (typeof data10 === "string") {
        if (!pattern0.test(data10)) {
          const err31 = { instancePath: instancePath + "/reply_to", schemaPath: "#/definitions/Token/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]{43}$" }, message: 'must match pattern "^[A-Za-z0-9_-]{43}$"' };
          if (vErrors === null) {
            vErrors = [err31];
          } else {
            vErrors.push(err31);
          }
          errors++;
        }
      } else {
        const err32 = { instancePath: instancePath + "/reply_to", schemaPath: "#/definitions/Token/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err32];
        } else {
          vErrors.push(err32);
        }
        errors++;
      }
      var _valid2 = _errs37 === errors;
      valid14 = valid14 || _valid2;
      if (!valid14) {
        const _errs40 = errors;
        if (data10 !== null) {
          const err33 = { instancePath: instancePath + "/reply_to", schemaPath: "#/properties/reply_to/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
          if (vErrors === null) {
            vErrors = [err33];
          } else {
            vErrors.push(err33);
          }
          errors++;
        }
        var _valid2 = _errs40 === errors;
        valid14 = valid14 || _valid2;
      }
      if (!valid14) {
        const err34 = { instancePath: instancePath + "/reply_to", schemaPath: "#/properties/reply_to/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
        if (vErrors === null) {
          vErrors = [err34];
        } else {
          vErrors.push(err34);
        }
        errors++;
      } else {
        errors = _errs36;
        if (vErrors !== null) {
          if (_errs36) {
            vErrors.length = _errs36;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.reply_scoped_message_id !== void 0) {
      let data11 = data.reply_scoped_message_id;
      const _errs43 = errors;
      let valid16 = false;
      const _errs44 = errors;
      if (typeof data11 === "string") {
        if (func2(data11) > 65536) {
          const err35 = { instancePath: instancePath + "/reply_scoped_message_id", schemaPath: "#/definitions/SealedBlob/maxLength", keyword: "maxLength", params: { limit: 65536 }, message: "must NOT have more than 65536 characters" };
          if (vErrors === null) {
            vErrors = [err35];
          } else {
            vErrors.push(err35);
          }
          errors++;
        }
        if (!pattern1.test(data11)) {
          const err36 = { instancePath: instancePath + "/reply_scoped_message_id", schemaPath: "#/definitions/SealedBlob/pattern", keyword: "pattern", params: { pattern: "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$" }, message: 'must match pattern "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$"' };
          if (vErrors === null) {
            vErrors = [err36];
          } else {
            vErrors.push(err36);
          }
          errors++;
        }
      } else {
        const err37 = { instancePath: instancePath + "/reply_scoped_message_id", schemaPath: "#/definitions/SealedBlob/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err37];
        } else {
          vErrors.push(err37);
        }
        errors++;
      }
      var _valid3 = _errs44 === errors;
      valid16 = valid16 || _valid3;
      if (!valid16) {
        const _errs47 = errors;
        if (data11 !== null) {
          const err38 = { instancePath: instancePath + "/reply_scoped_message_id", schemaPath: "#/properties/reply_scoped_message_id/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
          if (vErrors === null) {
            vErrors = [err38];
          } else {
            vErrors.push(err38);
          }
          errors++;
        }
        var _valid3 = _errs47 === errors;
        valid16 = valid16 || _valid3;
      }
      if (!valid16) {
        const err39 = { instancePath: instancePath + "/reply_scoped_message_id", schemaPath: "#/properties/reply_scoped_message_id/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
        if (vErrors === null) {
          vErrors = [err39];
        } else {
          vErrors.push(err39);
        }
        errors++;
      } else {
        errors = _errs43;
        if (vErrors !== null) {
          if (_errs43) {
            vErrors.length = _errs43;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.copyable !== void 0) {
      if (typeof data.copyable !== "boolean") {
        const err40 = { instancePath: instancePath + "/copyable", schemaPath: "#/properties/copyable/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
        if (vErrors === null) {
          vErrors = [err40];
        } else {
          vErrors.push(err40);
        }
        errors++;
      }
    }
  } else {
    const err41 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err41];
    } else {
      vErrors.push(err41);
    }
    errors++;
  }
  validate34.errors = vErrors;
  return errors === 0;
}
var SupportEditEvent = validate35;
var schema67 = { "type": "object", "properties": { "type": { "const": "support_edit" }, "event_id": { "$ref": "#/definitions/EventId" }, "group": { "$ref": "#/definitions/Token" }, "thread": { "$ref": "#/definitions/Token" }, "message": { "$ref": "#/definitions/Token" }, "revision": { "$ref": "#/definitions/Revision" }, "field": { "type": "string", "enum": ["text", "caption"] }, "content": { "$ref": "#/definitions/SealedBlob" } }, "required": ["type", "event_id", "group", "thread", "message", "revision", "field", "content"], "additionalProperties": true, "title": "SupportEditEvent" };
function validate35(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.type === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "type" }, message: "must have required property 'type'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.event_id === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "event_id" }, message: "must have required property 'event_id'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.group === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "group" }, message: "must have required property 'group'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.thread === void 0) {
      const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "thread" }, message: "must have required property 'thread'" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.message === void 0) {
      const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "message" }, message: "must have required property 'message'" };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    if (data.revision === void 0) {
      const err5 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "revision" }, message: "must have required property 'revision'" };
      if (vErrors === null) {
        vErrors = [err5];
      } else {
        vErrors.push(err5);
      }
      errors++;
    }
    if (data.field === void 0) {
      const err6 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "field" }, message: "must have required property 'field'" };
      if (vErrors === null) {
        vErrors = [err6];
      } else {
        vErrors.push(err6);
      }
      errors++;
    }
    if (data.content === void 0) {
      const err7 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "content" }, message: "must have required property 'content'" };
      if (vErrors === null) {
        vErrors = [err7];
      } else {
        vErrors.push(err7);
      }
      errors++;
    }
    if (data.type !== void 0) {
      if ("support_edit" !== data.type) {
        const err8 = { instancePath: instancePath + "/type", schemaPath: "#/properties/type/const", keyword: "const", params: { allowedValue: "support_edit" }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err8];
        } else {
          vErrors.push(err8);
        }
        errors++;
      }
    }
    if (data.event_id !== void 0) {
      let data1 = data.event_id;
      if (typeof data1 === "string") {
        if (func2(data1) > 64) {
          const err9 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" };
          if (vErrors === null) {
            vErrors = [err9];
          } else {
            vErrors.push(err9);
          }
          errors++;
        }
        if (func2(data1) < 1) {
          const err10 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err10];
          } else {
            vErrors.push(err10);
          }
          errors++;
        }
        if (!pattern2.test(data1)) {
          const err11 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_.:-]+$" }, message: 'must match pattern "^[A-Za-z0-9_.:-]+$"' };
          if (vErrors === null) {
            vErrors = [err11];
          } else {
            vErrors.push(err11);
          }
          errors++;
        }
      } else {
        const err12 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err12];
        } else {
          vErrors.push(err12);
        }
        errors++;
      }
    }
    if (data.group !== void 0) {
      let data2 = data.group;
      if (typeof data2 === "string") {
        if (!pattern0.test(data2)) {
          const err13 = { instancePath: instancePath + "/group", schemaPath: "#/definitions/Token/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]{43}$" }, message: 'must match pattern "^[A-Za-z0-9_-]{43}$"' };
          if (vErrors === null) {
            vErrors = [err13];
          } else {
            vErrors.push(err13);
          }
          errors++;
        }
      } else {
        const err14 = { instancePath: instancePath + "/group", schemaPath: "#/definitions/Token/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err14];
        } else {
          vErrors.push(err14);
        }
        errors++;
      }
    }
    if (data.thread !== void 0) {
      let data3 = data.thread;
      if (typeof data3 === "string") {
        if (!pattern0.test(data3)) {
          const err15 = { instancePath: instancePath + "/thread", schemaPath: "#/definitions/Token/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]{43}$" }, message: 'must match pattern "^[A-Za-z0-9_-]{43}$"' };
          if (vErrors === null) {
            vErrors = [err15];
          } else {
            vErrors.push(err15);
          }
          errors++;
        }
      } else {
        const err16 = { instancePath: instancePath + "/thread", schemaPath: "#/definitions/Token/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err16];
        } else {
          vErrors.push(err16);
        }
        errors++;
      }
    }
    if (data.message !== void 0) {
      let data4 = data.message;
      if (typeof data4 === "string") {
        if (!pattern0.test(data4)) {
          const err17 = { instancePath: instancePath + "/message", schemaPath: "#/definitions/Token/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]{43}$" }, message: 'must match pattern "^[A-Za-z0-9_-]{43}$"' };
          if (vErrors === null) {
            vErrors = [err17];
          } else {
            vErrors.push(err17);
          }
          errors++;
        }
      } else {
        const err18 = { instancePath: instancePath + "/message", schemaPath: "#/definitions/Token/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err18];
        } else {
          vErrors.push(err18);
        }
        errors++;
      }
    }
    if (data.revision !== void 0) {
      let data5 = data.revision;
      if (data5 && typeof data5 == "object" && !Array.isArray(data5)) {
        if (data5.edit_date === void 0) {
          const err19 = { instancePath: instancePath + "/revision", schemaPath: "#/definitions/Revision/required", keyword: "required", params: { missingProperty: "edit_date" }, message: "must have required property 'edit_date'" };
          if (vErrors === null) {
            vErrors = [err19];
          } else {
            vErrors.push(err19);
          }
          errors++;
        }
        if (data5.update_id === void 0) {
          const err20 = { instancePath: instancePath + "/revision", schemaPath: "#/definitions/Revision/required", keyword: "required", params: { missingProperty: "update_id" }, message: "must have required property 'update_id'" };
          if (vErrors === null) {
            vErrors = [err20];
          } else {
            vErrors.push(err20);
          }
          errors++;
        }
        if (data5.edit_date !== void 0) {
          let data6 = data5.edit_date;
          if (!(typeof data6 == "number" && (!(data6 % 1) && !isNaN(data6)) && isFinite(data6))) {
            const err21 = { instancePath: instancePath + "/revision/edit_date", schemaPath: "#/definitions/Revision/properties/edit_date/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
            if (vErrors === null) {
              vErrors = [err21];
            } else {
              vErrors.push(err21);
            }
            errors++;
          }
          if (typeof data6 == "number" && isFinite(data6)) {
            if (data6 < 0 || isNaN(data6)) {
              const err22 = { instancePath: instancePath + "/revision/edit_date", schemaPath: "#/definitions/Revision/properties/edit_date/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
              if (vErrors === null) {
                vErrors = [err22];
              } else {
                vErrors.push(err22);
              }
              errors++;
            }
          }
        }
        if (data5.update_id !== void 0) {
          let data7 = data5.update_id;
          if (!(typeof data7 == "number" && (!(data7 % 1) && !isNaN(data7)) && isFinite(data7))) {
            const err23 = { instancePath: instancePath + "/revision/update_id", schemaPath: "#/definitions/Revision/properties/update_id/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
            if (vErrors === null) {
              vErrors = [err23];
            } else {
              vErrors.push(err23);
            }
            errors++;
          }
          if (typeof data7 == "number" && isFinite(data7)) {
            if (data7 < 0 || isNaN(data7)) {
              const err24 = { instancePath: instancePath + "/revision/update_id", schemaPath: "#/definitions/Revision/properties/update_id/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
              if (vErrors === null) {
                vErrors = [err24];
              } else {
                vErrors.push(err24);
              }
              errors++;
            }
          }
        }
      } else {
        const err25 = { instancePath: instancePath + "/revision", schemaPath: "#/definitions/Revision/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err25];
        } else {
          vErrors.push(err25);
        }
        errors++;
      }
    }
    if (data.field !== void 0) {
      let data8 = data.field;
      if (typeof data8 !== "string") {
        const err26 = { instancePath: instancePath + "/field", schemaPath: "#/properties/field/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err26];
        } else {
          vErrors.push(err26);
        }
        errors++;
      }
      if (!(data8 === "text" || data8 === "caption")) {
        const err27 = { instancePath: instancePath + "/field", schemaPath: "#/properties/field/enum", keyword: "enum", params: { allowedValues: schema67.properties.field.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err27];
        } else {
          vErrors.push(err27);
        }
        errors++;
      }
    }
    if (data.content !== void 0) {
      let data9 = data.content;
      if (typeof data9 === "string") {
        if (func2(data9) > 65536) {
          const err28 = { instancePath: instancePath + "/content", schemaPath: "#/definitions/SealedBlob/maxLength", keyword: "maxLength", params: { limit: 65536 }, message: "must NOT have more than 65536 characters" };
          if (vErrors === null) {
            vErrors = [err28];
          } else {
            vErrors.push(err28);
          }
          errors++;
        }
        if (!pattern1.test(data9)) {
          const err29 = { instancePath: instancePath + "/content", schemaPath: "#/definitions/SealedBlob/pattern", keyword: "pattern", params: { pattern: "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$" }, message: 'must match pattern "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$"' };
          if (vErrors === null) {
            vErrors = [err29];
          } else {
            vErrors.push(err29);
          }
          errors++;
        }
      } else {
        const err30 = { instancePath: instancePath + "/content", schemaPath: "#/definitions/SealedBlob/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err30];
        } else {
          vErrors.push(err30);
        }
        errors++;
      }
    }
  } else {
    const err31 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err31];
    } else {
      vErrors.push(err31);
    }
    errors++;
  }
  validate35.errors = vErrors;
  return errors === 0;
}
var SupportReactionEvent = validate36;
function validate36(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.type === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "type" }, message: "must have required property 'type'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.event_id === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "event_id" }, message: "must have required property 'event_id'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.group === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "group" }, message: "must have required property 'group'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.message === void 0) {
      const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "message" }, message: "must have required property 'message'" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.reactions === void 0) {
      const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "reactions" }, message: "must have required property 'reactions'" };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    if (data.type !== void 0) {
      if ("support_reaction" !== data.type) {
        const err5 = { instancePath: instancePath + "/type", schemaPath: "#/properties/type/const", keyword: "const", params: { allowedValue: "support_reaction" }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
    }
    if (data.event_id !== void 0) {
      let data1 = data.event_id;
      if (typeof data1 === "string") {
        if (func2(data1) > 64) {
          const err6 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" };
          if (vErrors === null) {
            vErrors = [err6];
          } else {
            vErrors.push(err6);
          }
          errors++;
        }
        if (func2(data1) < 1) {
          const err7 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        }
        if (!pattern2.test(data1)) {
          const err8 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_.:-]+$" }, message: 'must match pattern "^[A-Za-z0-9_.:-]+$"' };
          if (vErrors === null) {
            vErrors = [err8];
          } else {
            vErrors.push(err8);
          }
          errors++;
        }
      } else {
        const err9 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err9];
        } else {
          vErrors.push(err9);
        }
        errors++;
      }
    }
    if (data.group !== void 0) {
      let data2 = data.group;
      if (typeof data2 === "string") {
        if (!pattern0.test(data2)) {
          const err10 = { instancePath: instancePath + "/group", schemaPath: "#/definitions/Token/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]{43}$" }, message: 'must match pattern "^[A-Za-z0-9_-]{43}$"' };
          if (vErrors === null) {
            vErrors = [err10];
          } else {
            vErrors.push(err10);
          }
          errors++;
        }
      } else {
        const err11 = { instancePath: instancePath + "/group", schemaPath: "#/definitions/Token/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err11];
        } else {
          vErrors.push(err11);
        }
        errors++;
      }
    }
    if (data.message !== void 0) {
      let data3 = data.message;
      if (typeof data3 === "string") {
        if (!pattern0.test(data3)) {
          const err12 = { instancePath: instancePath + "/message", schemaPath: "#/definitions/Token/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]{43}$" }, message: 'must match pattern "^[A-Za-z0-9_-]{43}$"' };
          if (vErrors === null) {
            vErrors = [err12];
          } else {
            vErrors.push(err12);
          }
          errors++;
        }
      } else {
        const err13 = { instancePath: instancePath + "/message", schemaPath: "#/definitions/Token/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err13];
        } else {
          vErrors.push(err13);
        }
        errors++;
      }
    }
    if (data.reactions !== void 0) {
      let data4 = data.reactions;
      if (typeof data4 === "string") {
        if (func2(data4) > 65536) {
          const err14 = { instancePath: instancePath + "/reactions", schemaPath: "#/definitions/SealedBlob/maxLength", keyword: "maxLength", params: { limit: 65536 }, message: "must NOT have more than 65536 characters" };
          if (vErrors === null) {
            vErrors = [err14];
          } else {
            vErrors.push(err14);
          }
          errors++;
        }
        if (!pattern1.test(data4)) {
          const err15 = { instancePath: instancePath + "/reactions", schemaPath: "#/definitions/SealedBlob/pattern", keyword: "pattern", params: { pattern: "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$" }, message: 'must match pattern "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$"' };
          if (vErrors === null) {
            vErrors = [err15];
          } else {
            vErrors.push(err15);
          }
          errors++;
        }
      } else {
        const err16 = { instancePath: instancePath + "/reactions", schemaPath: "#/definitions/SealedBlob/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err16];
        } else {
          vErrors.push(err16);
        }
        errors++;
      }
    }
  } else {
    const err17 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err17];
    } else {
      vErrors.push(err17);
    }
    errors++;
  }
  validate36.errors = vErrors;
  return errors === 0;
}
var HostNoticeEvent = validate37;
function validate37(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.type === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "type" }, message: "must have required property 'type'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.event_id === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "event_id" }, message: "must have required property 'event_id'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.user === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "user" }, message: "must have required property 'user'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.chat === void 0) {
      const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "chat" }, message: "must have required property 'chat'" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.profile === void 0) {
      const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "profile" }, message: "must have required property 'profile'" };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    if (data.language === void 0) {
      const err5 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "language" }, message: "must have required property 'language'" };
      if (vErrors === null) {
        vErrors = [err5];
      } else {
        vErrors.push(err5);
      }
      errors++;
    }
    if (data.text === void 0) {
      const err6 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "text" }, message: "must have required property 'text'" };
      if (vErrors === null) {
        vErrors = [err6];
      } else {
        vErrors.push(err6);
      }
      errors++;
    }
    if (data.type !== void 0) {
      if ("host_notice" !== data.type) {
        const err7 = { instancePath: instancePath + "/type", schemaPath: "#/properties/type/const", keyword: "const", params: { allowedValue: "host_notice" }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      }
    }
    if (data.event_id !== void 0) {
      let data1 = data.event_id;
      if (typeof data1 === "string") {
        if (func2(data1) > 64) {
          const err8 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" };
          if (vErrors === null) {
            vErrors = [err8];
          } else {
            vErrors.push(err8);
          }
          errors++;
        }
        if (func2(data1) < 1) {
          const err9 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err9];
          } else {
            vErrors.push(err9);
          }
          errors++;
        }
        if (!pattern2.test(data1)) {
          const err10 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_.:-]+$" }, message: 'must match pattern "^[A-Za-z0-9_.:-]+$"' };
          if (vErrors === null) {
            vErrors = [err10];
          } else {
            vErrors.push(err10);
          }
          errors++;
        }
      } else {
        const err11 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err11];
        } else {
          vErrors.push(err11);
        }
        errors++;
      }
    }
    if (data.user !== void 0) {
      let data2 = data.user;
      if (typeof data2 === "string") {
        if (!pattern0.test(data2)) {
          const err12 = { instancePath: instancePath + "/user", schemaPath: "#/definitions/Token/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]{43}$" }, message: 'must match pattern "^[A-Za-z0-9_-]{43}$"' };
          if (vErrors === null) {
            vErrors = [err12];
          } else {
            vErrors.push(err12);
          }
          errors++;
        }
      } else {
        const err13 = { instancePath: instancePath + "/user", schemaPath: "#/definitions/Token/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err13];
        } else {
          vErrors.push(err13);
        }
        errors++;
      }
    }
    if (data.chat !== void 0) {
      let data3 = data.chat;
      if (typeof data3 === "string") {
        if (func2(data3) > 65536) {
          const err14 = { instancePath: instancePath + "/chat", schemaPath: "#/definitions/SealedBlob/maxLength", keyword: "maxLength", params: { limit: 65536 }, message: "must NOT have more than 65536 characters" };
          if (vErrors === null) {
            vErrors = [err14];
          } else {
            vErrors.push(err14);
          }
          errors++;
        }
        if (!pattern1.test(data3)) {
          const err15 = { instancePath: instancePath + "/chat", schemaPath: "#/definitions/SealedBlob/pattern", keyword: "pattern", params: { pattern: "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$" }, message: 'must match pattern "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$"' };
          if (vErrors === null) {
            vErrors = [err15];
          } else {
            vErrors.push(err15);
          }
          errors++;
        }
      } else {
        const err16 = { instancePath: instancePath + "/chat", schemaPath: "#/definitions/SealedBlob/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err16];
        } else {
          vErrors.push(err16);
        }
        errors++;
      }
    }
    if (data.profile !== void 0) {
      let data4 = data.profile;
      if (typeof data4 === "string") {
        if (!pattern0.test(data4)) {
          const err17 = { instancePath: instancePath + "/profile", schemaPath: "#/definitions/Token/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]{43}$" }, message: 'must match pattern "^[A-Za-z0-9_-]{43}$"' };
          if (vErrors === null) {
            vErrors = [err17];
          } else {
            vErrors.push(err17);
          }
          errors++;
        }
      } else {
        const err18 = { instancePath: instancePath + "/profile", schemaPath: "#/definitions/Token/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err18];
        } else {
          vErrors.push(err18);
        }
        errors++;
      }
    }
    if (data.language !== void 0) {
      let data5 = data.language;
      if (typeof data5 === "string") {
        if (func2(data5) > 65536) {
          const err19 = { instancePath: instancePath + "/language", schemaPath: "#/definitions/SealedBlob/maxLength", keyword: "maxLength", params: { limit: 65536 }, message: "must NOT have more than 65536 characters" };
          if (vErrors === null) {
            vErrors = [err19];
          } else {
            vErrors.push(err19);
          }
          errors++;
        }
        if (!pattern1.test(data5)) {
          const err20 = { instancePath: instancePath + "/language", schemaPath: "#/definitions/SealedBlob/pattern", keyword: "pattern", params: { pattern: "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$" }, message: 'must match pattern "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$"' };
          if (vErrors === null) {
            vErrors = [err20];
          } else {
            vErrors.push(err20);
          }
          errors++;
        }
      } else {
        const err21 = { instancePath: instancePath + "/language", schemaPath: "#/definitions/SealedBlob/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err21];
        } else {
          vErrors.push(err21);
        }
        errors++;
      }
    }
    if (data.text !== void 0) {
      let data6 = data.text;
      if (typeof data6 === "string") {
        if (func2(data6) > 65536) {
          const err22 = { instancePath: instancePath + "/text", schemaPath: "#/definitions/SealedBlob/maxLength", keyword: "maxLength", params: { limit: 65536 }, message: "must NOT have more than 65536 characters" };
          if (vErrors === null) {
            vErrors = [err22];
          } else {
            vErrors.push(err22);
          }
          errors++;
        }
        if (!pattern1.test(data6)) {
          const err23 = { instancePath: instancePath + "/text", schemaPath: "#/definitions/SealedBlob/pattern", keyword: "pattern", params: { pattern: "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$" }, message: 'must match pattern "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$"' };
          if (vErrors === null) {
            vErrors = [err23];
          } else {
            vErrors.push(err23);
          }
          errors++;
        }
      } else {
        const err24 = { instancePath: instancePath + "/text", schemaPath: "#/definitions/SealedBlob/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err24];
        } else {
          vErrors.push(err24);
        }
        errors++;
      }
    }
  } else {
    const err25 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err25];
    } else {
      vErrors.push(err25);
    }
    errors++;
  }
  validate37.errors = vErrors;
  return errors === 0;
}
var UserForgetEvent = validate38;
function validate38(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.type === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "type" }, message: "must have required property 'type'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.event_id === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "event_id" }, message: "must have required property 'event_id'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.user === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "user" }, message: "must have required property 'user'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.type !== void 0) {
      if ("user_forget" !== data.type) {
        const err3 = { instancePath: instancePath + "/type", schemaPath: "#/properties/type/const", keyword: "const", params: { allowedValue: "user_forget" }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    if (data.event_id !== void 0) {
      let data1 = data.event_id;
      if (typeof data1 === "string") {
        if (func2(data1) > 64) {
          const err4 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
        if (func2(data1) < 1) {
          const err5 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
        if (!pattern2.test(data1)) {
          const err6 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_.:-]+$" }, message: 'must match pattern "^[A-Za-z0-9_.:-]+$"' };
          if (vErrors === null) {
            vErrors = [err6];
          } else {
            vErrors.push(err6);
          }
          errors++;
        }
      } else {
        const err7 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      }
    }
    if (data.user !== void 0) {
      let data2 = data.user;
      if (typeof data2 === "string") {
        if (!pattern0.test(data2)) {
          const err8 = { instancePath: instancePath + "/user", schemaPath: "#/definitions/Token/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]{43}$" }, message: 'must match pattern "^[A-Za-z0-9_-]{43}$"' };
          if (vErrors === null) {
            vErrors = [err8];
          } else {
            vErrors.push(err8);
          }
          errors++;
        }
      } else {
        const err9 = { instancePath: instancePath + "/user", schemaPath: "#/definitions/Token/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err9];
        } else {
          vErrors.push(err9);
        }
        errors++;
      }
    }
  } else {
    const err10 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err10];
    } else {
      vErrors.push(err10);
    }
    errors++;
  }
  validate38.errors = vErrors;
  return errors === 0;
}
var CreatedMessage = validate39;
function validate39(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.kind === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.message === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "message" }, message: "must have required property 'message'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.message_id === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "message_id" }, message: "must have required property 'message_id'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.binding === void 0) {
      const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "binding" }, message: "must have required property 'binding'" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.kind !== void 0) {
      if ("message" !== data.kind) {
        const err4 = { instancePath: instancePath + "/kind", schemaPath: "#/properties/kind/const", keyword: "const", params: { allowedValue: "message" }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
    if (data.message !== void 0) {
      let data1 = data.message;
      if (typeof data1 === "string") {
        if (!pattern0.test(data1)) {
          const err5 = { instancePath: instancePath + "/message", schemaPath: "#/definitions/Token/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]{43}$" }, message: 'must match pattern "^[A-Za-z0-9_-]{43}$"' };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
      } else {
        const err6 = { instancePath: instancePath + "/message", schemaPath: "#/definitions/Token/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
    }
    if (data.message_id !== void 0) {
      let data2 = data.message_id;
      if (typeof data2 === "string") {
        if (func2(data2) > 65536) {
          const err7 = { instancePath: instancePath + "/message_id", schemaPath: "#/definitions/SealedBlob/maxLength", keyword: "maxLength", params: { limit: 65536 }, message: "must NOT have more than 65536 characters" };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        }
        if (!pattern1.test(data2)) {
          const err8 = { instancePath: instancePath + "/message_id", schemaPath: "#/definitions/SealedBlob/pattern", keyword: "pattern", params: { pattern: "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$" }, message: 'must match pattern "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$"' };
          if (vErrors === null) {
            vErrors = [err8];
          } else {
            vErrors.push(err8);
          }
          errors++;
        }
      } else {
        const err9 = { instancePath: instancePath + "/message_id", schemaPath: "#/definitions/SealedBlob/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err9];
        } else {
          vErrors.push(err9);
        }
        errors++;
      }
    }
    if (data.binding !== void 0) {
      let data3 = data.binding;
      const _errs10 = errors;
      let valid3 = false;
      const _errs11 = errors;
      if (typeof data3 === "string") {
        if (func2(data3) > 65536) {
          const err10 = { instancePath: instancePath + "/binding", schemaPath: "#/definitions/SealedBlob/maxLength", keyword: "maxLength", params: { limit: 65536 }, message: "must NOT have more than 65536 characters" };
          if (vErrors === null) {
            vErrors = [err10];
          } else {
            vErrors.push(err10);
          }
          errors++;
        }
        if (!pattern1.test(data3)) {
          const err11 = { instancePath: instancePath + "/binding", schemaPath: "#/definitions/SealedBlob/pattern", keyword: "pattern", params: { pattern: "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$" }, message: 'must match pattern "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$"' };
          if (vErrors === null) {
            vErrors = [err11];
          } else {
            vErrors.push(err11);
          }
          errors++;
        }
      } else {
        const err12 = { instancePath: instancePath + "/binding", schemaPath: "#/definitions/SealedBlob/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err12];
        } else {
          vErrors.push(err12);
        }
        errors++;
      }
      var _valid0 = _errs11 === errors;
      valid3 = valid3 || _valid0;
      if (!valid3) {
        const _errs14 = errors;
        if (data3 !== null) {
          const err13 = { instancePath: instancePath + "/binding", schemaPath: "#/properties/binding/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
          if (vErrors === null) {
            vErrors = [err13];
          } else {
            vErrors.push(err13);
          }
          errors++;
        }
        var _valid0 = _errs14 === errors;
        valid3 = valid3 || _valid0;
      }
      if (!valid3) {
        const err14 = { instancePath: instancePath + "/binding", schemaPath: "#/properties/binding/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
        if (vErrors === null) {
          vErrors = [err14];
        } else {
          vErrors.push(err14);
        }
        errors++;
      } else {
        errors = _errs10;
        if (vErrors !== null) {
          if (_errs10) {
            vErrors.length = _errs10;
          } else {
            vErrors = null;
          }
        }
      }
    }
  } else {
    const err15 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err15];
    } else {
      vErrors.push(err15);
    }
    errors++;
  }
  validate39.errors = vErrors;
  return errors === 0;
}
var CreatedTopic = validate40;
function validate40(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.kind === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.thread === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "thread" }, message: "must have required property 'thread'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.thread_id === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "thread_id" }, message: "must have required property 'thread_id'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.binding === void 0) {
      const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "binding" }, message: "must have required property 'binding'" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.kind !== void 0) {
      if ("topic" !== data.kind) {
        const err4 = { instancePath: instancePath + "/kind", schemaPath: "#/properties/kind/const", keyword: "const", params: { allowedValue: "topic" }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
    if (data.thread !== void 0) {
      let data1 = data.thread;
      if (typeof data1 === "string") {
        if (!pattern0.test(data1)) {
          const err5 = { instancePath: instancePath + "/thread", schemaPath: "#/definitions/Token/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]{43}$" }, message: 'must match pattern "^[A-Za-z0-9_-]{43}$"' };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
      } else {
        const err6 = { instancePath: instancePath + "/thread", schemaPath: "#/definitions/Token/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
    }
    if (data.thread_id !== void 0) {
      let data2 = data.thread_id;
      if (typeof data2 === "string") {
        if (func2(data2) > 65536) {
          const err7 = { instancePath: instancePath + "/thread_id", schemaPath: "#/definitions/SealedBlob/maxLength", keyword: "maxLength", params: { limit: 65536 }, message: "must NOT have more than 65536 characters" };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        }
        if (!pattern1.test(data2)) {
          const err8 = { instancePath: instancePath + "/thread_id", schemaPath: "#/definitions/SealedBlob/pattern", keyword: "pattern", params: { pattern: "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$" }, message: 'must match pattern "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$"' };
          if (vErrors === null) {
            vErrors = [err8];
          } else {
            vErrors.push(err8);
          }
          errors++;
        }
      } else {
        const err9 = { instancePath: instancePath + "/thread_id", schemaPath: "#/definitions/SealedBlob/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err9];
        } else {
          vErrors.push(err9);
        }
        errors++;
      }
    }
    if (data.binding !== void 0) {
      let data3 = data.binding;
      const _errs10 = errors;
      let valid3 = false;
      const _errs11 = errors;
      if (typeof data3 === "string") {
        if (func2(data3) > 65536) {
          const err10 = { instancePath: instancePath + "/binding", schemaPath: "#/definitions/SealedBlob/maxLength", keyword: "maxLength", params: { limit: 65536 }, message: "must NOT have more than 65536 characters" };
          if (vErrors === null) {
            vErrors = [err10];
          } else {
            vErrors.push(err10);
          }
          errors++;
        }
        if (!pattern1.test(data3)) {
          const err11 = { instancePath: instancePath + "/binding", schemaPath: "#/definitions/SealedBlob/pattern", keyword: "pattern", params: { pattern: "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$" }, message: 'must match pattern "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$"' };
          if (vErrors === null) {
            vErrors = [err11];
          } else {
            vErrors.push(err11);
          }
          errors++;
        }
      } else {
        const err12 = { instancePath: instancePath + "/binding", schemaPath: "#/definitions/SealedBlob/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err12];
        } else {
          vErrors.push(err12);
        }
        errors++;
      }
      var _valid0 = _errs11 === errors;
      valid3 = valid3 || _valid0;
      if (!valid3) {
        const _errs14 = errors;
        if (data3 !== null) {
          const err13 = { instancePath: instancePath + "/binding", schemaPath: "#/properties/binding/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
          if (vErrors === null) {
            vErrors = [err13];
          } else {
            vErrors.push(err13);
          }
          errors++;
        }
        var _valid0 = _errs14 === errors;
        valid3 = valid3 || _valid0;
      }
      if (!valid3) {
        const err14 = { instancePath: instancePath + "/binding", schemaPath: "#/properties/binding/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
        if (vErrors === null) {
          vErrors = [err14];
        } else {
          vErrors.push(err14);
        }
        errors++;
      } else {
        errors = _errs10;
        if (vErrors !== null) {
          if (_errs10) {
            vErrors.length = _errs10;
          } else {
            vErrors = null;
          }
        }
      }
    }
  } else {
    const err15 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err15];
    } else {
      vErrors.push(err15);
    }
    errors++;
  }
  validate40.errors = vErrors;
  return errors === 0;
}
var Created = validate41;
function validate41(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  const _errs0 = errors;
  let valid0 = false;
  const _errs1 = errors;
  if (data !== null) {
    const err0 = { instancePath, schemaPath: "#/anyOf/0/type", keyword: "type", params: { type: "null" }, message: "must be null" };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  var _valid0 = _errs1 === errors;
  valid0 = valid0 || _valid0;
  if (!valid0) {
    const _errs3 = errors;
    if (!validate39(data, { instancePath, parentData, parentDataProperty, rootData })) {
      vErrors = vErrors === null ? validate39.errors : vErrors.concat(validate39.errors);
      errors = vErrors.length;
    }
    var _valid0 = _errs3 === errors;
    valid0 = valid0 || _valid0;
    if (!valid0) {
      const _errs4 = errors;
      if (!validate40(data, { instancePath, parentData, parentDataProperty, rootData })) {
        vErrors = vErrors === null ? validate40.errors : vErrors.concat(validate40.errors);
        errors = vErrors.length;
      }
      var _valid0 = _errs4 === errors;
      valid0 = valid0 || _valid0;
    }
  }
  if (!valid0) {
    const err1 = { instancePath, schemaPath: "#/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  } else {
    errors = _errs0;
    if (vErrors !== null) {
      if (_errs0) {
        vErrors.length = _errs0;
      } else {
        vErrors = null;
      }
    }
  }
  validate41.errors = vErrors;
  return errors === 0;
}
var SuccessOutcome = validate44;
function validate44(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.kind === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.created === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "created" }, message: "must have required property 'created'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.kind !== void 0) {
      if ("success" !== data.kind) {
        const err2 = { instancePath: instancePath + "/kind", schemaPath: "#/properties/kind/const", keyword: "const", params: { allowedValue: "success" }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.created !== void 0) {
      if (!validate41(data.created, { instancePath: instancePath + "/created", parentData: data, parentDataProperty: "created", rootData })) {
        vErrors = vErrors === null ? validate41.errors : vErrors.concat(validate41.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err3 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err3];
    } else {
      vErrors.push(err3);
    }
    errors++;
  }
  validate44.errors = vErrors;
  return errors === 0;
}
var TelegramErrorOutcome = validate46;
function validate46(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.kind === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.error_code === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "error_code" }, message: "must have required property 'error_code'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.description === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "description" }, message: "must have required property 'description'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.retry_after === void 0) {
      const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "retry_after" }, message: "must have required property 'retry_after'" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.kind !== void 0) {
      if ("telegram_error" !== data.kind) {
        const err4 = { instancePath: instancePath + "/kind", schemaPath: "#/properties/kind/const", keyword: "const", params: { allowedValue: "telegram_error" }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
    if (data.error_code !== void 0) {
      let data1 = data.error_code;
      if (!(typeof data1 == "number" && (!(data1 % 1) && !isNaN(data1)) && isFinite(data1))) {
        const err5 = { instancePath: instancePath + "/error_code", schemaPath: "#/properties/error_code/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
    }
    if (data.description !== void 0) {
      let data2 = data.description;
      if (typeof data2 === "string") {
        if (func2(data2) > 1024) {
          const err6 = { instancePath: instancePath + "/description", schemaPath: "#/properties/description/maxLength", keyword: "maxLength", params: { limit: 1024 }, message: "must NOT have more than 1024 characters" };
          if (vErrors === null) {
            vErrors = [err6];
          } else {
            vErrors.push(err6);
          }
          errors++;
        }
      } else {
        const err7 = { instancePath: instancePath + "/description", schemaPath: "#/properties/description/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      }
    }
    if (data.retry_after !== void 0) {
      let data3 = data.retry_after;
      const _errs8 = errors;
      let valid1 = false;
      const _errs9 = errors;
      if (!(typeof data3 == "number" && (!(data3 % 1) && !isNaN(data3)) && isFinite(data3))) {
        const err8 = { instancePath: instancePath + "/retry_after", schemaPath: "#/properties/retry_after/anyOf/0/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
        if (vErrors === null) {
          vErrors = [err8];
        } else {
          vErrors.push(err8);
        }
        errors++;
      }
      var _valid0 = _errs9 === errors;
      valid1 = valid1 || _valid0;
      if (!valid1) {
        const _errs11 = errors;
        if (data3 !== null) {
          const err9 = { instancePath: instancePath + "/retry_after", schemaPath: "#/properties/retry_after/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
          if (vErrors === null) {
            vErrors = [err9];
          } else {
            vErrors.push(err9);
          }
          errors++;
        }
        var _valid0 = _errs11 === errors;
        valid1 = valid1 || _valid0;
      }
      if (!valid1) {
        const err10 = { instancePath: instancePath + "/retry_after", schemaPath: "#/properties/retry_after/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
        if (vErrors === null) {
          vErrors = [err10];
        } else {
          vErrors.push(err10);
        }
        errors++;
      } else {
        errors = _errs8;
        if (vErrors !== null) {
          if (_errs8) {
            vErrors.length = _errs8;
          } else {
            vErrors = null;
          }
        }
      }
    }
  } else {
    const err11 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err11];
    } else {
      vErrors.push(err11);
    }
    errors++;
  }
  validate46.errors = vErrors;
  return errors === 0;
}
var TransportErrorOutcome = validate47;
function validate47(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.kind === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.kind !== void 0) {
      if ("transport_error" !== data.kind) {
        const err1 = { instancePath: instancePath + "/kind", schemaPath: "#/properties/kind/const", keyword: "const", params: { allowedValue: "transport_error" }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
    }
    if (data.description !== void 0) {
      let data1 = data.description;
      if (typeof data1 === "string") {
        if (func2(data1) > 256) {
          const err2 = { instancePath: instancePath + "/description", schemaPath: "#/properties/description/maxLength", keyword: "maxLength", params: { limit: 256 }, message: "must NOT have more than 256 characters" };
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        }
      } else {
        const err3 = { instancePath: instancePath + "/description", schemaPath: "#/properties/description/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
  } else {
    const err4 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err4];
    } else {
      vErrors.push(err4);
    }
    errors++;
  }
  validate47.errors = vErrors;
  return errors === 0;
}
var HostRejectedOutcome = validate48;
function validate48(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.kind === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.reason === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "reason" }, message: "must have required property 'reason'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.kind !== void 0) {
      if ("rejected_by_host" !== data.kind) {
        const err2 = { instancePath: instancePath + "/kind", schemaPath: "#/properties/kind/const", keyword: "const", params: { allowedValue: "rejected_by_host" }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.reason !== void 0) {
      if (typeof data.reason !== "string") {
        const err3 = { instancePath: instancePath + "/reason", schemaPath: "#/properties/reason/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
  } else {
    const err4 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err4];
    } else {
      vErrors.push(err4);
    }
    errors++;
  }
  validate48.errors = vErrors;
  return errors === 0;
}
var Outcome = validate49;
function validate49(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  const _errs0 = errors;
  let valid0 = false;
  let passing0 = null;
  const _errs1 = errors;
  if (!validate44(data, { instancePath, parentData, parentDataProperty, rootData })) {
    vErrors = vErrors === null ? validate44.errors : vErrors.concat(validate44.errors);
    errors = vErrors.length;
  }
  var _valid0 = _errs1 === errors;
  if (_valid0) {
    valid0 = true;
    passing0 = 0;
  }
  const _errs2 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.kind === void 0) {
      const err0 = { instancePath, schemaPath: "#/definitions/TelegramErrorOutcome/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.error_code === void 0) {
      const err1 = { instancePath, schemaPath: "#/definitions/TelegramErrorOutcome/required", keyword: "required", params: { missingProperty: "error_code" }, message: "must have required property 'error_code'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.description === void 0) {
      const err2 = { instancePath, schemaPath: "#/definitions/TelegramErrorOutcome/required", keyword: "required", params: { missingProperty: "description" }, message: "must have required property 'description'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.retry_after === void 0) {
      const err3 = { instancePath, schemaPath: "#/definitions/TelegramErrorOutcome/required", keyword: "required", params: { missingProperty: "retry_after" }, message: "must have required property 'retry_after'" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.kind !== void 0) {
      if ("telegram_error" !== data.kind) {
        const err4 = { instancePath: instancePath + "/kind", schemaPath: "#/definitions/TelegramErrorOutcome/properties/kind/const", keyword: "const", params: { allowedValue: "telegram_error" }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
    if (data.error_code !== void 0) {
      let data1 = data.error_code;
      if (!(typeof data1 == "number" && (!(data1 % 1) && !isNaN(data1)) && isFinite(data1))) {
        const err5 = { instancePath: instancePath + "/error_code", schemaPath: "#/definitions/TelegramErrorOutcome/properties/error_code/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
    }
    if (data.description !== void 0) {
      let data2 = data.description;
      if (typeof data2 === "string") {
        if (func2(data2) > 1024) {
          const err6 = { instancePath: instancePath + "/description", schemaPath: "#/definitions/TelegramErrorOutcome/properties/description/maxLength", keyword: "maxLength", params: { limit: 1024 }, message: "must NOT have more than 1024 characters" };
          if (vErrors === null) {
            vErrors = [err6];
          } else {
            vErrors.push(err6);
          }
          errors++;
        }
      } else {
        const err7 = { instancePath: instancePath + "/description", schemaPath: "#/definitions/TelegramErrorOutcome/properties/description/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      }
    }
    if (data.retry_after !== void 0) {
      let data3 = data.retry_after;
      const _errs12 = errors;
      let valid3 = false;
      const _errs13 = errors;
      if (!(typeof data3 == "number" && (!(data3 % 1) && !isNaN(data3)) && isFinite(data3))) {
        const err8 = { instancePath: instancePath + "/retry_after", schemaPath: "#/definitions/TelegramErrorOutcome/properties/retry_after/anyOf/0/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
        if (vErrors === null) {
          vErrors = [err8];
        } else {
          vErrors.push(err8);
        }
        errors++;
      }
      var _valid1 = _errs13 === errors;
      valid3 = valid3 || _valid1;
      if (!valid3) {
        const _errs15 = errors;
        if (data3 !== null) {
          const err9 = { instancePath: instancePath + "/retry_after", schemaPath: "#/definitions/TelegramErrorOutcome/properties/retry_after/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
          if (vErrors === null) {
            vErrors = [err9];
          } else {
            vErrors.push(err9);
          }
          errors++;
        }
        var _valid1 = _errs15 === errors;
        valid3 = valid3 || _valid1;
      }
      if (!valid3) {
        const err10 = { instancePath: instancePath + "/retry_after", schemaPath: "#/definitions/TelegramErrorOutcome/properties/retry_after/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
        if (vErrors === null) {
          vErrors = [err10];
        } else {
          vErrors.push(err10);
        }
        errors++;
      } else {
        errors = _errs12;
        if (vErrors !== null) {
          if (_errs12) {
            vErrors.length = _errs12;
          } else {
            vErrors = null;
          }
        }
      }
    }
  } else {
    const err11 = { instancePath, schemaPath: "#/definitions/TelegramErrorOutcome/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err11];
    } else {
      vErrors.push(err11);
    }
    errors++;
  }
  var _valid0 = _errs2 === errors;
  if (_valid0 && valid0) {
    valid0 = false;
    passing0 = [passing0, 1];
  } else {
    if (_valid0) {
      valid0 = true;
      passing0 = 1;
    }
    const _errs17 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.kind === void 0) {
        const err12 = { instancePath, schemaPath: "#/definitions/TransportErrorOutcome/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
        if (vErrors === null) {
          vErrors = [err12];
        } else {
          vErrors.push(err12);
        }
        errors++;
      }
      if (data.kind !== void 0) {
        if ("transport_error" !== data.kind) {
          const err13 = { instancePath: instancePath + "/kind", schemaPath: "#/definitions/TransportErrorOutcome/properties/kind/const", keyword: "const", params: { allowedValue: "transport_error" }, message: "must be equal to constant" };
          if (vErrors === null) {
            vErrors = [err13];
          } else {
            vErrors.push(err13);
          }
          errors++;
        }
      }
      if (data.description !== void 0) {
        let data5 = data.description;
        if (typeof data5 === "string") {
          if (func2(data5) > 256) {
            const err14 = { instancePath: instancePath + "/description", schemaPath: "#/definitions/TransportErrorOutcome/properties/description/maxLength", keyword: "maxLength", params: { limit: 256 }, message: "must NOT have more than 256 characters" };
            if (vErrors === null) {
              vErrors = [err14];
            } else {
              vErrors.push(err14);
            }
            errors++;
          }
        } else {
          const err15 = { instancePath: instancePath + "/description", schemaPath: "#/definitions/TransportErrorOutcome/properties/description/type", keyword: "type", params: { type: "string" }, message: "must be string" };
          if (vErrors === null) {
            vErrors = [err15];
          } else {
            vErrors.push(err15);
          }
          errors++;
        }
      }
    } else {
      const err16 = { instancePath, schemaPath: "#/definitions/TransportErrorOutcome/type", keyword: "type", params: { type: "object" }, message: "must be object" };
      if (vErrors === null) {
        vErrors = [err16];
      } else {
        vErrors.push(err16);
      }
      errors++;
    }
    var _valid0 = _errs17 === errors;
    if (_valid0 && valid0) {
      valid0 = false;
      passing0 = [passing0, 2];
    } else {
      if (_valid0) {
        valid0 = true;
        passing0 = 2;
      }
      const _errs24 = errors;
      if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.kind === void 0) {
          const err17 = { instancePath, schemaPath: "#/definitions/HostRejectedOutcome/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
          if (vErrors === null) {
            vErrors = [err17];
          } else {
            vErrors.push(err17);
          }
          errors++;
        }
        if (data.reason === void 0) {
          const err18 = { instancePath, schemaPath: "#/definitions/HostRejectedOutcome/required", keyword: "required", params: { missingProperty: "reason" }, message: "must have required property 'reason'" };
          if (vErrors === null) {
            vErrors = [err18];
          } else {
            vErrors.push(err18);
          }
          errors++;
        }
        if (data.kind !== void 0) {
          if ("rejected_by_host" !== data.kind) {
            const err19 = { instancePath: instancePath + "/kind", schemaPath: "#/definitions/HostRejectedOutcome/properties/kind/const", keyword: "const", params: { allowedValue: "rejected_by_host" }, message: "must be equal to constant" };
            if (vErrors === null) {
              vErrors = [err19];
            } else {
              vErrors.push(err19);
            }
            errors++;
          }
        }
        if (data.reason !== void 0) {
          if (typeof data.reason !== "string") {
            const err20 = { instancePath: instancePath + "/reason", schemaPath: "#/definitions/HostRejectedOutcome/properties/reason/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err20];
            } else {
              vErrors.push(err20);
            }
            errors++;
          }
        }
      } else {
        const err21 = { instancePath, schemaPath: "#/definitions/HostRejectedOutcome/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err21];
        } else {
          vErrors.push(err21);
        }
        errors++;
      }
      var _valid0 = _errs24 === errors;
      if (_valid0 && valid0) {
        valid0 = false;
        passing0 = [passing0, 3];
      } else {
        if (_valid0) {
          valid0 = true;
          passing0 = 3;
        }
      }
    }
  }
  if (!valid0) {
    const err22 = { instancePath, schemaPath: "#/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf" };
    if (vErrors === null) {
      vErrors = [err22];
    } else {
      vErrors.push(err22);
    }
    errors++;
  } else {
    errors = _errs0;
    if (vErrors !== null) {
      if (_errs0) {
        vErrors.length = _errs0;
      } else {
        vErrors = null;
      }
    }
  }
  validate49.errors = vErrors;
  return errors === 0;
}
var OperationResultEvent = validate51;
function validate51(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.type === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "type" }, message: "must have required property 'type'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.event_id === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "event_id" }, message: "must have required property 'event_id'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.op_id === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "op_id" }, message: "must have required property 'op_id'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.attempt_token === void 0) {
      const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "attempt_token" }, message: "must have required property 'attempt_token'" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.outcome === void 0) {
      const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "outcome" }, message: "must have required property 'outcome'" };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    if (data.type !== void 0) {
      if ("operation_result" !== data.type) {
        const err5 = { instancePath: instancePath + "/type", schemaPath: "#/properties/type/const", keyword: "const", params: { allowedValue: "operation_result" }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
    }
    if (data.event_id !== void 0) {
      let data1 = data.event_id;
      if (typeof data1 === "string") {
        if (func2(data1) > 64) {
          const err6 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/maxLength", keyword: "maxLength", params: { limit: 64 }, message: "must NOT have more than 64 characters" };
          if (vErrors === null) {
            vErrors = [err6];
          } else {
            vErrors.push(err6);
          }
          errors++;
        }
        if (func2(data1) < 1) {
          const err7 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        }
        if (!pattern2.test(data1)) {
          const err8 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_.:-]+$" }, message: 'must match pattern "^[A-Za-z0-9_.:-]+$"' };
          if (vErrors === null) {
            vErrors = [err8];
          } else {
            vErrors.push(err8);
          }
          errors++;
        }
      } else {
        const err9 = { instancePath: instancePath + "/event_id", schemaPath: "#/definitions/EventId/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err9];
        } else {
          vErrors.push(err9);
        }
        errors++;
      }
    }
    if (data.op_id !== void 0) {
      let data2 = data.op_id;
      if (typeof data2 === "string") {
        if (!pattern3.test(data2)) {
          const err10 = { instancePath: instancePath + "/op_id", schemaPath: "#/definitions/OpId/pattern", keyword: "pattern", params: { pattern: "^[0-9]{1,20}$" }, message: 'must match pattern "^[0-9]{1,20}$"' };
          if (vErrors === null) {
            vErrors = [err10];
          } else {
            vErrors.push(err10);
          }
          errors++;
        }
      } else {
        const err11 = { instancePath: instancePath + "/op_id", schemaPath: "#/definitions/OpId/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err11];
        } else {
          vErrors.push(err11);
        }
        errors++;
      }
    }
    if (data.attempt_token !== void 0) {
      let data3 = data.attempt_token;
      if (typeof data3 === "string") {
        if (!pattern4.test(data3)) {
          const err12 = { instancePath: instancePath + "/attempt_token", schemaPath: "#/definitions/AttemptToken/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]{22}$" }, message: 'must match pattern "^[A-Za-z0-9_-]{22}$"' };
          if (vErrors === null) {
            vErrors = [err12];
          } else {
            vErrors.push(err12);
          }
          errors++;
        }
      } else {
        const err13 = { instancePath: instancePath + "/attempt_token", schemaPath: "#/definitions/AttemptToken/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err13];
        } else {
          vErrors.push(err13);
        }
        errors++;
      }
    }
    if (data.outcome !== void 0) {
      if (!validate49(data.outcome, { instancePath: instancePath + "/outcome", parentData: data, parentDataProperty: "outcome", rootData })) {
        vErrors = vErrors === null ? validate49.errors : vErrors.concat(validate49.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err14 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err14];
    } else {
      vErrors.push(err14);
    }
    errors++;
  }
  validate51.errors = vErrors;
  return errors === 0;
}
var Event = validate53;
function validate53(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  const _errs0 = errors;
  let valid0 = false;
  let passing0 = null;
  const _errs1 = errors;
  if (!validate29(data, { instancePath, parentData, parentDataProperty, rootData })) {
    vErrors = vErrors === null ? validate29.errors : vErrors.concat(validate29.errors);
    errors = vErrors.length;
  }
  var _valid0 = _errs1 === errors;
  if (_valid0) {
    valid0 = true;
    passing0 = 0;
  }
  const _errs2 = errors;
  if (!validate30(data, { instancePath, parentData, parentDataProperty, rootData })) {
    vErrors = vErrors === null ? validate30.errors : vErrors.concat(validate30.errors);
    errors = vErrors.length;
  }
  var _valid0 = _errs2 === errors;
  if (_valid0 && valid0) {
    valid0 = false;
    passing0 = [passing0, 1];
  } else {
    if (_valid0) {
      valid0 = true;
      passing0 = 1;
    }
    const _errs3 = errors;
    if (!validate31(data, { instancePath, parentData, parentDataProperty, rootData })) {
      vErrors = vErrors === null ? validate31.errors : vErrors.concat(validate31.errors);
      errors = vErrors.length;
    }
    var _valid0 = _errs3 === errors;
    if (_valid0 && valid0) {
      valid0 = false;
      passing0 = [passing0, 2];
    } else {
      if (_valid0) {
        valid0 = true;
        passing0 = 2;
      }
      const _errs4 = errors;
      if (!validate32(data, { instancePath, parentData, parentDataProperty, rootData })) {
        vErrors = vErrors === null ? validate32.errors : vErrors.concat(validate32.errors);
        errors = vErrors.length;
      }
      var _valid0 = _errs4 === errors;
      if (_valid0 && valid0) {
        valid0 = false;
        passing0 = [passing0, 3];
      } else {
        if (_valid0) {
          valid0 = true;
          passing0 = 3;
        }
        const _errs5 = errors;
        if (!validate33(data, { instancePath, parentData, parentDataProperty, rootData })) {
          vErrors = vErrors === null ? validate33.errors : vErrors.concat(validate33.errors);
          errors = vErrors.length;
        }
        var _valid0 = _errs5 === errors;
        if (_valid0 && valid0) {
          valid0 = false;
          passing0 = [passing0, 4];
        } else {
          if (_valid0) {
            valid0 = true;
            passing0 = 4;
          }
          const _errs6 = errors;
          if (!validate34(data, { instancePath, parentData, parentDataProperty, rootData })) {
            vErrors = vErrors === null ? validate34.errors : vErrors.concat(validate34.errors);
            errors = vErrors.length;
          }
          var _valid0 = _errs6 === errors;
          if (_valid0 && valid0) {
            valid0 = false;
            passing0 = [passing0, 5];
          } else {
            if (_valid0) {
              valid0 = true;
              passing0 = 5;
            }
            const _errs7 = errors;
            if (!validate35(data, { instancePath, parentData, parentDataProperty, rootData })) {
              vErrors = vErrors === null ? validate35.errors : vErrors.concat(validate35.errors);
              errors = vErrors.length;
            }
            var _valid0 = _errs7 === errors;
            if (_valid0 && valid0) {
              valid0 = false;
              passing0 = [passing0, 6];
            } else {
              if (_valid0) {
                valid0 = true;
                passing0 = 6;
              }
              const _errs8 = errors;
              if (!validate36(data, { instancePath, parentData, parentDataProperty, rootData })) {
                vErrors = vErrors === null ? validate36.errors : vErrors.concat(validate36.errors);
                errors = vErrors.length;
              }
              var _valid0 = _errs8 === errors;
              if (_valid0 && valid0) {
                valid0 = false;
                passing0 = [passing0, 7];
              } else {
                if (_valid0) {
                  valid0 = true;
                  passing0 = 7;
                }
                const _errs9 = errors;
                if (!validate37(data, { instancePath, parentData, parentDataProperty, rootData })) {
                  vErrors = vErrors === null ? validate37.errors : vErrors.concat(validate37.errors);
                  errors = vErrors.length;
                }
                var _valid0 = _errs9 === errors;
                if (_valid0 && valid0) {
                  valid0 = false;
                  passing0 = [passing0, 8];
                } else {
                  if (_valid0) {
                    valid0 = true;
                    passing0 = 8;
                  }
                  const _errs10 = errors;
                  if (!validate38(data, { instancePath, parentData, parentDataProperty, rootData })) {
                    vErrors = vErrors === null ? validate38.errors : vErrors.concat(validate38.errors);
                    errors = vErrors.length;
                  }
                  var _valid0 = _errs10 === errors;
                  if (_valid0 && valid0) {
                    valid0 = false;
                    passing0 = [passing0, 9];
                  } else {
                    if (_valid0) {
                      valid0 = true;
                      passing0 = 9;
                    }
                    const _errs11 = errors;
                    if (!validate51(data, { instancePath, parentData, parentDataProperty, rootData })) {
                      vErrors = vErrors === null ? validate51.errors : vErrors.concat(validate51.errors);
                      errors = vErrors.length;
                    }
                    var _valid0 = _errs11 === errors;
                    if (_valid0 && valid0) {
                      valid0 = false;
                      passing0 = [passing0, 10];
                    } else {
                      if (_valid0) {
                        valid0 = true;
                        passing0 = 10;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  if (!valid0) {
    const err0 = { instancePath, schemaPath: "#/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf" };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  } else {
    errors = _errs0;
    if (vErrors !== null) {
      if (_errs0) {
        vErrors.length = _errs0;
      } else {
        vErrors = null;
      }
    }
  }
  validate53.errors = vErrors;
  return errors === 0;
}
var EventBatch = validate65;
function validate65(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.events === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "events" }, message: "must have required property 'events'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.events !== void 0) {
      let data0 = data.events;
      if (Array.isArray(data0)) {
        if (data0.length > 100) {
          const err1 = { instancePath: instancePath + "/events", schemaPath: "#/properties/events/maxItems", keyword: "maxItems", params: { limit: 100 }, message: "must NOT have more than 100 items" };
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        }
        if (data0.length < 1) {
          const err2 = { instancePath: instancePath + "/events", schemaPath: "#/properties/events/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" };
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        }
        const len0 = data0.length;
        for (let i0 = 0; i0 < len0; i0++) {
          if (!validate53(data0[i0], { instancePath: instancePath + "/events/" + i0, parentData: data0, parentDataProperty: i0, rootData })) {
            vErrors = vErrors === null ? validate53.errors : vErrors.concat(validate53.errors);
            errors = vErrors.length;
          }
        }
      } else {
        const err3 = { instancePath: instancePath + "/events", schemaPath: "#/properties/events/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
  } else {
    const err4 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err4];
    } else {
      vErrors.push(err4);
    }
    errors++;
  }
  validate65.errors = vErrors;
  return errors === 0;
}
var Command = validate67;
function validate67(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.op_id === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "op_id" }, message: "must have required property 'op_id'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.attempt_token === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "attempt_token" }, message: "must have required property 'attempt_token'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.deadline_seconds === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "deadline_seconds" }, message: "must have required property 'deadline_seconds'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.subject === void 0) {
      const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "subject" }, message: "must have required property 'subject'" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.method === void 0) {
      const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "method" }, message: "must have required property 'method'" };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    if (data.params === void 0) {
      const err5 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "params" }, message: "must have required property 'params'" };
      if (vErrors === null) {
        vErrors = [err5];
      } else {
        vErrors.push(err5);
      }
      errors++;
    }
    if (data.binding === void 0) {
      const err6 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "binding" }, message: "must have required property 'binding'" };
      if (vErrors === null) {
        vErrors = [err6];
      } else {
        vErrors.push(err6);
      }
      errors++;
    }
    if (data.op_id !== void 0) {
      let data0 = data.op_id;
      if (typeof data0 === "string") {
        if (!pattern3.test(data0)) {
          const err7 = { instancePath: instancePath + "/op_id", schemaPath: "#/definitions/OpId/pattern", keyword: "pattern", params: { pattern: "^[0-9]{1,20}$" }, message: 'must match pattern "^[0-9]{1,20}$"' };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        }
      } else {
        const err8 = { instancePath: instancePath + "/op_id", schemaPath: "#/definitions/OpId/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err8];
        } else {
          vErrors.push(err8);
        }
        errors++;
      }
    }
    if (data.attempt_token !== void 0) {
      let data1 = data.attempt_token;
      if (typeof data1 === "string") {
        if (!pattern4.test(data1)) {
          const err9 = { instancePath: instancePath + "/attempt_token", schemaPath: "#/definitions/AttemptToken/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]{22}$" }, message: 'must match pattern "^[A-Za-z0-9_-]{22}$"' };
          if (vErrors === null) {
            vErrors = [err9];
          } else {
            vErrors.push(err9);
          }
          errors++;
        }
      } else {
        const err10 = { instancePath: instancePath + "/attempt_token", schemaPath: "#/definitions/AttemptToken/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err10];
        } else {
          vErrors.push(err10);
        }
        errors++;
      }
    }
    if (data.deadline_seconds !== void 0) {
      let data2 = data.deadline_seconds;
      if (!(typeof data2 == "number" && (!(data2 % 1) && !isNaN(data2)) && isFinite(data2))) {
        const err11 = { instancePath: instancePath + "/deadline_seconds", schemaPath: "#/definitions/DeadlineSeconds/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
        if (vErrors === null) {
          vErrors = [err11];
        } else {
          vErrors.push(err11);
        }
        errors++;
      }
      if (typeof data2 == "number" && isFinite(data2)) {
        if (data2 > 600 || isNaN(data2)) {
          const err12 = { instancePath: instancePath + "/deadline_seconds", schemaPath: "#/definitions/DeadlineSeconds/maximum", keyword: "maximum", params: { comparison: "<=", limit: 600 }, message: "must be <= 600" };
          if (vErrors === null) {
            vErrors = [err12];
          } else {
            vErrors.push(err12);
          }
          errors++;
        }
        if (data2 < 30 || isNaN(data2)) {
          const err13 = { instancePath: instancePath + "/deadline_seconds", schemaPath: "#/definitions/DeadlineSeconds/minimum", keyword: "minimum", params: { comparison: ">=", limit: 30 }, message: "must be >= 30" };
          if (vErrors === null) {
            vErrors = [err13];
          } else {
            vErrors.push(err13);
          }
          errors++;
        }
      }
    }
    if (data.subject !== void 0) {
      let data3 = data.subject;
      if (typeof data3 === "string") {
        if (!pattern0.test(data3)) {
          const err14 = { instancePath: instancePath + "/subject", schemaPath: "#/definitions/Token/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]{43}$" }, message: 'must match pattern "^[A-Za-z0-9_-]{43}$"' };
          if (vErrors === null) {
            vErrors = [err14];
          } else {
            vErrors.push(err14);
          }
          errors++;
        }
      } else {
        const err15 = { instancePath: instancePath + "/subject", schemaPath: "#/definitions/Token/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err15];
        } else {
          vErrors.push(err15);
        }
        errors++;
      }
    }
    if (data.method !== void 0) {
      if (typeof data.method !== "string") {
        const err16 = { instancePath: instancePath + "/method", schemaPath: "#/properties/method/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err16];
        } else {
          vErrors.push(err16);
        }
        errors++;
      }
    }
    if (data.params !== void 0) {
      let data5 = data.params;
      if (data5 && typeof data5 == "object" && !Array.isArray(data5)) {
      } else {
        const err17 = { instancePath: instancePath + "/params", schemaPath: "#/properties/params/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err17];
        } else {
          vErrors.push(err17);
        }
        errors++;
      }
    }
    if (data.binding !== void 0) {
      let data6 = data.binding;
      const _errs20 = errors;
      let valid5 = false;
      const _errs21 = errors;
      if (typeof data6 === "string") {
        if (func2(data6) > 65536) {
          const err18 = { instancePath: instancePath + "/binding", schemaPath: "#/definitions/SealedBlob/maxLength", keyword: "maxLength", params: { limit: 65536 }, message: "must NOT have more than 65536 characters" };
          if (vErrors === null) {
            vErrors = [err18];
          } else {
            vErrors.push(err18);
          }
          errors++;
        }
        if (!pattern1.test(data6)) {
          const err19 = { instancePath: instancePath + "/binding", schemaPath: "#/definitions/SealedBlob/pattern", keyword: "pattern", params: { pattern: "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$" }, message: 'must match pattern "^s1\\.[A-Za-z0-9_-]{4}\\.[A-Za-z0-9_-]{16}\\.[A-Za-z0-9_-]{22,}$"' };
          if (vErrors === null) {
            vErrors = [err19];
          } else {
            vErrors.push(err19);
          }
          errors++;
        }
      } else {
        const err20 = { instancePath: instancePath + "/binding", schemaPath: "#/definitions/SealedBlob/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err20];
        } else {
          vErrors.push(err20);
        }
        errors++;
      }
      var _valid0 = _errs21 === errors;
      valid5 = valid5 || _valid0;
      if (!valid5) {
        const _errs24 = errors;
        if (data6 !== null) {
          const err21 = { instancePath: instancePath + "/binding", schemaPath: "#/properties/binding/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
          if (vErrors === null) {
            vErrors = [err21];
          } else {
            vErrors.push(err21);
          }
          errors++;
        }
        var _valid0 = _errs24 === errors;
        valid5 = valid5 || _valid0;
      }
      if (!valid5) {
        const err22 = { instancePath: instancePath + "/binding", schemaPath: "#/properties/binding/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
        if (vErrors === null) {
          vErrors = [err22];
        } else {
          vErrors.push(err22);
        }
        errors++;
      } else {
        errors = _errs20;
        if (vErrors !== null) {
          if (_errs20) {
            vErrors.length = _errs20;
          } else {
            vErrors = null;
          }
        }
      }
    }
  } else {
    const err23 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err23];
    } else {
      vErrors.push(err23);
    }
    errors++;
  }
  validate67.errors = vErrors;
  return errors === 0;
}
var PushEnvelope = validate68;
function validate68(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.kind === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.commands === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "commands" }, message: "must have required property 'commands'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.kind !== void 0) {
      if ("commands" !== data.kind) {
        const err2 = { instancePath: instancePath + "/kind", schemaPath: "#/properties/kind/const", keyword: "const", params: { allowedValue: "commands" }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.commands !== void 0) {
      let data1 = data.commands;
      if (Array.isArray(data1)) {
        if (data1.length > 50) {
          const err3 = { instancePath: instancePath + "/commands", schemaPath: "#/properties/commands/maxItems", keyword: "maxItems", params: { limit: 50 }, message: "must NOT have more than 50 items" };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        }
        if (data1.length < 1) {
          const err4 = { instancePath: instancePath + "/commands", schemaPath: "#/properties/commands/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
        const len0 = data1.length;
        for (let i0 = 0; i0 < len0; i0++) {
          if (!validate67(data1[i0], { instancePath: instancePath + "/commands/" + i0, parentData: data1, parentDataProperty: i0, rootData })) {
            vErrors = vErrors === null ? validate67.errors : vErrors.concat(validate67.errors);
            errors = vErrors.length;
          }
        }
      } else {
        const err5 = { instancePath: instancePath + "/commands", schemaPath: "#/properties/commands/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
    }
  } else {
    const err6 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err6];
    } else {
      vErrors.push(err6);
    }
    errors++;
  }
  validate68.errors = vErrors;
  return errors === 0;
}
var ChallengeRequest = validate70;
function validate70(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.kind === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.nonce === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "nonce" }, message: "must have required property 'nonce'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.kind !== void 0) {
      if ("challenge" !== data.kind) {
        const err2 = { instancePath: instancePath + "/kind", schemaPath: "#/properties/kind/const", keyword: "const", params: { allowedValue: "challenge" }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.nonce !== void 0) {
      let data1 = data.nonce;
      if (typeof data1 === "string") {
        if (func2(data1) < 1) {
          const err3 = { instancePath: instancePath + "/nonce", schemaPath: "#/properties/nonce/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        }
      } else {
        const err4 = { instancePath: instancePath + "/nonce", schemaPath: "#/properties/nonce/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
  } else {
    const err5 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err5];
    } else {
      vErrors.push(err5);
    }
    errors++;
  }
  validate70.errors = vErrors;
  return errors === 0;
}
var ChallengeResponse = validate71;
var pattern70 = new RegExp("^[0-9a-f]{64}$", "u");
function validate71(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.kind === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.response === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "response" }, message: "must have required property 'response'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.kind !== void 0) {
      if ("challenge" !== data.kind) {
        const err2 = { instancePath: instancePath + "/kind", schemaPath: "#/properties/kind/const", keyword: "const", params: { allowedValue: "challenge" }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.response !== void 0) {
      let data1 = data.response;
      if (typeof data1 === "string") {
        if (!pattern70.test(data1)) {
          const err3 = { instancePath: instancePath + "/response", schemaPath: "#/properties/response/pattern", keyword: "pattern", params: { pattern: "^[0-9a-f]{64}$" }, message: 'must match pattern "^[0-9a-f]{64}$"' };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        }
      } else {
        const err4 = { instancePath: instancePath + "/response", schemaPath: "#/properties/response/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
  } else {
    const err5 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err5];
    } else {
      vErrors.push(err5);
    }
    errors++;
  }
  validate71.errors = vErrors;
  return errors === 0;
}
var HostRequest = validate72;
function validate72(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  const _errs0 = errors;
  let valid0 = false;
  let passing0 = null;
  const _errs1 = errors;
  if (!validate68(data, { instancePath, parentData, parentDataProperty, rootData })) {
    vErrors = vErrors === null ? validate68.errors : vErrors.concat(validate68.errors);
    errors = vErrors.length;
  }
  var _valid0 = _errs1 === errors;
  if (_valid0) {
    valid0 = true;
    passing0 = 0;
  }
  const _errs2 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.kind === void 0) {
      const err0 = { instancePath, schemaPath: "#/definitions/ChallengeRequest/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.nonce === void 0) {
      const err1 = { instancePath, schemaPath: "#/definitions/ChallengeRequest/required", keyword: "required", params: { missingProperty: "nonce" }, message: "must have required property 'nonce'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.kind !== void 0) {
      if ("challenge" !== data.kind) {
        const err2 = { instancePath: instancePath + "/kind", schemaPath: "#/definitions/ChallengeRequest/properties/kind/const", keyword: "const", params: { allowedValue: "challenge" }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.nonce !== void 0) {
      let data1 = data.nonce;
      if (typeof data1 === "string") {
        if (func2(data1) < 1) {
          const err3 = { instancePath: instancePath + "/nonce", schemaPath: "#/definitions/ChallengeRequest/properties/nonce/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        }
      } else {
        const err4 = { instancePath: instancePath + "/nonce", schemaPath: "#/definitions/ChallengeRequest/properties/nonce/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
  } else {
    const err5 = { instancePath, schemaPath: "#/definitions/ChallengeRequest/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err5];
    } else {
      vErrors.push(err5);
    }
    errors++;
  }
  var _valid0 = _errs2 === errors;
  if (_valid0 && valid0) {
    valid0 = false;
    passing0 = [passing0, 1];
  } else {
    if (_valid0) {
      valid0 = true;
      passing0 = 1;
    }
  }
  if (!valid0) {
    const err6 = { instancePath, schemaPath: "#/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf" };
    if (vErrors === null) {
      vErrors = [err6];
    } else {
      vErrors.push(err6);
    }
    errors++;
  } else {
    errors = _errs0;
    if (vErrors !== null) {
      if (_errs0) {
        vErrors.length = _errs0;
      } else {
        vErrors = null;
      }
    }
  }
  validate72.errors = vErrors;
  return errors === 0;
}
var ClaimRequest = validate74;
function validate74(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.max !== void 0) {
      let data0 = data.max;
      if (!(typeof data0 == "number" && (!(data0 % 1) && !isNaN(data0)) && isFinite(data0))) {
        const err0 = { instancePath: instancePath + "/max", schemaPath: "#/properties/max/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
        if (vErrors === null) {
          vErrors = [err0];
        } else {
          vErrors.push(err0);
        }
        errors++;
      }
      if (typeof data0 == "number" && isFinite(data0)) {
        if (data0 > 50 || isNaN(data0)) {
          const err1 = { instancePath: instancePath + "/max", schemaPath: "#/properties/max/maximum", keyword: "maximum", params: { comparison: "<=", limit: 50 }, message: "must be <= 50" };
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        }
        if (data0 < 1 || isNaN(data0)) {
          const err2 = { instancePath: instancePath + "/max", schemaPath: "#/properties/max/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" };
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        }
      }
    }
  } else {
    const err3 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err3];
    } else {
      vErrors.push(err3);
    }
    errors++;
  }
  validate74.errors = vErrors;
  return errors === 0;
}
var ClaimResponse = validate75;
function validate75(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.commands === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "commands" }, message: "must have required property 'commands'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.commands !== void 0) {
      let data0 = data.commands;
      if (Array.isArray(data0)) {
        if (data0.length > 50) {
          const err1 = { instancePath: instancePath + "/commands", schemaPath: "#/properties/commands/maxItems", keyword: "maxItems", params: { limit: 50 }, message: "must NOT have more than 50 items" };
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        }
        const len0 = data0.length;
        for (let i0 = 0; i0 < len0; i0++) {
          if (!validate67(data0[i0], { instancePath: instancePath + "/commands/" + i0, parentData: data0, parentDataProperty: i0, rootData })) {
            vErrors = vErrors === null ? validate67.errors : vErrors.concat(validate67.errors);
            errors = vErrors.length;
          }
        }
      } else {
        const err2 = { instancePath: instancePath + "/commands", schemaPath: "#/properties/commands/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
  } else {
    const err3 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err3];
    } else {
      vErrors.push(err3);
    }
    errors++;
  }
  validate75.errors = vErrors;
  return errors === 0;
}
var HeartbeatRequest = validate77;
function validate77(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.op_id === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "op_id" }, message: "must have required property 'op_id'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.attempt_token === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "attempt_token" }, message: "must have required property 'attempt_token'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.op_id !== void 0) {
      let data0 = data.op_id;
      if (typeof data0 === "string") {
        if (!pattern3.test(data0)) {
          const err2 = { instancePath: instancePath + "/op_id", schemaPath: "#/definitions/OpId/pattern", keyword: "pattern", params: { pattern: "^[0-9]{1,20}$" }, message: 'must match pattern "^[0-9]{1,20}$"' };
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        }
      } else {
        const err3 = { instancePath: instancePath + "/op_id", schemaPath: "#/definitions/OpId/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    if (data.attempt_token !== void 0) {
      let data1 = data.attempt_token;
      if (typeof data1 === "string") {
        if (!pattern4.test(data1)) {
          const err4 = { instancePath: instancePath + "/attempt_token", schemaPath: "#/definitions/AttemptToken/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]{22}$" }, message: 'must match pattern "^[A-Za-z0-9_-]{22}$"' };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
      } else {
        const err5 = { instancePath: instancePath + "/attempt_token", schemaPath: "#/definitions/AttemptToken/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
    }
  } else {
    const err6 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err6];
    } else {
      vErrors.push(err6);
    }
    errors++;
  }
  validate77.errors = vErrors;
  return errors === 0;
}
var HeartbeatResponse = validate78;
function validate78(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.extended === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "extended" }, message: "must have required property 'extended'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.remaining_seconds === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "remaining_seconds" }, message: "must have required property 'remaining_seconds'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.extended !== void 0) {
      if (true !== data.extended) {
        const err2 = { instancePath: instancePath + "/extended", schemaPath: "#/properties/extended/const", keyword: "const", params: { allowedValue: true }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.remaining_seconds !== void 0) {
      let data1 = data.remaining_seconds;
      if (!(typeof data1 == "number" && (!(data1 % 1) && !isNaN(data1)) && isFinite(data1))) {
        const err3 = { instancePath: instancePath + "/remaining_seconds", schemaPath: "#/properties/remaining_seconds/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
      if (typeof data1 == "number" && isFinite(data1)) {
        if (data1 < 0 || isNaN(data1)) {
          const err4 = { instancePath: instancePath + "/remaining_seconds", schemaPath: "#/properties/remaining_seconds/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
      }
    }
  } else {
    const err5 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err5];
    } else {
      vErrors.push(err5);
    }
    errors++;
  }
  validate78.errors = vErrors;
  return errors === 0;
}
var RejectResponse = validate79;
function validate79(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.reason === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "reason" }, message: "must have required property 'reason'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.reason !== void 0) {
      if (typeof data.reason !== "string") {
        const err1 = { instancePath: instancePath + "/reason", schemaPath: "#/properties/reason/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
    }
    if (data.index !== void 0) {
      let data1 = data.index;
      if (!(typeof data1 == "number" && (!(data1 % 1) && !isNaN(data1)) && isFinite(data1))) {
        const err2 = { instancePath: instancePath + "/index", schemaPath: "#/properties/index/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
      if (typeof data1 == "number" && isFinite(data1)) {
        if (data1 < 0 || isNaN(data1)) {
          const err3 = { instancePath: instancePath + "/index", schemaPath: "#/properties/index/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        }
      }
    }
    if (data.detail !== void 0) {
      if (typeof data.detail !== "string") {
        const err4 = { instancePath: instancePath + "/detail", schemaPath: "#/properties/detail/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
    if (data.accepted_types !== void 0) {
      let data3 = data.accepted_types;
      if (Array.isArray(data3)) {
        const len0 = data3.length;
        for (let i0 = 0; i0 < len0; i0++) {
          if (typeof data3[i0] !== "string") {
            const err5 = { instancePath: instancePath + "/accepted_types/" + i0, schemaPath: "#/properties/accepted_types/items/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err5];
            } else {
              vErrors.push(err5);
            }
            errors++;
          }
        }
      } else {
        const err6 = { instancePath: instancePath + "/accepted_types", schemaPath: "#/properties/accepted_types/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
    }
    if (data.min_version !== void 0) {
      if (typeof data.min_version !== "string") {
        const err7 = { instancePath: instancePath + "/min_version", schemaPath: "#/properties/min_version/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      }
    }
  } else {
    const err8 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err8];
    } else {
      vErrors.push(err8);
    }
    errors++;
  }
  validate79.errors = vErrors;
  return errors === 0;
}
var TopicTitleRef = validate80;
var schema130 = { "type": "object", "properties": { "template": { "type": "string", "enum": ["topic_title"] }, "language": { "$ref": "#/definitions/SealedRef" }, "user": { "$ref": "#/definitions/SealedRef" } }, "required": ["template", "language", "user"], "additionalProperties": true, "title": "TopicTitleRef" };
function validate80(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.template === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "template" }, message: "must have required property 'template'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.language === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "language" }, message: "must have required property 'language'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.user === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "user" }, message: "must have required property 'user'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.template !== void 0) {
      let data0 = data.template;
      if (typeof data0 !== "string") {
        const err3 = { instancePath: instancePath + "/template", schemaPath: "#/properties/template/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
      if (!(data0 === "topic_title")) {
        const err4 = { instancePath: instancePath + "/template", schemaPath: "#/properties/template/enum", keyword: "enum", params: { allowedValues: schema130.properties.template.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
    if (data.language !== void 0) {
      if (!validate21(data.language, { instancePath: instancePath + "/language", parentData: data, parentDataProperty: "language", rootData })) {
        vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
    }
    if (data.user !== void 0) {
      if (!validate21(data.user, { instancePath: instancePath + "/user", parentData: data, parentDataProperty: "user", rootData })) {
        vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err5 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err5];
    } else {
      vErrors.push(err5);
    }
    errors++;
  }
  validate80.errors = vErrors;
  return errors === 0;
}
var NotificationsTitleRef = validate83;
function validate83(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.template === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "template" }, message: "must have required property 'template'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.language === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "language" }, message: "must have required property 'language'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.template !== void 0) {
      if ("notifications_topic_title" !== data.template) {
        const err2 = { instancePath: instancePath + "/template", schemaPath: "#/properties/template/const", keyword: "const", params: { allowedValue: "notifications_topic_title" }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.language !== void 0) {
      if (!validate21(data.language, { instancePath: instancePath + "/language", parentData: data, parentDataProperty: "language", rootData })) {
        vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err3 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err3];
    } else {
      vErrors.push(err3);
    }
    errors++;
  }
  validate83.errors = vErrors;
  return errors === 0;
}
var TopicNameRef = validate85;
function validate85(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  const _errs0 = errors;
  let valid0 = false;
  let passing0 = null;
  const _errs1 = errors;
  if (!validate80(data, { instancePath, parentData, parentDataProperty, rootData })) {
    vErrors = vErrors === null ? validate80.errors : vErrors.concat(validate80.errors);
    errors = vErrors.length;
  }
  var _valid0 = _errs1 === errors;
  if (_valid0) {
    valid0 = true;
    passing0 = 0;
  }
  const _errs2 = errors;
  if (!validate83(data, { instancePath, parentData, parentDataProperty, rootData })) {
    vErrors = vErrors === null ? validate83.errors : vErrors.concat(validate83.errors);
    errors = vErrors.length;
  }
  var _valid0 = _errs2 === errors;
  if (_valid0 && valid0) {
    valid0 = false;
    passing0 = [passing0, 1];
  } else {
    if (_valid0) {
      valid0 = true;
      passing0 = 1;
    }
  }
  if (!valid0) {
    const err0 = { instancePath, schemaPath: "#/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf" };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  } else {
    errors = _errs0;
    if (vErrors !== null) {
      if (_errs0) {
        vErrors.length = _errs0;
      } else {
        vErrors = null;
      }
    }
  }
  validate85.errors = vErrors;
  return errors === 0;
}
var TextTemplateRef = validate88;
var schema133 = { "oneOf": [{ "type": "object", "properties": { "template": { "type": "string", "enum": ["topic_header", "new_user_notice"] }, "language": { "$ref": "#/definitions/SealedRef" }, "user": { "$ref": "#/definitions/SealedRef" } }, "required": ["template", "language", "user"], "additionalProperties": true }, { "type": "object", "properties": { "template": { "type": "string", "enum": ["welcome_hint", "user_edited", "edited_by_support", "replaced_by_support"] }, "language": { "$ref": "#/definitions/SealedRef" } }, "required": ["template", "language"], "additionalProperties": true }], "title": "TextTemplateRef" };
function validate88(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  const _errs0 = errors;
  let valid0 = false;
  let passing0 = null;
  const _errs1 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.template === void 0) {
      const err0 = { instancePath, schemaPath: "#/oneOf/0/required", keyword: "required", params: { missingProperty: "template" }, message: "must have required property 'template'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.language === void 0) {
      const err1 = { instancePath, schemaPath: "#/oneOf/0/required", keyword: "required", params: { missingProperty: "language" }, message: "must have required property 'language'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.user === void 0) {
      const err2 = { instancePath, schemaPath: "#/oneOf/0/required", keyword: "required", params: { missingProperty: "user" }, message: "must have required property 'user'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.template !== void 0) {
      let data0 = data.template;
      if (typeof data0 !== "string") {
        const err3 = { instancePath: instancePath + "/template", schemaPath: "#/oneOf/0/properties/template/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
      if (!(data0 === "topic_header" || data0 === "new_user_notice")) {
        const err4 = { instancePath: instancePath + "/template", schemaPath: "#/oneOf/0/properties/template/enum", keyword: "enum", params: { allowedValues: schema133.oneOf[0].properties.template.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
    if (data.language !== void 0) {
      if (!validate21(data.language, { instancePath: instancePath + "/language", parentData: data, parentDataProperty: "language", rootData })) {
        vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
    }
    if (data.user !== void 0) {
      if (!validate21(data.user, { instancePath: instancePath + "/user", parentData: data, parentDataProperty: "user", rootData })) {
        vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err5 = { instancePath, schemaPath: "#/oneOf/0/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err5];
    } else {
      vErrors.push(err5);
    }
    errors++;
  }
  var _valid0 = _errs1 === errors;
  if (_valid0) {
    valid0 = true;
    passing0 = 0;
  }
  const _errs8 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.template === void 0) {
      const err6 = { instancePath, schemaPath: "#/oneOf/1/required", keyword: "required", params: { missingProperty: "template" }, message: "must have required property 'template'" };
      if (vErrors === null) {
        vErrors = [err6];
      } else {
        vErrors.push(err6);
      }
      errors++;
    }
    if (data.language === void 0) {
      const err7 = { instancePath, schemaPath: "#/oneOf/1/required", keyword: "required", params: { missingProperty: "language" }, message: "must have required property 'language'" };
      if (vErrors === null) {
        vErrors = [err7];
      } else {
        vErrors.push(err7);
      }
      errors++;
    }
    if (data.template !== void 0) {
      let data3 = data.template;
      if (typeof data3 !== "string") {
        const err8 = { instancePath: instancePath + "/template", schemaPath: "#/oneOf/1/properties/template/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err8];
        } else {
          vErrors.push(err8);
        }
        errors++;
      }
      if (!(data3 === "welcome_hint" || data3 === "user_edited" || data3 === "edited_by_support" || data3 === "replaced_by_support")) {
        const err9 = { instancePath: instancePath + "/template", schemaPath: "#/oneOf/1/properties/template/enum", keyword: "enum", params: { allowedValues: schema133.oneOf[1].properties.template.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err9];
        } else {
          vErrors.push(err9);
        }
        errors++;
      }
    }
    if (data.language !== void 0) {
      if (!validate21(data.language, { instancePath: instancePath + "/language", parentData: data, parentDataProperty: "language", rootData })) {
        vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err10 = { instancePath, schemaPath: "#/oneOf/1/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err10];
    } else {
      vErrors.push(err10);
    }
    errors++;
  }
  var _valid0 = _errs8 === errors;
  if (_valid0 && valid0) {
    valid0 = false;
    passing0 = [passing0, 1];
  } else {
    if (_valid0) {
      valid0 = true;
      passing0 = 1;
    }
  }
  if (!valid0) {
    const err11 = { instancePath, schemaPath: "#/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf" };
    if (vErrors === null) {
      vErrors = [err11];
    } else {
      vErrors.push(err11);
    }
    errors++;
  } else {
    errors = _errs0;
    if (vErrors !== null) {
      if (_errs0) {
        vErrors.length = _errs0;
      } else {
        vErrors = null;
      }
    }
  }
  validate88.errors = vErrors;
  return errors === 0;
}
var TextRef = validate92;
function validate92(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  const _errs0 = errors;
  let valid0 = false;
  const _errs1 = errors;
  if (!validate21(data, { instancePath, parentData, parentDataProperty, rootData })) {
    vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
    errors = vErrors.length;
  }
  var _valid0 = _errs1 === errors;
  valid0 = valid0 || _valid0;
  if (!valid0) {
    const _errs2 = errors;
    if (!validate88(data, { instancePath, parentData, parentDataProperty, rootData })) {
      vErrors = vErrors === null ? validate88.errors : vErrors.concat(validate88.errors);
      errors = vErrors.length;
    }
    var _valid0 = _errs2 === errors;
    valid0 = valid0 || _valid0;
  }
  if (!valid0) {
    const err0 = { instancePath, schemaPath: "#/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  } else {
    errors = _errs0;
    if (vErrors !== null) {
      if (_errs0) {
        vErrors.length = _errs0;
      } else {
        vErrors = null;
      }
    }
  }
  validate92.errors = vErrors;
  return errors === 0;
}
var CreateForumTopicParams = validate95;
function validate95(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.chat_id === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "chat_id" }, message: "must have required property 'chat_id'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.name === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "name" }, message: "must have required property 'name'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.chat_id !== void 0) {
      if (!validate21(data.chat_id, { instancePath: instancePath + "/chat_id", parentData: data, parentDataProperty: "chat_id", rootData })) {
        vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
    }
    if (data.name !== void 0) {
      if (!validate85(data.name, { instancePath: instancePath + "/name", parentData: data, parentDataProperty: "name", rootData })) {
        vErrors = vErrors === null ? validate85.errors : vErrors.concat(validate85.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err2 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err2];
    } else {
      vErrors.push(err2);
    }
    errors++;
  }
  validate95.errors = vErrors;
  return errors === 0;
}
var EditForumTopicParams = validate98;
function validate98(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.chat_id === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "chat_id" }, message: "must have required property 'chat_id'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.message_thread_id === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "message_thread_id" }, message: "must have required property 'message_thread_id'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.name === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "name" }, message: "must have required property 'name'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.chat_id !== void 0) {
      if (!validate21(data.chat_id, { instancePath: instancePath + "/chat_id", parentData: data, parentDataProperty: "chat_id", rootData })) {
        vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
    }
    if (data.message_thread_id !== void 0) {
      if (!validate21(data.message_thread_id, { instancePath: instancePath + "/message_thread_id", parentData: data, parentDataProperty: "message_thread_id", rootData })) {
        vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
    }
    if (data.name !== void 0) {
      if (!validate80(data.name, { instancePath: instancePath + "/name", parentData: data, parentDataProperty: "name", rootData })) {
        vErrors = vErrors === null ? validate80.errors : vErrors.concat(validate80.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err3 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err3];
    } else {
      vErrors.push(err3);
    }
    errors++;
  }
  validate98.errors = vErrors;
  return errors === 0;
}
var UnpinAllForumTopicMessagesParams = validate102;
function validate102(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.chat_id === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "chat_id" }, message: "must have required property 'chat_id'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.message_thread_id === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "message_thread_id" }, message: "must have required property 'message_thread_id'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.chat_id !== void 0) {
      if (!validate21(data.chat_id, { instancePath: instancePath + "/chat_id", parentData: data, parentDataProperty: "chat_id", rootData })) {
        vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
    }
    if (data.message_thread_id !== void 0) {
      if (!validate21(data.message_thread_id, { instancePath: instancePath + "/message_thread_id", parentData: data, parentDataProperty: "message_thread_id", rootData })) {
        vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err2 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err2];
    } else {
      vErrors.push(err2);
    }
    errors++;
  }
  validate102.errors = vErrors;
  return errors === 0;
}
var SendMessageParams = validate105;
function validate105(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.chat_id === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "chat_id" }, message: "must have required property 'chat_id'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.text === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "text" }, message: "must have required property 'text'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.chat_id !== void 0) {
      if (!validate21(data.chat_id, { instancePath: instancePath + "/chat_id", parentData: data, parentDataProperty: "chat_id", rootData })) {
        vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
    }
    if (data.message_thread_id !== void 0) {
      let data1 = data.message_thread_id;
      const _errs4 = errors;
      let valid1 = false;
      const _errs5 = errors;
      if (!validate21(data1, { instancePath: instancePath + "/message_thread_id", parentData: data, parentDataProperty: "message_thread_id", rootData })) {
        vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
      var _valid0 = _errs5 === errors;
      valid1 = valid1 || _valid0;
      if (!valid1) {
        const _errs6 = errors;
        if (data1 !== null) {
          const err2 = { instancePath: instancePath + "/message_thread_id", schemaPath: "#/properties/message_thread_id/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        }
        var _valid0 = _errs6 === errors;
        valid1 = valid1 || _valid0;
      }
      if (!valid1) {
        const err3 = { instancePath: instancePath + "/message_thread_id", schemaPath: "#/properties/message_thread_id/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      } else {
        errors = _errs4;
        if (vErrors !== null) {
          if (_errs4) {
            vErrors.length = _errs4;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.text !== void 0) {
      if (!validate92(data.text, { instancePath: instancePath + "/text", parentData: data, parentDataProperty: "text", rootData })) {
        vErrors = vErrors === null ? validate92.errors : vErrors.concat(validate92.errors);
        errors = vErrors.length;
      }
    }
    if (data.reply_to_message_id !== void 0) {
      let data3 = data.reply_to_message_id;
      const _errs10 = errors;
      let valid2 = false;
      const _errs11 = errors;
      if (!validate21(data3, { instancePath: instancePath + "/reply_to_message_id", parentData: data, parentDataProperty: "reply_to_message_id", rootData })) {
        vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
      var _valid1 = _errs11 === errors;
      valid2 = valid2 || _valid1;
      if (!valid2) {
        const _errs12 = errors;
        if (data3 !== null) {
          const err4 = { instancePath: instancePath + "/reply_to_message_id", schemaPath: "#/properties/reply_to_message_id/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
        var _valid1 = _errs12 === errors;
        valid2 = valid2 || _valid1;
      }
      if (!valid2) {
        const err5 = { instancePath: instancePath + "/reply_to_message_id", schemaPath: "#/properties/reply_to_message_id/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      } else {
        errors = _errs10;
        if (vErrors !== null) {
          if (_errs10) {
            vErrors.length = _errs10;
          } else {
            vErrors = null;
          }
        }
      }
    }
  } else {
    const err6 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err6];
    } else {
      vErrors.push(err6);
    }
    errors++;
  }
  validate105.errors = vErrors;
  return errors === 0;
}
var CopyMessageParams = validate110;
function validate110(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.chat_id === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "chat_id" }, message: "must have required property 'chat_id'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.from_chat_id === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "from_chat_id" }, message: "must have required property 'from_chat_id'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.message_id === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "message_id" }, message: "must have required property 'message_id'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.chat_id !== void 0) {
      if (!validate21(data.chat_id, { instancePath: instancePath + "/chat_id", parentData: data, parentDataProperty: "chat_id", rootData })) {
        vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
    }
    if (data.message_thread_id !== void 0) {
      let data1 = data.message_thread_id;
      const _errs4 = errors;
      let valid1 = false;
      const _errs5 = errors;
      if (!validate21(data1, { instancePath: instancePath + "/message_thread_id", parentData: data, parentDataProperty: "message_thread_id", rootData })) {
        vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
      var _valid0 = _errs5 === errors;
      valid1 = valid1 || _valid0;
      if (!valid1) {
        const _errs6 = errors;
        if (data1 !== null) {
          const err3 = { instancePath: instancePath + "/message_thread_id", schemaPath: "#/properties/message_thread_id/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        }
        var _valid0 = _errs6 === errors;
        valid1 = valid1 || _valid0;
      }
      if (!valid1) {
        const err4 = { instancePath: instancePath + "/message_thread_id", schemaPath: "#/properties/message_thread_id/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      } else {
        errors = _errs4;
        if (vErrors !== null) {
          if (_errs4) {
            vErrors.length = _errs4;
          } else {
            vErrors = null;
          }
        }
      }
    }
    if (data.from_chat_id !== void 0) {
      if (!validate21(data.from_chat_id, { instancePath: instancePath + "/from_chat_id", parentData: data, parentDataProperty: "from_chat_id", rootData })) {
        vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
    }
    if (data.message_id !== void 0) {
      if (!validate21(data.message_id, { instancePath: instancePath + "/message_id", parentData: data, parentDataProperty: "message_id", rootData })) {
        vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
    }
    if (data.reply_to_message_id !== void 0) {
      let data4 = data.reply_to_message_id;
      const _errs11 = errors;
      let valid2 = false;
      const _errs12 = errors;
      if (!validate21(data4, { instancePath: instancePath + "/reply_to_message_id", parentData: data, parentDataProperty: "reply_to_message_id", rootData })) {
        vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
      var _valid1 = _errs12 === errors;
      valid2 = valid2 || _valid1;
      if (!valid2) {
        const _errs13 = errors;
        if (data4 !== null) {
          const err5 = { instancePath: instancePath + "/reply_to_message_id", schemaPath: "#/properties/reply_to_message_id/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
        var _valid1 = _errs13 === errors;
        valid2 = valid2 || _valid1;
      }
      if (!valid2) {
        const err6 = { instancePath: instancePath + "/reply_to_message_id", schemaPath: "#/properties/reply_to_message_id/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      } else {
        errors = _errs11;
        if (vErrors !== null) {
          if (_errs11) {
            vErrors.length = _errs11;
          } else {
            vErrors = null;
          }
        }
      }
    }
  } else {
    const err7 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err7];
    } else {
      vErrors.push(err7);
    }
    errors++;
  }
  validate110.errors = vErrors;
  return errors === 0;
}
var EditMessageTextParams = validate116;
function validate116(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.chat_id === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "chat_id" }, message: "must have required property 'chat_id'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.message_id === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "message_id" }, message: "must have required property 'message_id'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.content === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "content" }, message: "must have required property 'content'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.chat_id !== void 0) {
      if (!validate21(data.chat_id, { instancePath: instancePath + "/chat_id", parentData: data, parentDataProperty: "chat_id", rootData })) {
        vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
    }
    if (data.message_id !== void 0) {
      if (!validate21(data.message_id, { instancePath: instancePath + "/message_id", parentData: data, parentDataProperty: "message_id", rootData })) {
        vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
    }
    if (data.source_message_id !== void 0) {
      if (!validate21(data.source_message_id, { instancePath: instancePath + "/source_message_id", parentData: data, parentDataProperty: "source_message_id", rootData })) {
        vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
    }
    if (data.content !== void 0) {
      if (!validate21(data.content, { instancePath: instancePath + "/content", parentData: data, parentDataProperty: "content", rootData })) {
        vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err3 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err3];
    } else {
      vErrors.push(err3);
    }
    errors++;
  }
  validate116.errors = vErrors;
  return errors === 0;
}
var EditMessageCaptionParams = validate121;
function validate121(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.chat_id === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "chat_id" }, message: "must have required property 'chat_id'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.message_id === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "message_id" }, message: "must have required property 'message_id'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.content === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "content" }, message: "must have required property 'content'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.chat_id !== void 0) {
      if (!validate21(data.chat_id, { instancePath: instancePath + "/chat_id", parentData: data, parentDataProperty: "chat_id", rootData })) {
        vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
    }
    if (data.message_id !== void 0) {
      if (!validate21(data.message_id, { instancePath: instancePath + "/message_id", parentData: data, parentDataProperty: "message_id", rootData })) {
        vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
    }
    if (data.source_message_id !== void 0) {
      if (!validate21(data.source_message_id, { instancePath: instancePath + "/source_message_id", parentData: data, parentDataProperty: "source_message_id", rootData })) {
        vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
    }
    if (data.content !== void 0) {
      if (!validate21(data.content, { instancePath: instancePath + "/content", parentData: data, parentDataProperty: "content", rootData })) {
        vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err3 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err3];
    } else {
      vErrors.push(err3);
    }
    errors++;
  }
  validate121.errors = vErrors;
  return errors === 0;
}
var DeleteMessageParams = validate126;
function validate126(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.chat_id === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "chat_id" }, message: "must have required property 'chat_id'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.message_id === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "message_id" }, message: "must have required property 'message_id'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.chat_id !== void 0) {
      if (!validate21(data.chat_id, { instancePath: instancePath + "/chat_id", parentData: data, parentDataProperty: "chat_id", rootData })) {
        vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
    }
    if (data.message_id !== void 0) {
      if (!validate21(data.message_id, { instancePath: instancePath + "/message_id", parentData: data, parentDataProperty: "message_id", rootData })) {
        vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err2 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err2];
    } else {
      vErrors.push(err2);
    }
    errors++;
  }
  validate126.errors = vErrors;
  return errors === 0;
}
var SetMessageReactionParams = validate129;
function validate129(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.chat_id === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "chat_id" }, message: "must have required property 'chat_id'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.message_id === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "message_id" }, message: "must have required property 'message_id'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.reaction === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "reaction" }, message: "must have required property 'reaction'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.chat_id !== void 0) {
      if (!validate21(data.chat_id, { instancePath: instancePath + "/chat_id", parentData: data, parentDataProperty: "chat_id", rootData })) {
        vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
    }
    if (data.message_id !== void 0) {
      if (!validate21(data.message_id, { instancePath: instancePath + "/message_id", parentData: data, parentDataProperty: "message_id", rootData })) {
        vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
    }
    if (data.source_message_id !== void 0) {
      if (!validate21(data.source_message_id, { instancePath: instancePath + "/source_message_id", parentData: data, parentDataProperty: "source_message_id", rootData })) {
        vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
    }
    if (data.reaction !== void 0) {
      let data3 = data.reaction;
      const _errs6 = errors;
      let valid1 = false;
      const _errs7 = errors;
      if (!validate21(data3, { instancePath: instancePath + "/reaction", parentData: data, parentDataProperty: "reaction", rootData })) {
        vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
      var _valid0 = _errs7 === errors;
      valid1 = valid1 || _valid0;
      if (!valid1) {
        const _errs8 = errors;
        if ("\u{1F440}" !== data3) {
          const err3 = { instancePath: instancePath + "/reaction", schemaPath: "#/properties/reaction/anyOf/1/const", keyword: "const", params: { allowedValue: "\u{1F440}" }, message: "must be equal to constant" };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        }
        var _valid0 = _errs8 === errors;
        valid1 = valid1 || _valid0;
      }
      if (!valid1) {
        const err4 = { instancePath: instancePath + "/reaction", schemaPath: "#/properties/reaction/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      } else {
        errors = _errs6;
        if (vErrors !== null) {
          if (_errs6) {
            vErrors.length = _errs6;
          } else {
            vErrors = null;
          }
        }
      }
    }
  } else {
    const err5 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err5];
    } else {
      vErrors.push(err5);
    }
    errors++;
  }
  validate129.errors = vErrors;
  return errors === 0;
}
var PinChatMessageParams = validate134;
function validate134(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.chat_id === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "chat_id" }, message: "must have required property 'chat_id'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.message_id === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "message_id" }, message: "must have required property 'message_id'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.chat_id !== void 0) {
      if (!validate21(data.chat_id, { instancePath: instancePath + "/chat_id", parentData: data, parentDataProperty: "chat_id", rootData })) {
        vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
    }
    if (data.message_id !== void 0) {
      if (!validate21(data.message_id, { instancePath: instancePath + "/message_id", parentData: data, parentDataProperty: "message_id", rootData })) {
        vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
        errors = vErrors.length;
      }
    }
    if (data.disable_notification !== void 0) {
      if (typeof data.disable_notification !== "boolean") {
        const err2 = { instancePath: instancePath + "/disable_notification", schemaPath: "#/properties/disable_notification/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
  } else {
    const err3 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err3];
    } else {
      vErrors.push(err3);
    }
    errors++;
  }
  validate134.errors = vErrors;
  return errors === 0;
}
var PrivateChatPayload = validate137;
function validate137(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.chat_id === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "chat_id" }, message: "must have required property 'chat_id'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.chat_id !== void 0) {
      let data0 = data.chat_id;
      if (!(typeof data0 == "number" && (!(data0 % 1) && !isNaN(data0)) && isFinite(data0))) {
        const err1 = { instancePath: instancePath + "/chat_id", schemaPath: "#/properties/chat_id/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
      if (typeof data0 == "number" && isFinite(data0)) {
        if (data0 > 9007199254740991 || isNaN(data0)) {
          const err2 = { instancePath: instancePath + "/chat_id", schemaPath: "#/properties/chat_id/maximum", keyword: "maximum", params: { comparison: "<=", limit: 9007199254740991 }, message: "must be <= 9007199254740991" };
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        }
        if (data0 < 1 || isNaN(data0)) {
          const err3 = { instancePath: instancePath + "/chat_id", schemaPath: "#/properties/chat_id/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        }
      }
    }
  } else {
    const err4 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err4];
    } else {
      vErrors.push(err4);
    }
    errors++;
  }
  validate137.errors = vErrors;
  return errors === 0;
}
var GroupChatPayload = validate138;
function validate138(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.chat_id === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "chat_id" }, message: "must have required property 'chat_id'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.chat_id !== void 0) {
      let data0 = data.chat_id;
      if (!(typeof data0 == "number" && (!(data0 % 1) && !isNaN(data0)) && isFinite(data0))) {
        const err1 = { instancePath: instancePath + "/chat_id", schemaPath: "#/properties/chat_id/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
      if (typeof data0 == "number" && isFinite(data0)) {
        if (data0 > 9007199254740991 || isNaN(data0)) {
          const err2 = { instancePath: instancePath + "/chat_id", schemaPath: "#/properties/chat_id/maximum", keyword: "maximum", params: { comparison: "<=", limit: 9007199254740991 }, message: "must be <= 9007199254740991" };
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        }
        if (data0 < -9007199254740991 || isNaN(data0)) {
          const err3 = { instancePath: instancePath + "/chat_id", schemaPath: "#/properties/chat_id/minimum", keyword: "minimum", params: { comparison: ">=", limit: -9007199254740991 }, message: "must be >= -9007199254740991" };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        }
      }
    }
  } else {
    const err4 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err4];
    } else {
      vErrors.push(err4);
    }
    errors++;
  }
  validate138.errors = vErrors;
  return errors === 0;
}
var MessageIdPayload = validate139;
function validate139(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.message_id === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "message_id" }, message: "must have required property 'message_id'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.chat_id === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "chat_id" }, message: "must have required property 'chat_id'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.message_id !== void 0) {
      let data0 = data.message_id;
      if (!(typeof data0 == "number" && (!(data0 % 1) && !isNaN(data0)) && isFinite(data0))) {
        const err2 = { instancePath: instancePath + "/message_id", schemaPath: "#/properties/message_id/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.chat_id !== void 0) {
      let data1 = data.chat_id;
      if (!(typeof data1 == "number" && (!(data1 % 1) && !isNaN(data1)) && isFinite(data1))) {
        const err3 = { instancePath: instancePath + "/chat_id", schemaPath: "#/properties/chat_id/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
      if (typeof data1 == "number" && isFinite(data1)) {
        if (data1 > 9007199254740991 || isNaN(data1)) {
          const err4 = { instancePath: instancePath + "/chat_id", schemaPath: "#/properties/chat_id/maximum", keyword: "maximum", params: { comparison: "<=", limit: 9007199254740991 }, message: "must be <= 9007199254740991" };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
        if (data1 < -9007199254740991 || isNaN(data1)) {
          const err5 = { instancePath: instancePath + "/chat_id", schemaPath: "#/properties/chat_id/minimum", keyword: "minimum", params: { comparison: ">=", limit: -9007199254740991 }, message: "must be >= -9007199254740991" };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
      }
    }
  } else {
    const err6 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err6];
    } else {
      vErrors.push(err6);
    }
    errors++;
  }
  validate139.errors = vErrors;
  return errors === 0;
}
var ThreadIdPayload = validate140;
function validate140(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.thread_id === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "thread_id" }, message: "must have required property 'thread_id'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.thread_id !== void 0) {
      let data0 = data.thread_id;
      if (!(typeof data0 == "number" && (!(data0 % 1) && !isNaN(data0)) && isFinite(data0))) {
        const err1 = { instancePath: instancePath + "/thread_id", schemaPath: "#/properties/thread_id/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
    }
  } else {
    const err2 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err2];
    } else {
      vErrors.push(err2);
    }
    errors++;
  }
  validate140.errors = vErrors;
  return errors === 0;
}
var LanguagePayload = validate141;
function validate141(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.language_code === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "language_code" }, message: "must have required property 'language_code'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.language_code !== void 0) {
      let data0 = data.language_code;
      const _errs3 = errors;
      let valid1 = false;
      const _errs4 = errors;
      if (typeof data0 !== "string") {
        const err1 = { instancePath: instancePath + "/language_code", schemaPath: "#/properties/language_code/anyOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
      var _valid0 = _errs4 === errors;
      valid1 = valid1 || _valid0;
      if (!valid1) {
        const _errs6 = errors;
        if (data0 !== null) {
          const err2 = { instancePath: instancePath + "/language_code", schemaPath: "#/properties/language_code/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        }
        var _valid0 = _errs6 === errors;
        valid1 = valid1 || _valid0;
      }
      if (!valid1) {
        const err3 = { instancePath: instancePath + "/language_code", schemaPath: "#/properties/language_code/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      } else {
        errors = _errs3;
        if (vErrors !== null) {
          if (_errs3) {
            vErrors.length = _errs3;
          } else {
            vErrors = null;
          }
        }
      }
    }
  } else {
    const err4 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err4];
    } else {
      vErrors.push(err4);
    }
    errors++;
  }
  validate141.errors = vErrors;
  return errors === 0;
}
var TopicBinding = validate142;
function validate142(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.kind === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.thread === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "thread" }, message: "must have required property 'thread'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.user === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "user" }, message: "must have required property 'user'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.kind !== void 0) {
      if ("topic" !== data.kind) {
        const err3 = { instancePath: instancePath + "/kind", schemaPath: "#/properties/kind/const", keyword: "const", params: { allowedValue: "topic" }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    if (data.thread !== void 0) {
      let data1 = data.thread;
      if (typeof data1 === "string") {
        if (!pattern0.test(data1)) {
          const err4 = { instancePath: instancePath + "/thread", schemaPath: "#/definitions/Token/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]{43}$" }, message: 'must match pattern "^[A-Za-z0-9_-]{43}$"' };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
      } else {
        const err5 = { instancePath: instancePath + "/thread", schemaPath: "#/definitions/Token/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
    }
    if (data.user !== void 0) {
      let data2 = data.user;
      if (typeof data2 === "string") {
        if (!pattern0.test(data2)) {
          const err6 = { instancePath: instancePath + "/user", schemaPath: "#/definitions/Token/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]{43}$" }, message: 'must match pattern "^[A-Za-z0-9_-]{43}$"' };
          if (vErrors === null) {
            vErrors = [err6];
          } else {
            vErrors.push(err6);
          }
          errors++;
        }
      } else {
        const err7 = { instancePath: instancePath + "/user", schemaPath: "#/definitions/Token/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      }
    }
  } else {
    const err8 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err8];
    } else {
      vErrors.push(err8);
    }
    errors++;
  }
  validate142.errors = vErrors;
  return errors === 0;
}
var NoticeBinding = validate143;
function validate143(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.kind === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.notice === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "notice" }, message: "must have required property 'notice'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.user === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "user" }, message: "must have required property 'user'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.kind !== void 0) {
      if ("notice" !== data.kind) {
        const err3 = { instancePath: instancePath + "/kind", schemaPath: "#/properties/kind/const", keyword: "const", params: { allowedValue: "notice" }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    if (data.notice !== void 0) {
      let data1 = data.notice;
      if (typeof data1 === "string") {
        if (!pattern0.test(data1)) {
          const err4 = { instancePath: instancePath + "/notice", schemaPath: "#/definitions/Token/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]{43}$" }, message: 'must match pattern "^[A-Za-z0-9_-]{43}$"' };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
      } else {
        const err5 = { instancePath: instancePath + "/notice", schemaPath: "#/definitions/Token/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
    }
    if (data.user !== void 0) {
      let data2 = data.user;
      if (typeof data2 === "string") {
        if (!pattern0.test(data2)) {
          const err6 = { instancePath: instancePath + "/user", schemaPath: "#/definitions/Token/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]{43}$" }, message: 'must match pattern "^[A-Za-z0-9_-]{43}$"' };
          if (vErrors === null) {
            vErrors = [err6];
          } else {
            vErrors.push(err6);
          }
          errors++;
        }
      } else {
        const err7 = { instancePath: instancePath + "/user", schemaPath: "#/definitions/Token/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      }
    }
  } else {
    const err8 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err8];
    } else {
      vErrors.push(err8);
    }
    errors++;
  }
  validate143.errors = vErrors;
  return errors === 0;
}
var Binding = validate144;
function validate144(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  const _errs0 = errors;
  let valid0 = false;
  let passing0 = null;
  const _errs1 = errors;
  if (!validate142(data, { instancePath, parentData, parentDataProperty, rootData })) {
    vErrors = vErrors === null ? validate142.errors : vErrors.concat(validate142.errors);
    errors = vErrors.length;
  }
  var _valid0 = _errs1 === errors;
  if (_valid0) {
    valid0 = true;
    passing0 = 0;
  }
  const _errs2 = errors;
  if (!validate143(data, { instancePath, parentData, parentDataProperty, rootData })) {
    vErrors = vErrors === null ? validate143.errors : vErrors.concat(validate143.errors);
    errors = vErrors.length;
  }
  var _valid0 = _errs2 === errors;
  if (_valid0 && valid0) {
    valid0 = false;
    passing0 = [passing0, 1];
  } else {
    if (_valid0) {
      valid0 = true;
      passing0 = 1;
    }
  }
  if (!valid0) {
    const err0 = { instancePath, schemaPath: "#/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf" };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  } else {
    errors = _errs0;
    if (vErrors !== null) {
      if (_errs0) {
        vErrors.length = _errs0;
      } else {
        vErrors = null;
      }
    }
  }
  validate144.errors = vErrors;
  return errors === 0;
}
var TextEditPayload = validate147;
function validate147(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.field === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "field" }, message: "must have required property 'field'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.text === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "text" }, message: "must have required property 'text'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.field !== void 0) {
      if ("text" !== data.field) {
        const err2 = { instancePath: instancePath + "/field", schemaPath: "#/properties/field/const", keyword: "const", params: { allowedValue: "text" }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.text !== void 0) {
      if (typeof data.text !== "string") {
        const err3 = { instancePath: instancePath + "/text", schemaPath: "#/properties/text/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    if (data.entities !== void 0) {
      let data2 = data.entities;
      if (Array.isArray(data2)) {
        const len0 = data2.length;
        for (let i0 = 0; i0 < len0; i0++) {
          let data3 = data2[i0];
          if (data3 && typeof data3 == "object" && !Array.isArray(data3)) {
          } else {
            const err4 = { instancePath: instancePath + "/entities/" + i0, schemaPath: "#/properties/entities/items/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err4];
            } else {
              vErrors.push(err4);
            }
            errors++;
          }
        }
      } else {
        const err5 = { instancePath: instancePath + "/entities", schemaPath: "#/properties/entities/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
    }
    if (data.link_preview_options !== void 0) {
      let data4 = data.link_preview_options;
      if (data4 && typeof data4 == "object" && !Array.isArray(data4)) {
      } else {
        const err6 = { instancePath: instancePath + "/link_preview_options", schemaPath: "#/properties/link_preview_options/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
    }
  } else {
    const err7 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err7];
    } else {
      vErrors.push(err7);
    }
    errors++;
  }
  validate147.errors = vErrors;
  return errors === 0;
}
var CaptionEditPayload = validate148;
function validate148(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.field === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "field" }, message: "must have required property 'field'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.caption === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "caption" }, message: "must have required property 'caption'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.field !== void 0) {
      if ("caption" !== data.field) {
        const err2 = { instancePath: instancePath + "/field", schemaPath: "#/properties/field/const", keyword: "const", params: { allowedValue: "caption" }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.caption !== void 0) {
      if (typeof data.caption !== "string") {
        const err3 = { instancePath: instancePath + "/caption", schemaPath: "#/properties/caption/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    if (data.caption_entities !== void 0) {
      let data2 = data.caption_entities;
      if (Array.isArray(data2)) {
        const len0 = data2.length;
        for (let i0 = 0; i0 < len0; i0++) {
          let data3 = data2[i0];
          if (data3 && typeof data3 == "object" && !Array.isArray(data3)) {
          } else {
            const err4 = { instancePath: instancePath + "/caption_entities/" + i0, schemaPath: "#/properties/caption_entities/items/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err4];
            } else {
              vErrors.push(err4);
            }
            errors++;
          }
        }
      } else {
        const err5 = { instancePath: instancePath + "/caption_entities", schemaPath: "#/properties/caption_entities/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
    }
    if (data.show_caption_above_media !== void 0) {
      if (typeof data.show_caption_above_media !== "boolean") {
        const err6 = { instancePath: instancePath + "/show_caption_above_media", schemaPath: "#/properties/show_caption_above_media/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
    }
  } else {
    const err7 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err7];
    } else {
      vErrors.push(err7);
    }
    errors++;
  }
  validate148.errors = vErrors;
  return errors === 0;
}
var EditContentPayload = validate149;
function validate149(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  const _errs0 = errors;
  let valid0 = false;
  let passing0 = null;
  const _errs1 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.field === void 0) {
      const err0 = { instancePath, schemaPath: "#/definitions/TextEditPayload/required", keyword: "required", params: { missingProperty: "field" }, message: "must have required property 'field'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.text === void 0) {
      const err1 = { instancePath, schemaPath: "#/definitions/TextEditPayload/required", keyword: "required", params: { missingProperty: "text" }, message: "must have required property 'text'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.field !== void 0) {
      if ("text" !== data.field) {
        const err2 = { instancePath: instancePath + "/field", schemaPath: "#/definitions/TextEditPayload/properties/field/const", keyword: "const", params: { allowedValue: "text" }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.text !== void 0) {
      if (typeof data.text !== "string") {
        const err3 = { instancePath: instancePath + "/text", schemaPath: "#/definitions/TextEditPayload/properties/text/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    if (data.entities !== void 0) {
      let data2 = data.entities;
      if (Array.isArray(data2)) {
        const len0 = data2.length;
        for (let i0 = 0; i0 < len0; i0++) {
          let data3 = data2[i0];
          if (data3 && typeof data3 == "object" && !Array.isArray(data3)) {
          } else {
            const err4 = { instancePath: instancePath + "/entities/" + i0, schemaPath: "#/definitions/TextEditPayload/properties/entities/items/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err4];
            } else {
              vErrors.push(err4);
            }
            errors++;
          }
        }
      } else {
        const err5 = { instancePath: instancePath + "/entities", schemaPath: "#/definitions/TextEditPayload/properties/entities/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
    }
    if (data.link_preview_options !== void 0) {
      let data4 = data.link_preview_options;
      if (data4 && typeof data4 == "object" && !Array.isArray(data4)) {
      } else {
        const err6 = { instancePath: instancePath + "/link_preview_options", schemaPath: "#/definitions/TextEditPayload/properties/link_preview_options/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
    }
  } else {
    const err7 = { instancePath, schemaPath: "#/definitions/TextEditPayload/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err7];
    } else {
      vErrors.push(err7);
    }
    errors++;
  }
  var _valid0 = _errs1 === errors;
  if (_valid0) {
    valid0 = true;
    passing0 = 0;
  }
  const _errs16 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.field === void 0) {
      const err8 = { instancePath, schemaPath: "#/definitions/CaptionEditPayload/required", keyword: "required", params: { missingProperty: "field" }, message: "must have required property 'field'" };
      if (vErrors === null) {
        vErrors = [err8];
      } else {
        vErrors.push(err8);
      }
      errors++;
    }
    if (data.caption === void 0) {
      const err9 = { instancePath, schemaPath: "#/definitions/CaptionEditPayload/required", keyword: "required", params: { missingProperty: "caption" }, message: "must have required property 'caption'" };
      if (vErrors === null) {
        vErrors = [err9];
      } else {
        vErrors.push(err9);
      }
      errors++;
    }
    if (data.field !== void 0) {
      if ("caption" !== data.field) {
        const err10 = { instancePath: instancePath + "/field", schemaPath: "#/definitions/CaptionEditPayload/properties/field/const", keyword: "const", params: { allowedValue: "caption" }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err10];
        } else {
          vErrors.push(err10);
        }
        errors++;
      }
    }
    if (data.caption !== void 0) {
      if (typeof data.caption !== "string") {
        const err11 = { instancePath: instancePath + "/caption", schemaPath: "#/definitions/CaptionEditPayload/properties/caption/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err11];
        } else {
          vErrors.push(err11);
        }
        errors++;
      }
    }
    if (data.caption_entities !== void 0) {
      let data7 = data.caption_entities;
      if (Array.isArray(data7)) {
        const len1 = data7.length;
        for (let i1 = 0; i1 < len1; i1++) {
          let data8 = data7[i1];
          if (data8 && typeof data8 == "object" && !Array.isArray(data8)) {
          } else {
            const err12 = { instancePath: instancePath + "/caption_entities/" + i1, schemaPath: "#/definitions/CaptionEditPayload/properties/caption_entities/items/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err12];
            } else {
              vErrors.push(err12);
            }
            errors++;
          }
        }
      } else {
        const err13 = { instancePath: instancePath + "/caption_entities", schemaPath: "#/definitions/CaptionEditPayload/properties/caption_entities/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err13];
        } else {
          vErrors.push(err13);
        }
        errors++;
      }
    }
    if (data.show_caption_above_media !== void 0) {
      if (typeof data.show_caption_above_media !== "boolean") {
        const err14 = { instancePath: instancePath + "/show_caption_above_media", schemaPath: "#/definitions/CaptionEditPayload/properties/show_caption_above_media/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
        if (vErrors === null) {
          vErrors = [err14];
        } else {
          vErrors.push(err14);
        }
        errors++;
      }
    }
  } else {
    const err15 = { instancePath, schemaPath: "#/definitions/CaptionEditPayload/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err15];
    } else {
      vErrors.push(err15);
    }
    errors++;
  }
  var _valid0 = _errs16 === errors;
  if (_valid0 && valid0) {
    valid0 = false;
    passing0 = [passing0, 1];
  } else {
    if (_valid0) {
      valid0 = true;
      passing0 = 1;
    }
  }
  if (!valid0) {
    const err16 = { instancePath, schemaPath: "#/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf" };
    if (vErrors === null) {
      vErrors = [err16];
    } else {
      vErrors.push(err16);
    }
    errors++;
  } else {
    errors = _errs0;
    if (vErrors !== null) {
      if (_errs0) {
        vErrors.length = _errs0;
      } else {
        vErrors = null;
      }
    }
  }
  validate149.errors = vErrors;
  return errors === 0;
}
var ReactionsPayload = validate150;
function validate150(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.reaction === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "reaction" }, message: "must have required property 'reaction'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.reaction !== void 0) {
      let data0 = data.reaction;
      if (Array.isArray(data0)) {
        const len0 = data0.length;
        for (let i0 = 0; i0 < len0; i0++) {
          let data1 = data0[i0];
          if (data1 && typeof data1 == "object" && !Array.isArray(data1)) {
            if (data1.type === void 0) {
              const err1 = { instancePath: instancePath + "/reaction/" + i0, schemaPath: "#/properties/reaction/items/required", keyword: "required", params: { missingProperty: "type" }, message: "must have required property 'type'" };
              if (vErrors === null) {
                vErrors = [err1];
              } else {
                vErrors.push(err1);
              }
              errors++;
            }
            if (data1.type !== void 0) {
              if (typeof data1.type !== "string") {
                const err2 = { instancePath: instancePath + "/reaction/" + i0 + "/type", schemaPath: "#/properties/reaction/items/properties/type/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err2];
                } else {
                  vErrors.push(err2);
                }
                errors++;
              }
            }
          } else {
            const err3 = { instancePath: instancePath + "/reaction/" + i0, schemaPath: "#/properties/reaction/items/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err3];
            } else {
              vErrors.push(err3);
            }
            errors++;
          }
        }
      } else {
        const err4 = { instancePath: instancePath + "/reaction", schemaPath: "#/properties/reaction/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
  } else {
    const err5 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err5];
    } else {
      vErrors.push(err5);
    }
    errors++;
  }
  validate150.errors = vErrors;
  return errors === 0;
}
var NoticeTextPayload = validate151;
function validate151(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.text === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "text" }, message: "must have required property 'text'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.text !== void 0) {
      if (typeof data.text !== "string") {
        const err1 = { instancePath: instancePath + "/text", schemaPath: "#/properties/text/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
    }
    if (data.entities !== void 0) {
      let data1 = data.entities;
      if (Array.isArray(data1)) {
        const len0 = data1.length;
        for (let i0 = 0; i0 < len0; i0++) {
          let data2 = data1[i0];
          if (data2 && typeof data2 == "object" && !Array.isArray(data2)) {
          } else {
            const err2 = { instancePath: instancePath + "/entities/" + i0, schemaPath: "#/properties/entities/items/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err2];
            } else {
              vErrors.push(err2);
            }
            errors++;
          }
        }
      } else {
        const err3 = { instancePath: instancePath + "/entities", schemaPath: "#/properties/entities/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
  } else {
    const err4 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err4];
    } else {
      vErrors.push(err4);
    }
    errors++;
  }
  validate151.errors = vErrors;
  return errors === 0;
}
var validators = {
  Token,
  SealedBlob,
  EventId,
  OpId,
  AttemptToken,
  DeadlineSeconds,
  TokenPurpose,
  BlobPurpose,
  TemplateId,
  Method,
  SealedRef,
  TemplateRef,
  ParamValue,
  Revision,
  BotConfiguredEvent,
  UserMessageEvent,
  UserInteractionEvent,
  UserEditEvent,
  UserReactionEvent,
  SupportMessageEvent,
  SupportEditEvent,
  SupportReactionEvent,
  HostNoticeEvent,
  UserForgetEvent,
  CreatedMessage,
  CreatedTopic,
  Created,
  SuccessOutcome,
  TelegramErrorOutcome,
  TransportErrorOutcome,
  HostRejectedOutcome,
  Outcome,
  OperationResultEvent,
  Event,
  EventBatch,
  Command,
  PushEnvelope,
  ChallengeRequest,
  ChallengeResponse,
  HostRequest,
  ClaimRequest,
  ClaimResponse,
  HeartbeatRequest,
  HeartbeatResponse,
  RejectResponse,
  TopicTitleRef,
  NotificationsTitleRef,
  TopicNameRef,
  TextTemplateRef,
  TextRef,
  CreateForumTopicParams,
  EditForumTopicParams,
  UnpinAllForumTopicMessagesParams,
  SendMessageParams,
  CopyMessageParams,
  EditMessageTextParams,
  EditMessageCaptionParams,
  DeleteMessageParams,
  SetMessageReactionParams,
  PinChatMessageParams,
  PrivateChatPayload,
  GroupChatPayload,
  MessageIdPayload,
  ThreadIdPayload,
  LanguagePayload,
  TopicBinding,
  NoticeBinding,
  Binding,
  TextEditPayload,
  CaptionEditPayload,
  EditContentPayload,
  ReactionsPayload,
  NoticeTextPayload
};
var methodValidators = {
  createForumTopic: CreateForumTopicParams,
  editForumTopic: EditForumTopicParams,
  unpinAllForumTopicMessages: UnpinAllForumTopicMessagesParams,
  sendMessage: SendMessageParams,
  copyMessage: CopyMessageParams,
  editMessageText: EditMessageTextParams,
  editMessageCaption: EditMessageCaptionParams,
  deleteMessage: DeleteMessageParams,
  setMessageReaction: SetMessageReactionParams,
  pinChatMessage: PinChatMessageParams
};
export {
  AttemptToken,
  Binding,
  BlobPurpose,
  BotConfiguredEvent,
  CaptionEditPayload,
  ChallengeRequest,
  ChallengeResponse,
  ClaimRequest,
  ClaimResponse,
  Command,
  CopyMessageParams,
  CreateForumTopicParams,
  Created,
  CreatedMessage,
  CreatedTopic,
  DeadlineSeconds,
  DeleteMessageParams,
  EditContentPayload,
  EditForumTopicParams,
  EditMessageCaptionParams,
  EditMessageTextParams,
  Event,
  EventBatch,
  EventId,
  GroupChatPayload,
  HeartbeatRequest,
  HeartbeatResponse,
  HostNoticeEvent,
  HostRejectedOutcome,
  HostRequest,
  LanguagePayload,
  MessageIdPayload,
  Method,
  NoticeBinding,
  NoticeTextPayload,
  NotificationsTitleRef,
  OpId,
  OperationResultEvent,
  Outcome,
  ParamValue,
  PinChatMessageParams,
  PrivateChatPayload,
  PushEnvelope,
  ReactionsPayload,
  RejectResponse,
  Revision,
  SealedBlob,
  SealedRef,
  SendMessageParams,
  SetMessageReactionParams,
  SuccessOutcome,
  SupportEditEvent,
  SupportMessageEvent,
  SupportReactionEvent,
  TelegramErrorOutcome,
  TemplateId,
  TemplateRef,
  TextEditPayload,
  TextRef,
  TextTemplateRef,
  ThreadIdPayload,
  Token,
  TokenPurpose,
  TopicBinding,
  TopicNameRef,
  TopicTitleRef,
  TransportErrorOutcome,
  UnpinAllForumTopicMessagesParams,
  UserEditEvent,
  UserForgetEvent,
  UserInteractionEvent,
  UserMessageEvent,
  UserReactionEvent,
  methodValidators,
  validators
};
