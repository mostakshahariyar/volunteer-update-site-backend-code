import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    donationNumber: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

export const Donation = mongoose.model("Donation", donationSchema);
