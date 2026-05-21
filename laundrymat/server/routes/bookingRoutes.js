// routes/bookingRoutes.js
// Routes connect URLs to controller functions.
// express-validator rules are defined here and
// run as middleware BEFORE the controller.

import express from "express";
import { body } from "express-validator";
import {
  createBooking,
  getBookings,
} from "../controllers/bookingController.js";

const router = express.Router();

// Validation rules for creating a booking
const bookingValidation = [
  body("firstName").trim().notEmpty().withMessage("First name is required"),
  body("lastName").trim().notEmpty().withMessage("Last name is required"),
  body("email").trim().isEmail().withMessage("Valid email is required"),
  body("phone").trim().notEmpty().withMessage("Phone number is required"),
  body("service")
    .notEmpty()
    .isIn(["wash-fold", "dry-cleaning", "ironing", "express", "multiple"])
    .withMessage("Valid service is required"),
  body("date").notEmpty().withMessage("Pickup date is required"),
  body("time")
    .notEmpty()
    .isIn(["morning", "afternoon", "evening"])
    .withMessage("Valid time window is required"),
];

// POST /api/bookings  → validate → createBooking
router.post("/", bookingValidation, createBooking);

// GET  /api/bookings  → getBookings
router.get("/", getBookings);

export default router;
