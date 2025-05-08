// File: src/pages/RegistrationForm.jsx
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Row, Col, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import * as regApi from "../api/registration";
import { AuthContext } from "../contexts/AuthContext";
import LoadingButton from "../components/LoadingButton";
import "./RegistrationForm.css";

const campsiteOptions = [
  { value: "Gache Gache", label: "Gache Gache" },
  { value: "Lakeview", label: "Lakeview" },
  { value: "Prison Ministries", label: "Prison Ministries" },
];
const bookOptions = [
  { value: "Family Life", label: "Family Life" },
  { value: "Ellen G. White Books", label: "Ellen G. White Books" },
  { value: "Children Ministries", label: "Children Ministries" },
  { value: "Bibles", label: "Bibles" },
  { value: "Hymn Books", label: "Hymn Books" },
  { value: "Uniforms", label: "Uniforms" },
  { value: "Health", label: "Health" },
];
const tshirtSizes = ["S", "M", "L", "XL", "XXL"];

export default function RegistrationForm() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    campsite: "",
    abc_books: [],
    phone: "",
    email: "",
    church: "",
    emergency_name: "",
    emergency_phone: "",
    visitors: 0,
    contributed_goal: false,
    lesson_materials: false,
    lesson_language: "",
    child_age_group: "",
    accommodation: false,
    transport: false,
    activities: "",
    dietary: "",
    bread_loaves: 0,
    tshirt_size: "",
    payment_method: "",
    comments: "",
  });
  const [errors, setErrors] = useState({});
  const [networkError, setNetworkError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [existingId, setExistingId] = useState(null);

  // Load existing registration
  useEffect(() => {
    regApi
      .getMyRegistration()
      .then((data) => {
        if (data) {
          setForm(data);
          setExistingId(data.id);
        }
      })
      .catch(() => {
        /* ignore */
      });
  }, []);

  const handleChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setNetworkError("");
    try {
      const action = existingId
        ? regApi.updateRegistration(existingId, form)
        : regApi.createRegistration(form);
      await action;
      toast.success(
        `Thank you for registering, ${form.full_name}! We’ve saved your info.`,
        { autoClose: 3000 }
      );
      navigate("/dashboard", { replace: true });
    } catch (err) {
      // Validation errors from backend
      if (err.response?.data) {
        setErrors(err.response.data);
      } else {
        setNetworkError("Registration failed. Please try again later.");
      }
      toast.error("Registration failed: please try again.", {
        autoClose: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <div className="registration-page">
      <Card className="registration-card">
        <Card.Header>
          <Form.Text as="h2" className="fs-3 fw-bold">
            Camp Registration
          </Form.Text>
          <Card.Subtitle className="fs-6 text-secondary">
            Welcome Remarks
          </Card.Subtitle>
        </Card.Header>
        <Card.Body>
          {networkError && <Alert variant="danger">{networkError}</Alert>}

          <Form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <Card.Subtitle className="fs-5 mt-4 mb-3">
              Personal Information
            </Card.Subtitle>
            <Row>
              <Col md={6}>
                <Form.Group controlId="full_name">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={form.full_name}
                    onChange={(e) => handleChange("full_name", e.target.value)}
                    disabled={submitting}
                    isInvalid={!!errors.full_name}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.full_name?.[0]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="campsite">
                  <Form.Label>Campsite</Form.Label>
                  <Form.Select
                    value={form.campsite}
                    onChange={(e) => handleChange("campsite", e.target.value)}
                    disabled={submitting}
                    isInvalid={!!errors.campsite}
                    required
                  >
                    <option value="">Select campsite</option>
                    {campsiteOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.campsite?.[0]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {/* ABC Books */}
            <Card.Subtitle className="fs-5 mt-4 mb-3">
              ABC Books (optional)
            </Card.Subtitle>
            <Form.Group controlId="abc_books" className="mb-3">
              <div>
                {bookOptions.map((o) => (
                  <Form.Check
                    inline
                    key={o.value}
                    label={o.label}
                    id={`abc_${o.value}`}
                    type="checkbox"
                    value={o.value}
                    checked={form.abc_books.includes(o.value)}
                    onChange={(e) => {
                      const val = e.target.value;
                      handleChange(
                        "abc_books",
                        form.abc_books.includes(val)
                          ? form.abc_books.filter((x) => x !== val)
                          : [...form.abc_books, val]
                      );
                    }}
                    disabled={submitting}
                  />
                ))}
              </div>
              {errors.abc_books && (
                <div className="invalid-feedback d-block">
                  {errors.abc_books[0]}
                </div>
              )}
            </Form.Group>

            {/* Contact Info */}
            <Card.Subtitle className="fs-5 mt-4 mb-3">
              Contact Information
            </Card.Subtitle>
            <Row>
              <Col md={6}>
                <Form.Group controlId="phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    disabled={submitting}
                    isInvalid={!!errors.phone}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone?.[0]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    disabled={submitting}
                    isInvalid={!!errors.email}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.[0]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {/* Emergency & Church */}
            <Row>
              <Col md={6}>
                <Form.Group controlId="church">
                  <Form.Label>Church Affiliation</Form.Label>
                  <Form.Control
                    type="text"
                    value={form.church}
                    onChange={(e) => handleChange("church", e.target.value)}
                    disabled={submitting}
                    isInvalid={!!errors.church}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.church?.[0]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="emergency_name">
                  <Form.Label>Emergency Contact Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={form.emergency_name}
                    onChange={(e) =>
                      handleChange("emergency_name", e.target.value)
                    }
                    disabled={submitting}
                    isInvalid={!!errors.emergency_name}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.emergency_name?.[0]}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="emergency_phone" className="mt-3">
                  <Form.Label>Emergency Contact Phone</Form.Label>
                  <Form.Control
                    type="text"
                    value={form.emergency_phone}
                    onChange={(e) =>
                      handleChange("emergency_phone", e.target.value)
                    }
                    disabled={submitting}
                    isInvalid={!!errors.emergency_phone}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.emergency_phone?.[0]}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {/* Participation & Special Needs */}
            <Row>
              <Col md={6}>
                <Card.Subtitle className="fs-5 mt-4 mb-3">
                  Participation Details
                </Card.Subtitle>
                <Form.Group controlId="visitors" className="mb-3">
                  <Form.Label>Visitors</Form.Label>
                  <Form.Control
                    type="number"
                    value={form.visitors}
                    onChange={(e) => handleChange("visitors", +e.target.value)}
                    disabled={submitting}
                  />
                </Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Contributed Toward Goal"
                  checked={form.contributed_goal}
                  onChange={(e) =>
                    handleChange("contributed_goal", e.target.checked)
                  }
                  disabled={submitting}
                />
                {/* Additional participation fields… */}
              </Col>
              <Col md={6}>
                <Card.Subtitle className="fs-5 mt-4 mb-3">
                  Special Needs & Supplies
                </Card.Subtitle>
                <Form.Group controlId="dietary" className="mb-3">
                  <Form.Label>Dietary Requirements</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={form.dietary}
                    onChange={(e) => handleChange("dietary", e.target.value)}
                    disabled={submitting}
                  />
                </Form.Group>
                <Form.Group controlId="tshirt_size">
                  <Form.Label>T-Shirt Size</Form.Label>
                  <Form.Select
                    value={form.tshirt_size}
                    onChange={(e) =>
                      handleChange("tshirt_size", e.target.value)
                    }
                    disabled={submitting}
                  >
                    <option value="">Select size</option>
                    {tshirtSizes.map((sz) => (
                      <option key={sz} value={sz}>
                        {sz}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {/* Other Information */}
            <Card.Subtitle className="fs-5 mt-4 mb-3">
              Other Information
            </Card.Subtitle>
            <Form.Group controlId="comments" className="mb-3">
              <Form.Label>Comments / Special Requests</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={form.comments}
                onChange={(e) => handleChange("comments", e.target.value)}
                disabled={submitting}
              />
            </Form.Group>

            <LoadingButton loading={submitting} type="submit" className="mt-3">
              {existingId ? "Update Registration" : "Submit Registration"}
            </LoadingButton>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
