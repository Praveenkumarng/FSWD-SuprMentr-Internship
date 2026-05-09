/**
 * ============================================================
 *  COLLECTION: tags
 *  Purpose   : Flat list of content labels that can be
 *              applied to posts for fine-grained discovery.
 * ============================================================
 */

const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema(
  {
    name : {
      type      : String,
      required  : [true, "Tag name is required"],
      trim      : true,
      maxlength : 50,
    },
    slug : {
      type      : String,
      required  : true,
      unique    : true,
      trim      : true,
      lowercase : true,
      match     : [/^[a-z0-9-]+$/, "Slug may only contain lowercase letters, numbers and hyphens"],
    },
    description : { type: String, maxlength: 200, default: "" },
    color       : { type: String, default: "#8b5cf6" },  // badge color hex
    postsCount  : { type: Number, default: 0, min: 0 },
    isActive    : { type: Boolean, default: true },
  },
  {
    timestamps : true,
    versionKey : false,
  }
);

// ── Indexes ───────────────────────────────────────────────────
TagSchema.index({ slug       : 1 }, { unique: true });
TagSchema.index({ postsCount : -1 });
TagSchema.index({ isActive   : 1 });

module.exports = mongoose.model("Tag", TagSchema);
