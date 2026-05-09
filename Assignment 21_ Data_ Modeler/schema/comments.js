/**
 * ============================================================
 *  COLLECTION: comments
 *  Purpose   : Threaded comments on blog posts.
 *              Supports nested replies (one level deep
 *              stored as parent reference), reactions,
 *              and moderation states.
 * ============================================================
 */

const mongoose = require("mongoose");

// ── Sub-schema: Reactions ─────────────────────────────────────
const ReactionSchema = new mongoose.Schema(
  {
    userId : {
      type     : mongoose.Schema.Types.ObjectId,
      ref      : "User",
      required : true,
    },
    emoji  : {
      type    : String,
      enum    : ["👍", "❤️", "😂", "😮", "😢", "🔥"],
      default : "👍",
    },
    reactedAt : { type: Date, default: Date.now },
  },
  { _id: true }
);

// ── Main Schema ───────────────────────────────────────────────
const CommentSchema = new mongoose.Schema(
  {
    // ── Context ───────────────────────────────────────────────
    post   : {
      type     : mongoose.Schema.Types.ObjectId,
      ref      : "Post",
      required : [true, "Post reference is required"],
    },

    // ── Threading ─────────────────────────────────────────────
    parent : {
      type    : mongoose.Schema.Types.ObjectId,
      ref     : "Comment",
      default : null,         // null = top-level comment
    },
    depth  : { type: Number, default: 0, min: 0 }, // 0=root, 1=reply

    // ── Author ────────────────────────────────────────────────
    author : {
      type     : mongoose.Schema.Types.ObjectId,
      ref      : "User",
      required : [true, "Author is required"],
    },
    isAnonymous : { type: Boolean, default: false },

    // ── Content ───────────────────────────────────────────────
    body     : {
      type      : String,
      required  : [true, "Comment body is required"],
      trim      : true,
      maxlength : 2000,
    },
    bodyHtml : { type: String, default: "" },

    // ── Moderation ────────────────────────────────────────────
    status : {
      type    : String,
      enum    : ["pending", "approved", "spam", "deleted"],
      default : "approved",
    },
    isEdited     : { type: Boolean, default: false },
    editedAt     : { type: Date,    default: null  },
    deletedAt    : { type: Date,    default: null  },
    moderatedBy  : {
      type    : mongoose.Schema.Types.ObjectId,
      ref     : "User",
      default : null,
    },
    moderationNote : { type: String, default: null },

    // ── Engagement ────────────────────────────────────────────
    reactions   : [ReactionSchema],
    likesCount  : { type: Number, default: 0, min: 0 },
    repliesCount: { type: Number, default: 0, min: 0 },

    // ── Reports ───────────────────────────────────────────────
    reports : [
      {
        reportedBy  : { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        reason      : {
          type : String,
          enum : ["spam", "harassment", "misinformation", "other"],
        },
        reportedAt  : { type: Date, default: Date.now },
        _id         : false,
      },
    ],
  },
  {
    timestamps : true,
    versionKey : false,
  }
);

// ── Indexes ───────────────────────────────────────────────────
CommentSchema.index({ post: 1, parent: 1, status: 1, createdAt: 1 });
CommentSchema.index({ author: 1 });
CommentSchema.index({ status: 1 });
CommentSchema.index({ parent: 1 }, { sparse: true });

module.exports = mongoose.model("Comment", CommentSchema);
