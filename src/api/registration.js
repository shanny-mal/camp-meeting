// File: src/api/registration.js

import API from "./api";

/**
 * Turn DRF’s validation error object into a single string.
 * e.g. { field: ["Required."], non_field_errors: ["Oops"] }
 *      → "Required. Oops"
 */
function flattenErrors(payload, defaultMsg) {
  if (payload && typeof payload === "object") {
    const msgs = Object.values(payload).flat().map(String);
    if (msgs.length) return msgs.join(" ");
  }
  return defaultMsg;
}

/**
 * GET /api/registrations/
 * Returns first registration or null.
 */
export function getMyRegistration() {
  return API.get("registrations/")
    .then((res) => res.data[0] || null)
    .catch((err) => {
      console.error("getMyRegistration error:", err.response?.data || err);
      throw new Error("Could not load your registration.");
    });
}

/**
 * POST /api/registrations/
 * Creates registration or throws with DRF errors.
 */
export function createRegistration(data) {
  return API.post("registrations/", data)
    .then((res) => res.data)
    .catch((err) => {
      const payload = err.response?.data;
      console.error("createRegistration validation error:", payload || err);
      const msg = flattenErrors(payload, "Failed to create registration.");
      throw new Error(msg);
    });
}

/**
 * PUT /api/registrations/{id}/
 * Updates registration or throws with DRF errors.
 */
export function updateRegistration(id, data) {
  return API.put(`registrations/${id}/`, data)
    .then((res) => res.data)
    .catch((err) => {
      const payload = err.response?.data;
      console.error("updateRegistration validation error:", payload || err);
      const msg = flattenErrors(payload, "Failed to update registration.");
      throw new Error(msg);
    });
}

/**
 * GET /api/registrations/
 * (admin) fetch all.
 */
export function getAllRegistrations() {
  return API.get("registrations/")
    .then((res) => res.data)
    .catch((err) => {
      console.error("getAllRegistrations error:", err.response?.data || err);
      throw new Error("Could not fetch registrations.");
    });
}

/**
 * GET /api/registrations/download_csv/
 * Triggers CSV download.
 */
export function downloadCSV() {
  return API.get("registrations/download_csv/", { responseType: "blob" })
    .then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "registrations.csv");
      document.body.appendChild(link);
      link.click();
    })
    .catch((err) => {
      console.error("downloadCSV error:", err.response?.data || err);
      throw new Error("Failed to download registrations CSV.");
    });
}

/**
 * GET /api/attendance/
 * Fetch attendance records.
 */
export function getAttendance() {
  return API.get("attendance/")
    .then((res) => res.data)
    .catch((err) => {
      console.error("getAttendance error:", err.response?.data || err);
      throw new Error("Could not load attendance records.");
    });
}

/**
 * POST /api/attendance/
 * Mark attendance for today.
 */
export function markAttendance(registrationId) {
  return API.post("attendance/", {
    registration: registrationId,
    present: true,
  })
    .then((res) => res.data)
    .catch((err) => {
      const payload = err.response?.data;
      console.error("markAttendance error:", payload || err);
      let message = "Failed to record attendance.";
      if (payload) {
        // DRF “detail” or field‑level list
        message = payload.detail || flattenErrors(payload, message);
      }
      throw new Error(message);
    });
}
