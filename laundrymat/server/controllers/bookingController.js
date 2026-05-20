// controllers/bookingController.js
// Controllers handle the actual logic for each route.
// Keeping logic here (not in routes) keeps code organized
// and easy to test independently.

import { validationResult } from "express-validator";
import nodemailer from "nodemailer";
import Booking from "../models/Booking.js";
import process from "node:process";

// ── Email transporter ──
// Nodemailer uses a "transporter" object to send emails.
// We configure it once and reuse it for every email sent.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password (not your login password)
  },
});

// ── Helper: send confirmation email to the customer ──
const sendCustomerEmail = async (booking) => {
  const serviceLabels = {
    "wash-fold": "Wash & Fold",
    "dry-cleaning": "Dry Cleaning",
    ironing: "Ironing & Pressing",
    express: "Express Service",
    multiple: "Multiple Services",
  };

  const timeLabels = {
    morning: "8 AM – 11 AM",
    afternoon: "12 PM – 3 PM",
    evening: "4 PM – 7 PM",
  };

  await transporter.sendMail({
    from: `"LaundryMart" <${process.env.EMAIL_USER}>`,
    to: booking.email,
    subject: `Booking Confirmed — ${booking.bookingRef} | LaundryMart`,
    html: `
      <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #060B18; color: #ffffff; padding: 40px; border-radius: 12px;">
        
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: #ffffff; font-size: 28px; margin: 0;">
            <span style="color: #DC2626;">Laundry</span>Mart
          </h1>
        </div>

        <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 32px; margin-bottom: 24px;">
          <h2 style="color: #4ADE80; font-size: 22px; margin: 0 0 8px 0;">✓ Booking Confirmed!</h2>
          <p style="color: rgba(255,255,255,0.6); margin: 0;">
            Hi ${booking.firstName}, your LaundryMart pickup has been scheduled.
          </p>
        </div>

        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
          <h3 style="color: #93C5FD; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; margin: 0 0 16px 0;">Booking Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="color: rgba(255,255,255,0.4); padding: 8px 0; font-size: 14px;">Reference</td>
              <td style="color: #ffffff; font-weight: bold; padding: 8px 0; font-size: 14px;">${booking.bookingRef}</td>
            </tr>
            <tr>
              <td style="color: rgba(255,255,255,0.4); padding: 8px 0; font-size: 14px;">Service</td>
              <td style="color: #ffffff; padding: 8px 0; font-size: 14px;">${serviceLabels[booking.service]}</td>
            </tr>
            <tr>
              <td style="color: rgba(255,255,255,0.4); padding: 8px 0; font-size: 14px;">Pickup Date</td>
              <td style="color: #ffffff; padding: 8px 0; font-size: 14px;">${booking.date}</td>
            </tr>
            <tr>
              <td style="color: rgba(255,255,255,0.4); padding: 8px 0; font-size: 14px;">Time Window</td>
              <td style="color: #ffffff; padding: 8px 0; font-size: 14px;">${timeLabels[booking.time]}</td>
            </tr>
            ${
              booking.address
                ? `
            <tr>
              <td style="color: rgba(255,255,255,0.4); padding: 8px 0; font-size: 14px;">Address</td>
              <td style="color: #ffffff; padding: 8px 0; font-size: 14px;">${booking.address}</td>
            </tr>`
                : ""
            }
          </table>
        </div>

        <p style="color: rgba(255,255,255,0.4); font-size: 13px; text-align: center; margin: 0;">
          Questions? Call us at <strong style="color: #ffffff;">+1 (555) 234-5678</strong>
          or reply to this email.
        </p>

      </div>
    `,
  });
};

// ── Helper: notify the business of a new booking ──
const sendBusinessEmail = async (booking) => {
  await transporter.sendMail({
    from: `"LaundryMart System" <${process.env.EMAIL_USER}>`,
    to: process.env.BUSINESS_EMAIL,
    subject: `🆕 New Booking — ${booking.bookingRef}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px;">
        <h2>New Booking Received</h2>
        <p><strong>Ref:</strong> ${booking.bookingRef}</p>
        <p><strong>Name:</strong> ${booking.firstName} ${booking.lastName}</p>
        <p><strong>Email:</strong> ${booking.email}</p>
        <p><strong>Phone:</strong> ${booking.phone}</p>
        <p><strong>Address:</strong> ${booking.address || "Not provided"}</p>
        <p><strong>Service:</strong> ${booking.service}</p>
        <p><strong>Date:</strong> ${booking.date}</p>
        <p><strong>Time:</strong> ${booking.time}</p>
        <p><strong>Notes:</strong> ${booking.notes || "None"}</p>
      </div>
    `,
  });
};

// ── createBooking controller ──
// This is the main function that runs when POST /api/bookings is hit
export const createBooking = async (req, res, next) => {
  try {
    // Check if express-validator found any validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    // Destructure the booking data from the request body
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      service,
      date,
      time,
      notes,
    } = req.body;

    // Save the booking to MongoDB
    const booking = await Booking.create({
      firstName,
      lastName,
      email,
      phone,
      address,
      service,
      date,
      time,
      notes,
    });

    // Send emails — we use Promise.allSettled so that if one
    // email fails, the other still sends and the booking still saves
    await Promise.allSettled([
      sendCustomerEmail(booking),
      sendBusinessEmail(booking),
    ]);

    // Respond with the created booking
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      bookingRef: booking.bookingRef,
      booking,
    });
  } catch (error) {
    // Pass any error to our global error handler middleware
    next(error);
  }
};

// ── getBookings controller ──
// Returns all bookings — useful for an admin dashboard later
export const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    next(error);
  }
};
