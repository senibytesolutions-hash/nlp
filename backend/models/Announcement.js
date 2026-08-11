import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: 500,
    },
    ctaText: {
      type: String,
      trim: true,
      maxlength: 60,
      default: "",
    },
    ctaLink: {
      type: String,
      trim: true,
      maxlength: 300,
      default: "",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true } // createdAt / updatedAt
);

const Announcement = mongoose.model("Announcement", announcementSchema);

export default Announcement;
