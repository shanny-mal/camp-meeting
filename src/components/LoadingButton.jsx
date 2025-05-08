// File: src/components/LoadingButton.jsx
import React from "react";
import { Button, Spinner } from "react-bootstrap";

export default function LoadingButton({
  loading,
  children,
  variant = "primary",
  ...props
}) {
  return (
    <Button variant={variant} disabled={loading} {...props}>
      {loading && (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
          className="me-2"
        />
      )}
      {loading ? "Logging in…" : children}
    </Button>
  );
}
