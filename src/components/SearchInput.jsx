import React, { useState, useRef, useEffect } from "react";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";

export default function SearchInput({ onSearch }) {
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (expanded) inputRef.current?.focus();
  }, [expanded]);

  return (
    <div className="search-input-wrapper">
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id="search-tooltip">Search</Tooltip>}
      >
        <button
          className="search-icon-button"
          onClick={() => setExpanded((e) => !e)}
          aria-label="Search"
        >
          <i className="bi bi-search"></i>
        </button>
      </OverlayTrigger>

      <Form.Control
        ref={inputRef}
        type="search"
        placeholder="Search..."
        className={`search-input ${expanded ? "expanded" : ""}`}
        onBlur={() => setExpanded(false)}
        onChange={(e) => onSearch && onSearch(e.target.value)}
      />
    </div>
  );
}
