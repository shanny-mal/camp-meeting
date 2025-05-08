// File: src/pages/UserDashboard.jsx
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Spinner, Alert, ListGroup, Button } from "react-bootstrap";
import { toast } from "react-toastify";
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
        navigate("/register", { replace: true });
        return;
      }
      setRegistration(reg);

      const att = await regApi.getAttendance();
      setAttendance(att);
    } catch {
      setError("Unable to load your registration. Please refresh.");
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
        `Thank you, ${registration.full_name}! Your attendance for today is recorded.`,
        { autoClose: 3000 }
      );
    } catch {
      toast.error("Failed to record attendance. Please try again.", {
        autoClose: 3000,
      });
    } finally {
      setMarking(false);
    }
  };

  // Retry on error
  if (error) {
    return (
      <div className="spinner-center">
        <Alert variant="danger">
          {error}{" "}
          <Button variant="outline-primary" size="sm" onClick={loadData}>
            Retry
          </Button>
        </Alert>
      </div>
    );
  }

  // Loading state
  if (loading || !registration) {
    return (
      <div className="spinner-center">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  return (
    <Card className="user-card">
      <Card.Header>
        <h5>Welcome, {registration.full_name}</h5>
        <Button variant="link" className="text-white" onClick={handleLogout}>
          Logout
        </Button>
      </Card.Header>

      <Card.Body>
        <dl className="details-list">
          <dt>Full Name</dt>
          <dd>{registration.full_name}</dd>

          <dt>Campsite</dt>
          <dd>{registration.campsite}</dd>

          <dt>Email</dt>
          <dd>{registration.email}</dd>

          <dt>Phone</dt>
          <dd>{registration.phone}</dd>
        </dl>
      </Card.Body>

      <div className="attendance-footer">
        {hasMarked ? (
          <span className="badge bg-success">
            Attendance recorded for today
          </span>
        ) : (
          <LoadingButton
            loading={marking}
            onClick={handleMark}
            variant="primary"
          >
            Mark Attendance for Today
          </LoadingButton>
        )}
      </div>
    </Card>
  );
}
