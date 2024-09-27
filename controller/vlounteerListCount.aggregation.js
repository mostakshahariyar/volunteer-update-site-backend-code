import {
  totalVolunteerDonation,
  volunteerListCount,
} from "../aggregations/volunteerList.js";

export const getVolunteerListCount = async (req, res) => {
  const { userId } = req.body;
  try {
    const donationSum = await volunteerListCount(userId);
    if (donationSum.length === 0) {
      return res.status(404).json({
        totalDonation: 0,
        message: "No donations found for this user",
      });
    }
    res.status(200).json({ totalDonation: donationSum[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTotalDonationEachUser = async (req, res) => {
  try {
    const donationSum = await totalVolunteerDonation();
    res.status(200).json({ donationSum });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
