import { Donation } from "../model/donation.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export const donation = async (req, res) => {
  const { event_id, user_id } = req.body;
  try {
    // Check if all fields are provided
    if (!event_id || !user_id) {
      throw new ApiError(400, "Not found any user or event");
    }
    // Check if the donation
    const donationExist = await Donation.find({ event_id, user_id });
    if (donationExist.length > 0) {
      donationExist[0].donationNumber += 1;
      console.log(donationExist[0]);
      await donationExist[0].save();
      return res
        .status(201)
        .json(new ApiResponse(201, Donation, "Donationed successfully"));
    }
    // Create new donation
    const donation = new Donation({ event_id, user_id });
    // Save donation
    await donation.save();
    res
      .status(201)
      .json(new ApiResponse(201, donation, "Donationed successfully"));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserDonation = async (req, res) => {
  const { userId } = req.body;
  try {
    if (!userId) {
      throw new ApiError(400, "User not found");
    }
    const response = await Donation.find({ user_id: userId }).populate(
      "event_id"
    );
    res.status(200).json(new ApiResponse(200, response, "User donation found"));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllDonatios = async (req, res) => {
  try {
    const respForDonation = await Donation.find().populate("event_id");
    const respForUser = await Donation.find().populate("user_id");
    res.send({ respForDonation, respForUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDonation = async (req, res) => {
  const { id } = req.query;
  try {
    if (!id) {
      throw new ApiError(400, "Donation not found");
    }
    await Donation.findByIdAndDelete(id);
    res.status(200).json(new ApiResponse(200, {}, "Donation deleted"));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
