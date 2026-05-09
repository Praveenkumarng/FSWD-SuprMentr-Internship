/**
 * ============================================================
 *  COLLECTION: users
 *  Purpose   : Stores all registered user accounts on the
 *              blogging platform (authors, readers, admins).
 * ============================================================
 */

const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");

// ── Sub-schema: Social Links ──────────────────────────────────
const SocialLinksSchema = new mongoose.Schema(
  {
    twitter  : { type: String, trim: true, default: null },
    linkedin : { type: String, trim: true, default: null },
    github   : { type: String, trim: true, default: null },
    website  : { type: String, trim: true, default: null },
  },
  { _id: false }
);

// ── Sub-schema: Notification Preferences ─────────────────────
const NotificationPrefsSchema = new mongoose.Schema(
  {
    emailOnComment  : { type: Boolean, default: true  },
    emailOnLike     : { type: Boolean, default: false },
    emailOnFollower : { type: Boolean, default: true  },
    emailNewsletter : { type: Boolean, default: true  },
  },
  { _id: false }
);

// ── Main Schema ───────────────────────────────────────────────
const UserSchema = new mongoose.Schema(
  {
    // ── Identity ──────────────────────────────────────────────
    username  : {
      type      : String,
      required  : [true, "Username is required"],
      unique    : true,
      trim      : true,
      lowercase : true,
      minlength : 3,
      maxlength : 30,
      match     : [/^[a-z0-9_]+$/, "Only letters, numbers, and underscores"],
    },
    email     : {
      type     : String,
      required : [true, "Email is required"],
      unique   : true,
      trim     : true,
      lowercase: true,
      match    : [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    passwordHash : {
      type     : String,
      required : true,
      select   : false,          // never returned in queries by default
    },

    // ── Profile ───────────────────────────────────────────────
    displayName : {
      type      : String,
      trim      : true,
      maxlength : 60,
    },
    bio         : { type: String, maxlength: 300, default: "" },
    avatarUrl   : { type: String, default: null },
    location    : { type: String, maxlength: 100, default: null },
    socialLinks : { type: SocialLinksSchema, default: () => ({}) },

    // ── Role & Status ─────────────────────────────────────────
    role        : {
      type    : String,
      enum    : ["reader", "author", "editor", "admin"],
      default : "reader",
    },
    isVerified  : { type: Boolean, default: false },
    isActive    : { type: Boolean, default: true  },
    isBanned    : { type: Boolean, default: false },

    // ── Stats (denormalized counters) ─────────────────────────
    stats : {
      postsCount     : { type: Number, default: 0, min: 0 },
      followersCount : { type: Number, default: 0, min: 0 },
      followingCount : { type: Number, default: 0, min: 0 },
      totalViews     : { type: Number, default: 0, min: 0 },
    },

    // ── Followers / Following (reference arrays) ──────────────
    followers : [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following : [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    // ── Bookmarks ─────────────────────────────────────────────
    bookmarks : [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],

    // ── Preferences ───────────────────────────────────────────
    preferences : {
      type: NotificationPrefsSchema,
      default: () => ({}),
    },

    // ── Auth tokens ───────────────────────────────────────────
    emailVerificationToken  : { type: String, select: false },
    passwordResetToken      : { type: String, select: false },
    passwordResetExpires    : { type: Date,   select: false },
    lastLoginAt             : { type: Date,   default: null },
  },
  {
    timestamps  : true,          // createdAt, updatedAt
    versionKey  : false,
  }
);

// ── Indexes ───────────────────────────────────────────────────
UserSchema.index({ username : 1 }, { unique: true });
UserSchema.index({ email    : 1 }, { unique: true });
UserSchema.index({ role     : 1 });
UserSchema.index({ "stats.followersCount": -1 });
UserSchema.index({ createdAt: -1 });
UserSchema.index({ isActive : 1, isBanned: 1 });

// ── Pre-save hook: hash password ──────────────────────────────
UserSchema.pre("save", async function (next) {
  if (!this.isModified("passwordHash")) return next();
  this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
  next();
});

// ── Instance method: compare password ─────────────────────────
UserSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.passwordHash);
};

// ── Virtual: full profile URL ─────────────────────────────────
UserSchema.virtual("profileUrl").get(function () {
  return `/users/${this.username}`;
});

module.exports = mongoose.model("User", UserSchema);
