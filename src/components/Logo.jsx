// File: src/components/Logo.jsx

import React from "react";

/**
 * Logo component for the navbar.
 * Renders the Adventist logo and “Kariba Camp” text.
 * Clicks do nothing (stay on current page).
 */
export default function Logo() {
  return (
    <div
      className="navbar-brand d-flex align-items-center p-0"
      style={{ cursor: "default" }}
    >
      <img
        src="/images/adventist-logo.png"
        alt="Adventist Logo"
        height="40"
        className="me-2"
      />
      <span className="fs-4 fw-bold text-white">Kariba Camp</span>
    </div>
  );
}
