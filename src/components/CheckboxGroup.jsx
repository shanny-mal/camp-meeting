// File: src/components/CheckboxGroup.jsx
import React from "react";

export default function CheckboxGroup({
  label,
  options = [],
  values = [],
  onChange,
}) {
  const toggle = (val) => {
    const newVals = values.includes(val)
      ? values.filter((v) => v !== val)
      : [...values, val];
    onChange(newVals);
  };

  return (
    <div className="mb-3">
      <label className="form-label d-block">{label}</label>
      {options.map((opt) => (
        <div key={opt.value || opt} className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            id={`${opt.value || opt}`}
            checked={values.includes(opt.value || opt)}
            onChange={() => toggle(opt.value || opt)}
          />
          <label className="form-check-label" htmlFor={`${opt.value || opt}`}>
            {opt.label || opt}
          </label>
        </div>
      ))}
    </div>
  );
}
