import mongoose from "mongoose";
import { Donation } from "../model/donation.model.js";

const { ObjectId } = mongoose.Types;

export const eventCount = async () => {
  const aggregate = [
    {
      $group: {
        _id: "$event_id",
        count: { $sum: "$donationNumber" },
      },
    },
  ];
  return await Donation.aggregate(aggregate);
};
