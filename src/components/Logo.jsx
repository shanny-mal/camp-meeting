// File: src/components/Logo.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Logo() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname + location.search;

  const handleClick = (e) => {
    e.preventDefault();
    // Navigate to the *same* path, preserving query string
    navigate(currentPath, { replace: true });
  };

  return (
    <a
      href={currentPath}
      className="navbar-brand"
      style={{ cursor: "pointer" }}
      onClick={handleClick}
    >
      Kariba Camp
    </a>
  );
}
