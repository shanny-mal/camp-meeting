import React from "react";
import { Container, Card, Accordion, ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function HelpPage() {
  return (
    <Container className="px-3 px-md-5 py-5">
      <Card className="shadow-sm rounded mb-4">
        <Card.Header>
          <h4 className="mb-0">Pastor Ketani’s Welcome Letter</h4>
        </Card.Header>
        <Card.Body>
          <p>Dear Kariba District Members,</p>
          <p>Warm Christian greetings to you all!</p>
          <p>
            We are excited to inform you that online registration for the
            upcoming August Camp Meeting is now open. This year ... well in
            advance.
          </p>
          {/* full letter */}
          <p>
            …Blessings,
            <br />
            <strong>Pastor Ketani</strong>
          </p>
        </Card.Body>
      </Card>

      <h4 className="mb-3">Step‑by‑Step Guide</h4>
      <Accordion defaultActiveKey="0" className="mb-4">
        <Accordion.Item eventKey="0">
          <Accordion.Header>1. Sign Up & Login</Accordion.Header>
          <Accordion.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>Create an account via Signup page</ListGroup.Item>
              <ListGroup.Item>Confirm email (if applicable)</ListGroup.Item>
              <ListGroup.Item>Login to proceed</ListGroup.Item>
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>2. Fill Registration Form</Accordion.Header>
          <Accordion.Body>
            Detailed explanation of each field: personal info, participation
            details, special needs, etc.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>3. User & Admin Dashboards</Accordion.Header>
          <Accordion.Body>
            Regular users see their registration & attendance. Admins can view
            all, filter, mark attendance, download CSV.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>4. Attendance & Reporting</Accordion.Header>
          <Accordion.Body>
            Mark daily attendance, generate CSV/PDF for committee planning,
            track by campsite or special requests.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <div className="text-center">
        <Button as={Link} to="/" variant="secondary">
          Back to Home
        </Button>
      </div>
    </Container>
  );
}
