/**
 * ============================================================
 *  COLLECTION: categories
 *  Purpose   : Hierarchical taxonomy for blog posts.
 *              Supports parent → child category nesting.
 * ============================================================
 */

const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    // ── Identity ──────────────────────────────────────────────
    name  : {
      type      : String,
      required  : [true, "Category name is required"],
      trim      : true,
      maxlength : 80,
    },
    slug  : {
      type      : String,
      required  : true,
      unique    : true,
      trim      : true,
      lowercase : true,
      match     : [/^[a-z0-9-]+$/, "Slug may only contain lowercase letters, numbers and hyphens"],
    },

    // ── Hierarchy ─────────────────────────────────────────────
    parent : {
      type    : mongoose.Schema.Types.ObjectId,
      ref     : "Category",
      default : null,                // null = top-level category
    },

    // ── Display ───────────────────────────────────────────────
    description : { type: String, maxlength: 300, default: "" },
    coverImage  : { type: String, default: null },
    color       : { type: String, default: "#6366f1" }, // accent hex

    // ── Stats ─────────────────────────────────────────────────
    postsCount : { type: Number, default: 0, min: 0 },

    // ── Meta ──────────────────────────────────────────────────
    isActive : { type: Boolean, default: true },
    order    : { type: Number, default: 0 },           // for manual sorting
  },
  {
    timestamps : true,
    versionKey : false,
  }
);

// ── Indexes ───────────────────────────────────────────────────
CategorySchema.index({ slug   : 1 }, { unique: true });
CategorySchema.index({ parent : 1 });
CategorySchema.index({ isActive: 1, order: 1 });

module.exports = mongoose.model("Category", CategorySchema);
