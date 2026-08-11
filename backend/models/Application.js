import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: 120,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      maxlength: 30,
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [18, "Applicants must be at least 18 years old"],
      max: [100, "Please provide a valid age"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
      maxlength: 100,
    },
    barAssociation: {
      type: String,
      required: [true, "Bar association is required"],
      trim: true,
      maxlength: 150,
    },
    professionalDetails: {
      type: String,
      required: [true, "Professional details are required"],
      trim: true,
      maxlength: 2000,
    },
    experience: {
      type: String,
      required: [true, "Experience is required"],
      trim: true,
      maxlength: 2000,
    },
    motivation: {
      type: String,
      required: [true, "Motivation is required"],
      trim: true,
      maxlength: 2000,
    },
    otherOrganization: {
      type: Boolean,
      default: false,
    },
    organizationDetails: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },
    achievements: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },
    politicalGovernmentRelation: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    feesStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },
    notes: {
      type: [
        {
          text: { type: String, required: true, trim: true, maxlength: 1000 },
          createdAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;
