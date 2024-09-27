import { Eventside } from "../model/events.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import cloudinary from "cloudinary";

export const createEvent = async (req, res) => {
  const { eventName, date, description, location } = req.body;
  const avatar = req.file.path;
  try {
    if (!eventName || !date || !description || !avatar || !location) {
      throw new ApiError(400, "All fields are required");
    }
    const newEvent = new Eventside({
      eventName,
      date,
      description,
      location,
      avatar,
    });
    await newEvent.save();
    res
      .status(201)
      .json(
        new ApiResponse(201, newEvent, `${eventName} created successfully`)
      );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Eventside.find();
    res.status(200).json(new ApiResponse(200, events, "All events"));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEventSide = async (req, res) => {
  const { imageURL, id } = req.query;
  const imageArr = imageURL.split("/");
  const image = imageArr[imageArr.length - 1].split(".");
  const imageName = image[0];
  console.log(imageName);
  try {
    const event = await Eventside.findById(id);
    if (!event) {
      throw new ApiError(404, "Event not found");
    } else {
      cloudinary.v2.api
        .delete_resources([`avatar/${imageName}`], {
          type: "upload",
          resource_type: "image",
        })
        .then(console.log);
      await Eventside.findByIdAndDelete(id);
      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            event,
            `${event?.eventName} deleted successfully`
          )
        );
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  const { eventId, eventName, date, description, location } = req.body;
  try {
    const event = await Eventside.findById(eventId);
    if (!event) {
      throw new ApiError(404, "Event not found");
    }
    event.eventName = eventName;
    event.date = date;
    event.description = description;
    event.location = location;
    await event.save();
    res
      .status(200)
      .json(
        new ApiResponse(200, event, `${event?.eventName} updated successfully`)
      );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Eventside.findById(id);
    if (!event) {
      throw new ApiError(404, "Event not found");
    }
    res
      .status(200)
      .json(new ApiResponse(200, event, "Event fetched successfully"));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
