const mongoose = require('mongoose');
const mongoosePaginate = require("mongoose-paginate-v2");

const PostSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    post: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    hashtag: {
      type: Array,
      default: [],
    },
    category: {
      type: Array,
      default: [],
    },
    like: {
      type: Number,
      default: 0,
    },
    share: {
      type: Number,
      default:0,
    },
    date: {
      type: Date,
      deault: Date.now,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at"} }
);

PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Post', PostSchema);