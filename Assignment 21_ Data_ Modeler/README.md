# Assignment 21 – Data Modeler
## MongoDB Schema Design: Blogging Platform

---

## 📌 Overview

This assignment designs a complete, production-ready **MongoDB schema** for a full-featured blogging platform using **Mongoose ODM**. The schema follows MongoDB best practices — embedding small, frequently-read sub-documents and referencing large or independently-queried collections.

---

## 📂 Project Structure

```
schema/
├── index.js            ← Central barrel export for all models
├── users.js            ← User accounts (authors, readers, admins)
├── categories.js       ← Hierarchical post categories
├── tags.js             ← Flat post labels
├── posts.js            ← Core blog post content
├── comments.js         ← Threaded comments with reactions
├── postRevisions.js    ← Immutable post edit history
└── notifications.js    ← In-app notification feed
```

---

## 🗄️ Collections & Schema Design

### 1. `users`

Stores all registered platform users.

| Field | Type | Notes |
|-------|------|-------|
| `username` | String | Unique, lowercase, indexed |
| `email` | String | Unique, validated, indexed |
| `passwordHash` | String | bcrypt hash, `select: false` |
| `displayName` | String | Public display name |
| `bio` | String | Max 300 chars |
| `avatarUrl` | String | Profile picture |
| `role` | String (enum) | `reader \| author \| editor \| admin` |
| `isVerified` | Boolean | Email verification status |
| `isBanned` | Boolean | Moderation ban flag |
| `stats` | Embedded Object | Denormalized counters (posts, followers, views) |
| `followers` | [ObjectId → User] | Array of follower refs |
| `following` | [ObjectId → User] | Array of following refs |
| `bookmarks` | [ObjectId → Post] | Saved posts |
| `socialLinks` | Embedded Object | Twitter, LinkedIn, GitHub, Website |
| `preferences` | Embedded Object | Email notification opt-in flags |

**Key Indexes:** `username`, `email`, `stats.followersCount`, `createdAt`

---

### 2. `categories`

Hierarchical content taxonomy for organizing posts.

| Field | Type | Notes |
|-------|------|-------|
| `name` | String | Category display name |
| `slug` | String | Unique URL slug |
| `parent` | ObjectId → Category | `null` = top-level; enables nested categories |
| `description` | String | Max 300 chars |
| `coverImage` | String | Category banner image URL |
| `color` | String | Hex accent color for UI |
| `postsCount` | Number | Denormalized counter |
| `isActive` | Boolean | Soft-disable a category |
| `order` | Number | Manual sort order |

**Key Indexes:** `slug` (unique), `parent`, `isActive + order`

---

### 3. `tags`

Flat labels for fine-grained post discovery.

| Field | Type | Notes |
|-------|------|-------|
| `name` | String | Display label |
| `slug` | String | Unique URL slug |
| `description` | String | Max 200 chars |
| `color` | String | Badge color hex |
| `postsCount` | Number | Denormalized counter |

**Key Indexes:** `slug` (unique), `postsCount` (desc)

---

### 4. `posts`  *(Core Entity)*

The primary content document of the platform.

| Field | Type | Notes |
|-------|------|-------|
| `title` | String | Max 200 chars |
| `slug` | String | Unique URL identifier |
| `excerpt` | String | Max 500 chars, preview text |
| `body` | String | Raw Markdown / HTML |
| `bodyHtml` | String | Pre-rendered HTML for fast reads |
| `coverImage` | Embedded Media | URL, alt text, caption, dimensions |
| `media` | [Embedded Media] | Gallery / inline assets |
| `author` | ObjectId → User | Required |
| `coAuthors` | [ObjectId → User] | Multi-author support |
| `category` | ObjectId → Category | Required |
| `tags` | [ObjectId → Tag] | Many-to-many reference |
| `status` | String (enum) | `draft \| review \| scheduled \| published \| archived` |
| `visibility` | String (enum) | `public \| unlisted \| members_only \| private` |
| `isPremium` | Boolean | Paid-member content gate |
| `isFeatured` | Boolean | Homepage feature flag |
| `isPinned` | Boolean | Pinned to top |
| `publishedAt` | Date | Actual publish timestamp |
| `scheduledFor` | Date | Future scheduled publish |
| `seo` | Embedded Object | Meta title, description, canonical URL, OG image |
| `likes` | [ObjectId → User] | Fast membership test for like status |
| `stats` | Embedded Object | Views, likes, comments, shares, bookmarks, read time |
| `commentsEnabled` | Boolean | Toggle comment section |
| `series` | Embedded Object | Name + part number for multi-part posts |
| `lastEditedBy` | ObjectId → User | Last editor reference |
| `revisionCount` | Number | Total number of saved revisions |

