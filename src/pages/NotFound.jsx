import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, Row, Col, Form, Button, Container } from "react-bootstrap";
import Lottie from "lottie-react";
import animationData from "../lotties/404.json";
import "./NotFound.css";

export default function NotFound() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <main role="main" className="notfound-hero">
      <div className="notfound-overlay" aria-hidden="true" />
      <Container className="h-100 d-flex align-items-center justify-content-center">
        <Card className="notfound-card">
          <div className="animate-fade-slide-up">
            <Lottie
              animationData={animationData}
              loop
              autoplay
              style={{ maxWidth: 200, margin: "0 auto" }}
              aria-label="Error animation"
            />

            <Card.Body className="text-center">
              <h1 className="display-1 text-primary">404</h1>
              <h2 className="fs-4 text-secondary">Page Not Found</h2>
              <p className="text-muted mb-4">
                Sorry, we can’t find the page you’re looking for.
              </p>

              <Form onSubmit={handleSearchSubmit}>
                <Row className="g-3 mb-4">
                  <Col xs={12} md={6}>
                    <Button
                      as={Link}
                      to="/"
                      variant="primary"
                      size="lg"
                      className="w-100 btn-hover"
                      aria-label="Go to Home"
                    >
                      Go to Home
                    </Button>
                  </Col>
                  <Col xs={12} md={6}>
                    <div className="input-group">
                      <Form.Control
                        type="search"
                        placeholder="Search the site…"
                        aria-label="Search the site"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="form-control-lg"
                      />
                      <Button
                        type="submit"
                        variant="outline-secondary"
                        className="btn-search btn-hover"
                        aria-label="Search"
                      >
                        <i className="bi bi-search"></i>
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </div>
        </Card>
      </Container>
    </main>
  );
}
