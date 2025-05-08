// File: src/api/registration.js
import API from "./api";

export function getMyRegistration() {
  return API.get("registrations/").then((res) => res.data[0] || null);
}

export function createRegistration(data) {
  return API.post("registrations/", data).then((res) => res.data);
}

export function updateRegistration(id, data) {
  return API.put(`registrations/${id}/`, data).then((res) => res.data);
}

export function getAllRegistrations() {
  return API.get("registrations/").then((res) => res.data);
}

export function downloadCSV() {
  return API.get("registrations/download_csv/", { responseType: "blob" }).then(
    (res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "registrations.csv");
      document.body.appendChild(link);
      link.click();
    }
  );
}

export function getAttendance() {
  return API.get("attendance/").then((res) => res.data);
}

export function markAttendance(registrationId) {
  return API.post("attendance/", {
    registration: registrationId,
    present: true,
  })
    .then((res) => res.data)
    .catch((err) => {
      // Pull the error message from the response if present
      const detail =
        err.response?.data?.detail ||
        err.response?.data?.registration?.[0] ||
        "Failed to record attendance.";
      // Throw a JS Error so caller can catch it
      throw new Error(detail);
    });
}
