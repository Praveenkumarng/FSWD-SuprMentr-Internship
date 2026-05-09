/**
 * ============================================================
 *  COLLECTION: posts
 *  Purpose   : Core content unit of the blogging platform.
 *              Supports drafts, scheduling, versioning,
 *              rich-media content, and SEO metadata.
 * ============================================================
 */

const mongoose = require("mongoose");

// ── Sub-schema: SEO Metadata ──────────────────────────────────
const SEOSchema = new mongoose.Schema(
  {
    metaTitle       : { type: String, maxlength: 70,  default: null },
    metaDescription : { type: String, maxlength: 160, default: null },
    canonicalUrl    : { type: String, default: null },
    ogImageUrl      : { type: String, default: null },
    noIndex         : { type: Boolean, default: false },
  },
  { _id: false }
);

// ── Sub-schema: Media Attachment ─────────────────────────────
const MediaSchema = new mongoose.Schema(
  {
    url      : { type: String, required: true },
    altText  : { type: String, default: ""   },
    caption  : { type: String, default: ""   },
    mimeType : { type: String, default: null },   // e.g. "image/webp"
    width    : { type: Number, default: null },
    height   : { type: Number, default: null },
    sizeBytes: { type: Number, default: null },
  },
  { _id: true }
);

// ── Sub-schema: Post Stats ────────────────────────────────────
const PostStatsSchema = new mongoose.Schema(
  {
    viewsCount    : { type: Number, default: 0, min: 0 },
    likesCount    : { type: Number, default: 0, min: 0 },
    commentsCount : { type: Number, default: 0, min: 0 },
    sharesCount   : { type: Number, default: 0, min: 0 },
    bookmarksCount: { type: Number, default: 0, min: 0 },
    readTime      : { type: Number, default: 0 },         // in minutes
  },
  { _id: false }
);

// ── Main Schema ───────────────────────────────────────────────
const PostSchema = new mongoose.Schema(
  {
    // ── Core Content ──────────────────────────────────────────
    title   : {
      type      : String,
      required  : [true, "Post title is required"],
      trim      : true,
      maxlength : 200,
    },
    slug    : {
      type      : String,
      required  : true,
      unique    : true,
      trim      : true,
      lowercase : true,
    },
    excerpt : {
      type      : String,
      maxlength : 500,
      default   : "",
    },

    // ── Body ──────────────────────────────────────────────────
    //   body stores the raw markdown/HTML content
    //   bodyHtml stores the pre-rendered HTML for fast reads
    body     : { type: String, required: [true, "Post body is required"] },
    bodyHtml : { type: String, default: "" },

    // ── Cover Image ───────────────────────────────────────────
    coverImage : { type: MediaSchema, default: null },

    // ── Media Gallery ─────────────────────────────────────────
    media : [MediaSchema],

    // ── Relationships ─────────────────────────────────────────
    author   : {
      type     : mongoose.Schema.Types.ObjectId,
      ref      : "User",
      required : [true, "Author is required"],
    },
    coAuthors : [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    category  : {
      type     : mongoose.Schema.Types.ObjectId,
      ref      : "Category",
      required : [true, "Category is required"],
    },
    tags : [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],

    // ── Publication State ─────────────────────────────────────
    status      : {
      type    : String,
      enum    : ["draft", "review", "scheduled", "published", "archived"],
      default : "draft",
    },
    publishedAt    : { type: Date, default: null },
    scheduledFor   : { type: Date, default: null },   // future publish date
    archivedAt     : { type: Date, default: null },

    // ── Visibility ────────────────────────────────────────────
    visibility : {
      type    : String,
      enum    : ["public", "unlisted", "members_only", "private"],
      default : "public",
    },
    isPremium  : { type: Boolean, default: false },   // paid-members gate

    // ── Featured / Pinned ─────────────────────────────────────
    isFeatured : { type: Boolean, default: false },
    isPinned   : { type: Boolean, default: false },

    // ── SEO ───────────────────────────────────────────────────
    seo : { type: SEOSchema, default: () => ({}) },

    // ── Likes (array of user IDs for quick membership test) ───
    likes : [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    // ── Stats ─────────────────────────────────────────────────
    stats : { type: PostStatsSchema, default: () => ({}) },

    // ── Comments setting ──────────────────────────────────────
    commentsEnabled : { type: Boolean, default: true },

    // ── Series (multi-part posts) ─────────────────────────────
    series : {
      name  : { type: String, default: null },
      part  : { type: Number, default: null },  // part number in series
    },

    // ── Revision history ──────────────────────────────────────
    //   Only keep a lightweight summary; full diff lives in PostRevision
    lastEditedBy : {
      type    : mongoose.Schema.Types.ObjectId,
      ref     : "User",
      default : null,
    },
    lastEditedAt : { type: Date, default: null },
    revisionCount: { type: Number, default: 0  },
  },
  {
    timestamps : true,
    versionKey : false,
  }
);

// ── Compound Indexes ──────────────────────────────────────────
PostSchema.index({ slug       : 1 }, { unique: true });
PostSchema.index({ author     : 1, status: 1 });
PostSchema.index({ category   : 1, status: 1 });
PostSchema.index({ tags       : 1 });
PostSchema.index({ status     : 1, publishedAt: -1 });          // feed
PostSchema.index({ isFeatured : 1, status: 1 });
PostSchema.index({ "stats.viewsCount"  : -1 });                  // trending
PostSchema.index({ "stats.likesCount"  : -1 });
PostSchema.index({ scheduledFor: 1 }, { sparse: true });
PostSchema.index(
  { title: "text", excerpt: "text", body: "text" },
  { weights: { title: 10, excerpt: 5, body: 1 }, name: "post_text_search" }
);

module.exports = mongoose.model("Post", PostSchema);
