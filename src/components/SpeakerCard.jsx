import React from "react";
import { Card } from "react-bootstrap";

export default function SpeakerCard({ name, title, imgUrl }) {
  return (
    <Card className="text-center border-0 shadow-sm speaker-card">
      <Card.Img
        variant="top"
        src={imgUrl}
        className="rounded-circle mx-auto mt-3"
        style={{ width: "150px", height: "150px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{title}</Card.Text>
      </Card.Body>
    </Card>
  );
}
