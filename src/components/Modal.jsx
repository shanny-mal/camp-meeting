// File: src/components/Modal.jsx
import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function GenericModal({
  show,
  title,
  children,
  onClose,
  onSave,
  saveText = "Save",
}) {
  return (
    <Modal show={show} onHide={onClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSave}>
          {saveText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
