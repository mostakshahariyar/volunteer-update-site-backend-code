import { Donation } from "../model/donation.model.js";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

export const volunteerListCount = async (userId) => {
  const aggregate = [
    {
      $match: {
        user_id: new ObjectId(`${userId}`),
      },
    },
    {
      $group: {
        _id: "$user_id",
        totalDonation: { $sum: "$donationNumber" },
      },
    },
  ];
  return await Donation.aggregate(aggregate);
};

export const totalVolunteerDonation = async () => {
  const aggregate = [
    {
      $group: {
        _id: "$user_id",
        totalDonation: { $sum: "$donationNumber" },
      },
    },
  ];
  return await Donation.aggregate(aggregate);
};
