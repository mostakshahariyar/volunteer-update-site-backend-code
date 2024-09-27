import mongoose, { Schema } from "mongoose";

const registerVolunteerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    donation_ID: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  },
  { timestamps: true }
);

export const RegisterVolunteer = mongoose.model(
  "RegisterVolunteer",
  registerVolunteerSchema
);
