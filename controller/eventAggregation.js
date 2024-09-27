import { eventCount } from "../aggregations/eventCount.js";

export const eachEventDonationCount = async (req, res) => {
  const { eventId } = req.body;
  try {
    const aggregate = await eventCount();
    if (aggregate.length === 0) {
      return res.status(404).json({
        totalEvent: 0,
        message: "No donations found for this event",
      });
    }
    res.status(200).json({ totalEvent: aggregate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
