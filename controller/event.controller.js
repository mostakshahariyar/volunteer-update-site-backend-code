import e from "express";
import { Event } from "../model/event.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import cloudinary from "cloudinary";

export const eventRegister = async (req, res) => {
  const { eventName, date, description } = req.body;
  const avatar = req.file.path;
  try {
    if (!eventName || !date || !description || !avatar) {
      throw new ApiError(400, "All fields are required");
    }
    const newEvent = new Event({ eventName, date, description, image: avatar });
    await newEvent.save();
    res
      .status(201)
      .json(new ApiResponse(201, newEvent, "Event registered successfully"));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res
      .status(200)
      .json(new ApiResponse(200, events, "Events fetched successfully"));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEvent = async (req, res) => {
  try {
    console.log(req.params.id);
    const event = await Event.findById(req.params.id);
    console.log(event);
    res
      .status(200)
      .json(new ApiResponse(200, event, "Event fetched successfully"));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  const { imageURL, id } = req.query;
  const imageArr = imageURL.split("/");
  const image = imageArr[imageArr.length - 1].split(".");
  const imageName = image[0];
  try {
    const event = await Event.findById(id);
    if (!event) {
      throw new ApiError(404, "Event not found");
    } else {
      cloudinary.v2.api
        .delete_resources([`avatar/${imageName}`], {
          type: "upload",
          resource_type: "image",
        })
        .then(console.log);
      await Event.findByIdAndDelete(id);
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

export const updateDonation = async (req, res) => {
  const { eventId, eventName, eventDescription, eventDate } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      throw new ApiError(404, "Event not found");
    }
    event.eventName = eventName;
    event.description = eventDescription;
    event.date = eventDate;
    await event.save();
    res
      .status(200)
      .json(new ApiResponse(200, event, "Event updated successfully"));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
