// File: src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import LoadingButton from "../components/LoadingButton";
import { AuthContext } from "../contexts/AuthContext";
import "./Login.css";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login({ username, password });
      toast.success(`Welcome back, ${user.username}! Redirecting…`, {
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate(user.is_staff ? "/admin" : "/register", { replace: true });
      }, 1000);
    } catch {
      toast.error("Login failed: please check your username and password.", {
        autoClose: 3000,
      });
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Card className="login-card">
        <Card.Header>
          <h3>Kariba Camp</h3>
          <p>Welcome Back</p>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
            </Form.Group>

            <LoadingButton loading={loading} type="submit">
              Login
            </LoadingButton>
          </Form>

          <div className="text-center mt-3">
            <small>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </small>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
