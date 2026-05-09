/**
 * ============================================================
 *  COLLECTION: notifications
 *  Purpose   : In-app notification feed for users.
 *              Covers new comments, likes, follows, mentions.
 * ============================================================
 */

const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    recipient : {
      type     : mongoose.Schema.Types.ObjectId,
      ref      : "User",
      required : true,
    },
    sender    : {
      type    : mongoose.Schema.Types.ObjectId,
      ref     : "User",
      default : null,     // null for system notifications
    },

    // ── Type & Payload ────────────────────────────────────────
    type : {
      type    : String,
      required: true,
      enum    : [
        "new_comment",
        "comment_reply",
        "post_like",
        "comment_like",
        "new_follower",
        "mention",
        "post_published",   // system: author's scheduled post went live
        "system",
      ],
    },
    // Flexible reference to the relevant document
    entityType : {
      type : String,
      enum : ["Post", "Comment", "User"],
    },
    entityId   : {
      type    : mongoose.Schema.Types.ObjectId,
      refPath : "entityType",
    },

    message  : { type: String, maxlength: 200 },
    isRead   : { type: Boolean, default: false },
    readAt   : { type: Date,    default: null  },
  },
  {
    timestamps : true,
    versionKey : false,
  }
);

// ── Indexes ───────────────────────────────────────────────────
NotificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 });
NotificationSchema.index({ recipient: 1, createdAt: -1 });
// TTL: auto-delete notifications older than 90 days
NotificationSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 90 }
);

module.exports = mongoose.model("Notification", NotificationSchema);
