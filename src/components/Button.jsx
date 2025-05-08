// File: src/components/Button.jsx
import React from "react";

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
}) {
  return (
    <button type={type} className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}
