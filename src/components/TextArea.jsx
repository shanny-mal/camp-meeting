// File: src/components/TextArea.jsx
import React from "react";

export default function TextArea({
  label,
  id,
  value,
  onChange,
  required = false,
}) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <textarea
        className="form-control"
        id={id}
        rows="3"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </div>
  );
}
