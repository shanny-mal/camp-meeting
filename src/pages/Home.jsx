import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel, Container, Row, Col } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Home.css";

import { AuthContext } from "../contexts/AuthContext";
import Button from "../components/Button";
import SpeakerCard from "../components/SpeakerCard";

const images = [
  "/images/slider1.jpg",
  "/images/slider2.jpg",
  "/images/slider3.jpg",
  "/images/slider4.jpg",
  "/images/slider5.jpg",
];

const speakers = [
  {
    name: "Pastor John Banda",
    title: "Lead Pastor",
    imgUrl: "/images/DSC_0163.jpg",
  },
  {
    name: "Sister Mary Chirwa",
    title: "Youth Minister",
    imgUrl: "/images/speaker2.jpg",
  },
  {
    name: "Dr. Tendai Mwale",
    title: "Health Evangelist",
    imgUrl: "/images/speaker3.jpg",
  },
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
              className="d-block w-100 vh-100"
              src={img}
              alt={`slide-${idx}`}
              style={{ objectFit: "cover" }}
            />
            <Carousel.Caption>
              <h1 className="typing">Welcome to the Kariba Camp Meeting</h1>
              <p className="fade-in">August 10–16, 2025 | Kariba Venue</p>
              <Button
                variant="light"
                onClick={handleClick}
                className="bounce mt-3"
              >
                Get Started
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Speakers Section */}
      <Container className="py-5">
        <h2 className="text-center mb-4">Speakers</h2>
        <Row>
          {speakers.map((spk, i) => (
            <Col
              key={i}
              md={4}
              className="d-flex align-items-stretch mb-4"
              data-aos="fade-up"
            >
              <SpeakerCard {...spk} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
