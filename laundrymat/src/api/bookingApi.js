// bookingApi.js
// Centralizing all API calls in one place means if the
// backend URL ever changes, we update it here only —
// not scattered across every component.

import axios from "axios";

// Base URL of our Express backend.
// import.meta.env reads from a .env file in the ROOT
// of the project (not the server folder).
// Vite exposes env variables prefixed with VITE_
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Create an axios instance with default config.
// Every request made with this instance automatically
// includes the baseURL and headers below.
const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// ── submitBooking ──
// Sends booking form data to POST /api/bookings
// Returns the response data on success
// Throws an error on failure — caught in the component
export const submitBooking = async (formData) => {
  const response = await api.post("/api/bookings", formData);
  return response.data;
};

// ── getBookings ──
// Fetches all bookings from GET /api/bookings
// Useful for an admin dashboard later
export const getBookings = async () => {
  const response = await api.get("/api/bookings");
  return response.data;
};
