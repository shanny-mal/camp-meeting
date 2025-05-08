// File: src/components/Input.jsx
import React from "react";

export default function Input({
  label,
  id,
  type = "text",
  value,
  onChange,
  required = false,
}) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type={type}
        className="form-control"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </div>
  );
}
