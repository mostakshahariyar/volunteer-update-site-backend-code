import mongoose from "mongoose";

const eventsSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    date: {
      type: String,
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
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Eventside = mongoose.model("Eventside", eventsSchema);
