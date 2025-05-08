// File: src/pages/Signup.jsx
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import LoadingButton from "../components/LoadingButton";
import { AuthContext } from "../contexts/AuthContext";
import "./Signup.css";

export default function Signup() {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await signup({ username, email, password });
      toast.success(
        `Account created! Welcome, ${user.username}! Redirecting…`,
        {
          autoClose: 3000,
        }
      );
      setTimeout(() => {
        navigate(user.is_staff ? "/admin" : "/register", { replace: true });
      }, 1000);
    } catch (err) {
      toast.error("Signup failed: please check your details.", {
        autoClose: 3000,
      });
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <Card className="signup-card">
        <Card.Header>
          <h3>Kariba Camp</h3>
          <p>Create Your Account</p>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="signup-username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                required
                className="form-control-lg"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="signup-email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
                className="form-control-lg"
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="signup-password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
                className="form-control-lg"
              />
            </Form.Group>

            <LoadingButton loading={loading} type="submit">
              Sign Up
            </LoadingButton>
          </Form>

          <div className="text-center mt-3">
            <small>
              Already have an account? <Link to="/login">Login</Link>
            </small>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
