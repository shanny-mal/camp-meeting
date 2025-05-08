// File: src/api/registration.js
import API from "./api";

/**
 * Fetches the current user’s registration (if any).
 * Returns the first item or null.
 */
export function getMyRegistration() {
  return API.get("registrations/")
    .then((res) => res.data[0] || null)
    .catch((err) => {
      console.error("getMyRegistration error:", err.response?.data || err);
      throw err;
    });
}

/**
 * Creates a new registration.
 * Throws an Error with validation messages on 400.
 */
export function createRegistration(data) {
  return API.post("registrations/", data)
    .then((res) => res.data)
    .catch((err) => {
      const payload = err.response?.data;
      console.error("createRegistration validation error:", payload);
      // Flatten field errors into a single message
      let message = "Failed to create registration.";
      if (payload && typeof payload === "object") {
        message = Object.values(payload).flat().join(" ");
      }
      throw new Error(message);
    });
}

/**
 * Updates an existing registration.
 * Throws an Error with validation messages on 400.
 */
export function updateRegistration(id, data) {
  return API.put(`registrations/${id}/`, data)
    .then((res) => res.data)
    .catch((err) => {
      const payload = err.response?.data;
      console.error("updateRegistration validation error:", payload);
      let message = "Failed to update registration.";
      if (payload && typeof payload === "object") {
        message = Object.values(payload).flat().join(" ");
      }
      throw new Error(message);
    });
}

/** Admin: get all registrations */
export function getAllRegistrations() {
  return API.get("registrations/")
    .then((res) => res.data)
    .catch((err) => {
      console.error("getAllRegistrations error:", err.response?.data || err);
      throw err;
    });
}

/**
 * Triggers the download of a CSV file of all registrations.
 * Logs and rethrows on error.
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
      throw new Error("Failed to download CSV.");
    });
}

/** Get attendance records for the current user (or all, if admin) */
export function getAttendance() {
  return API.get("attendance/")
    .then((res) => res.data)
    .catch((err) => {
      console.error("getAttendance error:", err.response?.data || err);
      throw err;
    });
}

/**
 * Marks attendance for today.
 * Throws an Error with the backend’s detail message on 400/409.
 */
export function markAttendance(registrationId) {
  return API.post("attendance/", {
    registration: registrationId,
    present: true,
  })
    .then((res) => res.data)
    .catch((err) => {
      const payload = err.response?.data;
      console.error("markAttendance error:", payload);
      // Look for a 'detail' or field‑specific message
      let message = "Failed to record attendance.";
      if (payload) {
        if (payload.detail) {
          message = payload.detail;
        } else if (payload.registration) {
          message = Array.isArray(payload.registration)
            ? payload.registration.join(" ")
            : String(payload.registration);
        }
      }
      throw new Error(message);
    });
}
