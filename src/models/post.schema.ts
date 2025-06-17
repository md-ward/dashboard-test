import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    userName: { type: String, required: true },
    picture: { type: String, required: false },
    isEditable: { type: Boolean, required: false, default: true },
    pinned: { type: Boolean, required: false, default: false },
  },
  { timestamps: true }
);

// Optional: ensure virtual `id` instead of `_id`
PostSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

export const PostModel =
  mongoose.models.Post || mongoose.model("Post", PostSchema);
