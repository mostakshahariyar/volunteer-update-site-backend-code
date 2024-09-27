import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    blogName: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export const Blog = mongoose.model("Blog", blogSchema);
