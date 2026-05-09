/**
 * ============================================================
 *  schema/index.js
 *  Purpose   : Central export for all Mongoose models.
 *              Import this file in your app to register
 *              every collection with Mongoose at once.
 * ============================================================
 *
 *  Usage:
 *    const { User, Post, Comment, Tag, Category,
 *            PostRevision, Notification } = require("./schema");
 */

const User         = require("./users");
const Category     = require("./categories");
const Tag          = require("./tags");
const Post         = require("./posts");
const Comment      = require("./comments");
const PostRevision = require("./postRevisions");
const Notification = require("./notifications");

module.exports = {
  User,
  Category,
  Tag,
  Post,
  Comment,
  PostRevision,
  Notification,
};
