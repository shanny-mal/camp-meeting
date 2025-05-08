import React, { useState, useEffect } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("darkMode") === "true";
    setDark(stored);
    document.body.classList.toggle("dark-mode", stored);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.body.classList.toggle("dark-mode", next);
    localStorage.setItem("darkMode", next);
  };

  return (
    <OverlayTrigger
      placement="bottom"
      overlay={
        <Tooltip id="theme-tooltip">
          {dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </Tooltip>
      }
    >
      <Button
        variant="link"
        className="theme-toggle-btn rounded-circle ms-3 p-2"
        onClick={toggle}
        aria-label="Toggle theme"
      >
        {dark ? (
          <i className="bi bi-sun-fill"></i>
        ) : (
          <i className="bi bi-moon-fill"></i>
        )}
      </Button>
    </OverlayTrigger>
  );
}
