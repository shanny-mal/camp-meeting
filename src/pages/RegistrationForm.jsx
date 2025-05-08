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
const lessonLanguages = ["Shona", "English"];
const ageGroups = ["0–5", "6–9", "10–12", "13+"];

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
  const [networkError, setNetworkError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [existingId, setExistingId] = useState(null);

  // Load existing registration if any
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
        /* ignore load errors */
      });
  }, []);

  const handleChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
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
      const msg = err.message || "Registration failed. Please try again.";
      setNetworkError(msg);
      toast.error(msg, { autoClose: 3000 });
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <div className="registration-page py-5 d-flex justify-content-center">
      <Card
        className="registration-card shadow-sm rounded"
        style={{ maxWidth: 700, width: "100%" }}
      >
        <Card.Header className="bg-white">
          <h2 className="fs-3 fw-bold mb-1">Camp Registration</h2>
          <p className="fs-6 text-secondary mb-0">Welcome Remarks</p>
        </Card.Header>
        <Card.Body>
          {networkError && <Alert variant="danger">{networkError}</Alert>}

          <Form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <h5 className="fs-5 mt-4 mb-3">Personal Information</h5>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group controlId="full_name">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={form.full_name}
                    onChange={(e) => handleChange("full_name", e.target.value)}
                    disabled={submitting}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="campsite">
                  <Form.Label>Campsite</Form.Label>
                  <Form.Select
                    value={form.campsite}
                    onChange={(e) => handleChange("campsite", e.target.value)}
                    disabled={submitting}
                    required
                  >
                    <option value="">Select campsite</option>
                    {campsiteOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Label className="mt-3">ABC Books (optional)</Form.Label>
                <div>
                  {bookOptions.map((o) => (
                    <Form.Check
                      inline
                      key={o.value}
                      label={o.label}
                      type="checkbox"
                      checked={form.abc_books.includes(o.value)}
                      onChange={() => {
                        const arr = form.abc_books.includes(o.value)
                          ? form.abc_books.filter((x) => x !== o.value)
                          : [...form.abc_books, o.value];
                        handleChange("abc_books", arr);
                      }}
                      disabled={submitting}
                    />
                  ))}
                </div>
              </Col>
            </Row>

            {/* Contact & Emergency */}
            <h5 className="fs-5 mt-4 mb-3">Contact & Emergency</h5>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group controlId="phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    disabled={submitting}
                    required
                  />
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
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="church">
                  <Form.Label>Church Affiliation</Form.Label>
                  <Form.Control
                    type="text"
                    value={form.church}
                    onChange={(e) => handleChange("church", e.target.value)}
                    disabled={submitting}
                    required
                  />
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
                    required
                  />
                </Form.Group>
                <Form.Group controlId="emergency_phone" className="mt-2">
                  <Form.Label>Emergency Contact Phone</Form.Label>
                  <Form.Control
                    type="text"
                    value={form.emergency_phone}
                    onChange={(e) =>
                      handleChange("emergency_phone", e.target.value)
                    }
                    disabled={submitting}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Participation Details */}
            <h5 className="fs-5 mt-4 mb-3">Camp Participation</h5>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group controlId="visitors">
                  <Form.Label>Bringing Visitors?</Form.Label>
                  <Form.Control
                    type="number"
                    value={form.visitors}
                    onChange={(e) => handleChange("visitors", +e.target.value)}
                    disabled={submitting}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Check
                  type="checkbox"
                  label="Contributed Toward Goal"
                  checked={form.contributed_goal}
                  onChange={(e) =>
                    handleChange("contributed_goal", e.target.checked)
                  }
                  disabled={submitting}
                />
                <Form.Check
                  type="checkbox"
                  label="Need Lesson Materials"
                  checked={form.lesson_materials}
                  onChange={(e) =>
                    handleChange("lesson_materials", e.target.checked)
                  }
                  disabled={submitting}
                  className="mt-2"
                />
                {form.lesson_materials && (
                  <>
                    <Form.Select
                      className="mt-2"
                      value={form.lesson_language}
                      onChange={(e) =>
                        handleChange("lesson_language", e.target.value)
                      }
                      disabled={submitting}
                    >
                      <option value="">Language</option>
                      {lessonLanguages.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Select
                      className="mt-2"
                      value={form.child_age_group}
                      onChange={(e) =>
                        handleChange("child_age_group", e.target.value)
                      }
                      disabled={submitting}
                    >
                      <option value="">Age Group (if child)</option>
                      {ageGroups.map((ag) => (
                        <option key={ag} value={ag}>
                          {ag}
                        </option>
                      ))}
                    </Form.Select>
                  </>
                )}
              </Col>
              <Col md={6}>
                <Form.Check
                  type="checkbox"
                  label="Need Accommodation"
                  checked={form.accommodation}
                  onChange={(e) =>
                    handleChange("accommodation", e.target.checked)
                  }
                  disabled={submitting}
                />
                <Form.Check
                  type="checkbox"
                  label="Need Transport"
                  checked={form.transport}
                  onChange={(e) => handleChange("transport", e.target.checked)}
                  disabled={submitting}
                  className="mt-2"
                />
                <Form.Group controlId="activities" className="mt-2">
                  <Form.Label>Activities to Participate</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={form.activities}
                    onChange={(e) => handleChange("activities", e.target.value)}
                    disabled={submitting}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Special Needs & Supplies */}
            <h5 className="fs-5 mt-4 mb-3">Special Needs & Supplies</h5>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group controlId="dietary">
                  <Form.Label>Dietary Requirements</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={form.dietary}
                    onChange={(e) => handleChange("dietary", e.target.value)}
                    disabled={submitting}
                  />
                </Form.Group>
                <Form.Group controlId="bread_loaves" className="mt-2">
                  <Form.Label>Bread Loaves per Day</Form.Label>
                  <Form.Control
                    type="number"
                    value={form.bread_loaves}
                    onChange={(e) =>
                      handleChange("bread_loaves", +e.target.value)
                    }
                    disabled={submitting}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="tshirt_size">
                  <Form.Label>Buy Camp T‑shirt?</Form.Label>
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
            <h5 className="fs-5 mt-4 mb-3">Other Information</h5>
            <Form.Group controlId="payment_method" className="mb-3">
              <Form.Label>Payment Method</Form.Label>
              <Form.Control
                type="text"
                value={form.payment_method}
                onChange={(e) => handleChange("payment_method", e.target.value)}
                disabled={submitting}
              />
            </Form.Group>
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

            <div className="text-center">
              <LoadingButton loading={submitting} type="submit">
                {existingId ? "Update Registration" : "Submit Registration"}
              </LoadingButton>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
