import { RegisterVolunteer } from "../model/registerVolunteer.model.js";
import ApiResponse from "../utils/ApiResponse.js";

export const RegisterVolunteers = async (req, res) => {
  const { name, email, date, donation_ID } = req.body;
  try {
    if (!name || !email || !date || !donationName) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newRegisterVolunteer = new RegisterVolunteer({
      name,
      email,
      date,
      donation_ID,
    });
    await newRegisterVolunteer.save();
    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          newRegisterVolunteer,
          "Volunteer registered successfully"
        )
      );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
