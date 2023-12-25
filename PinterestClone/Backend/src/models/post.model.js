import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, // url by cloudinary
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  like: {
    type: Number,
    default: 0,
  },
  label: [
    {
      type: String,
    },
  ],
});

const Post = mongoose.model("Post", postSchema);

export { Post };