**Key Indexes:**
- `slug` (unique)
- `author + status` (author's post feed)
- `category + status` (category browsing)
- `tags` (tag filtering)
- `status + publishedAt` (public feed, sorted newest-first)
- `isFeatured + status` (featured content)
- `stats.viewsCount`, `stats.likesCount` (trending)
- `scheduledFor` (sparse – scheduled post cron job)
- **Full-text index** on `title`, `excerpt`, `body` with weights

---

### 5. `comments`

Threaded comments supporting one-level nesting (root + reply).

| Field | Type | Notes |
|-------|------|-------|
| `post` | ObjectId → Post | Required |
| `parent` | ObjectId → Comment | `null` = root comment |
| `depth` | Number | `0` = root, `1` = reply |
| `author` | ObjectId → User | Required |
| `body` | String | Max 2000 chars |
| `bodyHtml` | String | Pre-rendered HTML |
| `status` | String (enum) | `pending \| approved \| spam \| deleted` |
| `isEdited` | Boolean | Edit indicator |
| `reactions` | [Embedded] | Emoji reactions with user ref |
| `likesCount` | Number | Denormalized |
| `repliesCount` | Number | Denormalized |
| `reports` | [Embedded] | Abuse reports with reason |

**Key Indexes:** `post + parent + status + createdAt`, `author`, `status`

---

### 6. `post_revisions`

Immutable snapshots of post edits — enables version history and rollback.

| Field | Type | Notes |
|-------|------|-------|
| `post` | ObjectId → Post | Which post was edited |
| `editedBy` | ObjectId → User | Who made the edit |
| `revisionNumber` | Number | Sequential (1, 2, 3 …) |
| `snapshot` | Embedded Object | Snapshot of changed fields (title, body, tags, etc.) |
| `changeNote` | String | Optional editor note |

**Key Indexes:** `post + revisionNumber` (desc), `editedBy`

---

### 7. `notifications`

In-app notification feed for user activity events.

| Field | Type | Notes |
|-------|------|-------|
| `recipient` | ObjectId → User | Who receives the notification |
| `sender` | ObjectId → User | `null` for system events |
| `type` | String (enum) | `new_comment`, `post_like`, `new_follower`, `mention`, etc. |
| `entityType` | String (enum) | `Post \| Comment \| User` |
| `entityId` | ObjectId (dynamic ref) | Points to the relevant document |
| `message` | String | Max 200 chars |
| `isRead` | Boolean | Read/unread status |
| `readAt` | Date | When marked as read |

**Key Indexes:**
- `recipient + isRead + createdAt` (unread notification count)
- **TTL Index** on `createdAt` → auto-deletes documents after **90 days**

---

## 🔗 Entity Relationship Diagram

```
                         ┌─────────────┐
                         │    users    │◄────────────┐
                         └──────┬──────┘             │
                                │                    │
              ┌─────────────────┼──────────────────┐ │
              │                 │                  │ │
              ▼                 ▼                  ▼ │
        ┌──────────┐    ┌───────────────┐   ┌──────────────┐
        │   posts  │    │   comments    │   │notifications │
        └────┬─────┘    └───────────────┘   └──────────────┘
             │
     ┌───────┼──────────┐
     │       │          │
     ▼       ▼          ▼
┌────────┐ ┌─────┐ ┌────────────────┐
│category│ │tags │ │ post_revisions │
└────────┘ └─────┘ └────────────────┘
     │
     ▼
 (self-ref:
  parent)
```

---

## ⚙️ Design Decisions

| Decision | Rationale |
|----------|-----------|
| **Embed `stats`** in Post & User | Counters are read far more often than written; avoids joins on hot paths |
| **Embed `seo`** in Post | Always accessed with the post; never queried independently |
| **Reference `tags`** from Post | Tags are shared across posts; large tag arrays benefit from normalization |
| **Embed `reactions`** in Comment | Reactions are always displayed with the comment; small, bounded list |
| **Separate `post_revisions`** collection | Keeps the `posts` document lean; revision history is rarely accessed |
| **TTL index** on `notifications` | Prevents unbounded growth; old notifications have diminishing value |
| **`select: false`** on `passwordHash` | Security: password hash is never accidentally returned in API responses |
| **Full-text index** on Post | Enables `$text` search across title, excerpt, and body without external search engine |
| **Sparse index** on `scheduledFor` | Only posts with a future date set have this field; sparse saves index space |

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install mongoose bcryptjs

# Require models in your app entry point
const { User, Post, Comment, Tag, Category,
        PostRevision, Notification } = require("./schema");

# Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/blogging_platform");
```

---

*Assignment 21 – Data Modeler | Designed with MongoDB + Mongoose*
