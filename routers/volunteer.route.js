import express from "express";
import {
  deleteDonation,
  donation,
  getAllDonatios,
  getUserDonation,
} from "../controller/donation.controller.js";
import { RegisterVolunteers } from "../controller/registerVolunteer.controller.js";
import {
  Login,
  SignUp,
  checkUser,
  deleteUser,
  logout,
} from "../controller/user.controller.js";
import { verifyToken } from "../midellware/verifyToken.js";
import { parser } from "../midellware/multer.js";
import { allUsers } from "../controller/allUsers.js";
import {
  eventRegister,
  getEvent,
  getAllEvents,
  deleteEvent,
  updateDonation,
} from "../controller/event.controller.js";
import {
  addBlogs,
  deleteBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
} from "../controller/addBlogs.js";
import {
  createEvent,
  deleteEventSide,
  getEvents,
  getSingleEvent,
  updateEvent,
} from "../controller/events.controller.js";
import {
  getTotalDonationEachUser,
  getVolunteerListCount,
} from "../controller/vlounteerListCount.aggregation.js";
import { eachEventDonationCount } from "../controller/eventAggregation.js";

const router = express.Router();

router.get("/check-user", verifyToken, checkUser);
router.post("/volunteer-donation-count", getVolunteerListCount);
router.get("/total-volunteer-donation-count", getTotalDonationEachUser);
router.get("/event-donation-count", eachEventDonationCount);
router.patch("/donation-update", updateDonation);
router.patch("/event-update", updateEvent);
router.patch("/blog-update", updateBlog);
router.post("/signup", parser, SignUp);
router.post("/event-register", parser, eventRegister);
router.post("/create-blog", parser, addBlogs);
router.post("/create-event", parser, createEvent);
router.post("/login", Login);
router.post("/logout", logout);
router.post("/donation-create", donation);
router.post("/get-user-donation", getUserDonation);
router.get("/all-donations", getAllDonatios);
router.post("/register-volunteer", RegisterVolunteers);
router.get("/users", allUsers);
router.get("/event/:id", getSingleEvent);
router.get("/blog/:id", getSingleBlog);
router.delete("/delete-user", deleteUser);
router.delete("/delete-blog", deleteBlog);
router.delete("/delete-event", deleteEvent);
router.delete("/delete-event-site", deleteEventSide);
router.delete("/delete-donation", deleteDonation);
router.get("/events", getAllEvents);
router.get("/donation/:id", getEvent);
router.get("/blogs", getBlogs);
router.get("/all-events", getEvents);

export default router;
