// models/Booking.js
// A Mongoose Schema defines what fields a document
// in our MongoDB collection can have, and what type
// each field must be.

import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    // Personal details
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true, // removes leading/trailing whitespace
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true, // always stored in lowercase
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },

    // Service details
    service: {
      type: String,
      required: [true, "Service is required"],
      // enum means only these exact values are accepted
      enum: ["wash-fold", "dry-cleaning", "ironing", "express", "multiple"],
    },
    date: {
      type: String,
      required: [true, "Pickup date is required"],
    },
    time: {
      type: String,
      required: [true, "Pickup time is required"],
      enum: ["morning", "afternoon", "evening"],
    },
    notes: {
      type: String,
      default: "",
    },

    // Booking management fields
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "confirmed", "in-progress", "completed", "cancelled"],
    },
    // Auto-generated booking reference e.g. LM-2847
    bookingRef: {
      type: String,
      unique: true,
    },
  },
  {
    // timestamps: true automatically adds createdAt and updatedAt
    // fields to every document
    timestamps: true,
  },
);

// Pre-save hook — runs automatically BEFORE a booking is saved.
// Generates a unique booking reference like "LM-4821"
bookingSchema.pre("save", function (next) {
  if (!this.bookingRef) {
    // Math.random generates a number, toString(36) converts to
    // base-36 (letters + numbers), slice gets last 5 characters
    this.bookingRef =
      "LM-" + Math.random().toString(36).slice(-5).toUpperCase();
  }
  next();
});

// mongoose.model() creates the model from the schema.
// 'Booking' becomes the 'bookings' collection in MongoDB.
const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
