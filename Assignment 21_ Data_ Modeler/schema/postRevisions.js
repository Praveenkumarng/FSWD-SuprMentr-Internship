/**
 * ============================================================
 *  COLLECTION: post_revisions
 *  Purpose   : Immutable audit trail of every edit made to
 *              a post. Enables version history and rollback.
 * ============================================================
 */

const mongoose = require("mongoose");

const PostRevisionSchema = new mongoose.Schema(
  {
    post       : {
      type     : mongoose.Schema.Types.ObjectId,
      ref      : "Post",
      required : true,
    },
    editedBy   : {
      type     : mongoose.Schema.Types.ObjectId,
      ref      : "User",
      required : true,
    },
    revisionNumber : { type: Number, required: true }, // 1, 2, 3 …

    // ── Snapshot of the fields that changed ───────────────────
    snapshot : {
      title       : { type: String },
      slug        : { type: String },
      excerpt     : { type: String },
      body        : { type: String },
      category    : { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
      tags        : [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
      status      : { type: String },
      coverImage  : { type: mongoose.Schema.Types.Mixed },
    },

    changeNote : { type: String, maxlength: 300, default: "" },
  },
  {
    timestamps : true,
    versionKey : false,
  }
);

PostRevisionSchema.index({ post: 1, revisionNumber: -1 });
PostRevisionSchema.index({ editedBy: 1 });

module.exports = mongoose.model("PostRevision", PostRevisionSchema);
