// File: src/pages/UserDashboard.jsx

import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Spinner,
  Alert,
  ListGroup,
  Button,
  Container,
} from "react-bootstrap";
import { toast } from "react-toastify";
import * as regApi from "../api/registration"; // ← import your API
import LoadingButton from "../components/LoadingButton";
import { AuthContext } from "../contexts/AuthContext";
import "./UserDashboard.css";

export default function UserDashboard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [registration, setRegistration] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [marking, setMarking] = useState(false);

  // Fetch registration & attendance
  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const reg = await regApi.getMyRegistration();
      if (!reg) {
        // No registration → send to form
        navigate("/register", { replace: true });
        return;
      }
      setRegistration(reg);

      const att = await regApi.getAttendance();
      setAttendance(att);
    } catch {
      setError("Unable to load your data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  // Attendance logic
  const today = new Date().toISOString().split("T")[0];
  const hasMarked = attendance.some((r) => r.date === today && r.present);

  const handleMark = async () => {
    setMarking(true);
    try {
      const newRec = await regApi.markAttendance(registration.id);
      setAttendance((prev) => [...prev, newRec]);
      toast.success(
        `Thank you, ${registration.full_name}! Your attendance is recorded.`,
        { autoClose: 3000 }
      );
    } catch (err) {
      toast.error(err.message || "Failed to record attendance.", {
        autoClose: 3000,
      });
    } finally {
      setMarking(false);
    }
  };

  // Error state
  if (error) {
    return (
      <Container className="user-dashboard-wrapper">
        <Alert variant="danger" className="text-center">
          {error}{" "}
          <Button variant="outline-primary" size="sm" onClick={loadData}>
            Retry
          </Button>
        </Alert>
      </Container>
    );
  }

  // Loading state
  if (loading || !registration) {
    return (
      <Container className="spinner-center user-dashboard-wrapper">
        <Spinner animation="border" role="status" aria-label="Loading" />
      </Container>
    );
  }

  return (
    <Container className="user-dashboard-wrapper">
      <Card className="user-card shadow-sm">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Welcome, {registration.full_name}</h5>
          <Button
            variant="link"
            className="logout-btn"
            onClick={handleLogout}
            aria-label="Logout"
          >
            Logout
          </Button>
        </Card.Header>

        <Card.Body>
          <ListGroup variant="flush" className="details-list">
            <ListGroup.Item>
              <strong>Full Name:</strong> {registration.full_name}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Campsite:</strong> {registration.campsite}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Email:</strong> {registration.email}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Phone:</strong> {registration.phone}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>

        <Card.Footer className="text-center attendance-footer">
          {hasMarked ? (
            <span className="badge bg-success attendance-badge">
              Attendance recorded for today
            </span>
          ) : (
            <LoadingButton
              loading={marking}
              onClick={handleMark}
              variant="primary"
              aria-label="Mark Attendance for Today"
            >
              Mark Attendance for Today
            </LoadingButton>
          )}
        </Card.Footer>
      </Card>
    </Container>
  );
}
