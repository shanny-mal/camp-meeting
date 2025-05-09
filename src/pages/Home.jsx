import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  Container,
  Row,
  Col,
  Card,
  ListGroup,
} from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Home.css";

import { AuthContext } from "../contexts/AuthContext";
import Button from "../components/Button";

const images = [
  "/images/slider1.jpg",
  "/images/slider2.jpg",
  "/images/slider3.jpg",
  "/images/slider4.jpg",
  "/images/slider5.jpg",
];

export default function Home() {
  const { user } = useContext(AuthContext);
  const nav = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleClick = () => {
    if (!user) return nav("/signup");
    return user.is_staff ? nav("/admin") : nav("/register");
  };

  return (
    <>
      {/* Hero Carousel */}
      <Container fluid className="px-0">
        <Carousel
          fade
          controls={false}
          indicators={false}
          interval={5000}
          className="home-carousel"
        >
          {images.map((img, idx) => (
            <Carousel.Item key={idx}>
              <img
                className="d-block w-100 img-fluid"
                src={img}
                alt={`slide-${idx}`}
                style={{ objectFit: "cover" }}
              />
              <Carousel.Caption className="px-2 px-md-5 text-center text-md-start">
                <h1 className="typing display-5 display-md-4 display-lg-3">
                  Welcome to the Kariba Camp Meeting
                </h1>
                <p className="fade-in fs-6 fs-md-5">
                  August 10–16, 2025 | Kariba Venue
                </p>
                <Button
                  variant="light"
                  onClick={handleClick}
                  className="bounce mt-3 btn-lg btn-block btn-md-auto"
                >
                  Get Started
                </Button>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>

      {/* 1. Welcome Remarks */}
      <Container className="px-3 px-md-5 py-4">
        <Card className="shadow-sm rounded home-welcome-card mb-5">
          <Card.Header className="fs-4 fw-bold">Welcome Remarks</Card.Header>
          <Card.Body>
            <p className="mb-3">Dear Beloved Kariba District Family,</p>
            <p className="mb-3">
              Thank you for visiting our Kariba District Camp Online
              Registration Page! I am deeply grateful for your commitment, your
              participation, and your faithful support as we prepare for this
              blessed camp meeting. Your registration is not just a formality —
              it is a step of faith, a sign that you are ready to grow, serve,
              and fellowship together under God’s banner.
            </p>
            <p className="mb-3">
              I warmly encourage you to keep this event lifted in your prayers.
              Pray that every session, every message, every song, and every
              gathering will draw us closer to Christ. I also invite you to go
              beyond yourself — invite a friend, a neighbor, or a visitor to
              join us. Let’s make this camp not only a time of personal revival
              but also a powerful opportunity to share the love of Jesus with
              others.
            </p>
            <p className="mb-3">
              May the Lord bless you richly as we journey toward this camp
              meeting. I look forward to seeing you there, growing together in
              faith and mission!
            </p>
            <p className="mb-3">
              With gratitude and blessings,
              <br />
              <strong>Pastor Ketani</strong>
              <br />
              Kariba District Pastor
            </p>
          </Card.Body>
        </Card>
      </Container>

      {/* 2. 2025 Camp Speakers */}
      <Container className="px-3 px-md-5 py-4 speakers-section">
        <h2 className="text-center mb-4">2025 Camp Speakers</h2>
        <Row>
          {/* Adults Column */}
          <Col xs={12} sm={6} md={6}>
            <h4 className="mt-3">Adults</h4>
            <ListGroup variant="flush">
              <ListGroup.Item className="mb-2 p-3">
                <strong>Conscious Mulube</strong>
                <p className="mb-0 text-muted">(RC)</p>
              </ListGroup.Item>
              <ListGroup.Item className="mb-2 p-3">
                <strong>Enock Chifamba</strong>
                <p className="mb-0 text-muted">(ZEUC)</p>
              </ListGroup.Item>
              <ListGroup.Item className="mb-2 p-3">
                <strong>Ronald Motsi</strong>
                <p className="mb-0 text-muted">(EZC)</p>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          {/* Children Column */}
          <Col xs={12} sm={6} md={6}>
            <h4 className="mt-4">Children</h4>
            <ListGroup variant="flush">
              <ListGroup.Item className="mb-2 p-3">
                <strong>Rumbidzai Amisi</strong>
                <p className="mb-0 text-muted">(0–9)</p>
              </ListGroup.Item>
              <ListGroup.Item className="mb-2 p-3">
                <strong>Tawanda Mavhurere</strong>
                <p className="mb-0 text-muted">(10 +)</p>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
}
