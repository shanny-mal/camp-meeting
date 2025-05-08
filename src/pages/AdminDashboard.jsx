import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  Row,
  Col,
  Table,
  Form,
  Button,
  Pagination,
} from "react-bootstrap";
import { toast } from "react-toastify";
import * as regApi from "../api/registration";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  // State
  const [regs, setRegs] = useState([]);
  const [filters, setFilters] = useState({ campsite: "", tshirt_size: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const pageSize = 10;

  // Load data
  useEffect(() => {
    regApi
      .getAllRegistrations()
      .then((data) => setRegs(data))
      .catch(() => toast.error("Failed to fetch registrations"));
  }, []);

  // Filtered + searched data
  const filtered = useMemo(() => {
    return regs.filter(
      (r) =>
        (!filters.campsite || r.campsite === filters.campsite) &&
        (!filters.tshirt_size || r.tshirt_size === filters.tshirt_size) &&
        (r.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [regs, filters, searchTerm]);

  // Pagination
  const pageCount = Math.ceil(filtered.length / pageSize);
  const paginated = useMemo(() => {
    const start = page * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  // Handlers
  const handleFilterChange = (field, value) => {
    setFilters((f) => ({ ...f, [field]: value }));
    setPage(0);
    toast.info("Filters applied", { autoClose: 2000 });
  };

  const resetFilters = () => {
    setFilters({ campsite: "", tshirt_size: "" });
    setSearchTerm("");
    setPage(0);
    toast.success("Filters reset!", { autoClose: 2000 });
  };

  const handleDownload = () => {
    regApi
      .downloadCSV()
      .then(() => toast.success("CSV downloaded!", { autoClose: 2000 }))
      .catch(() => toast.error("Failed to download CSV"));
  };

  const handleMarkAttendance = (regId, name) => {
    regApi
      .markAttendance(regId)
      .then(() =>
        toast.success(`Attendance marked for ${name}`, { autoClose: 2000 })
      )
      .catch(() => toast.error("Failed to mark attendance"));
  };

  return (
    <Card className="admin-card my-5 mx-3">
      <Card.Header className="d-flex align-items-center justify-content-between">
        <h4 className="mb-0">Admin Dashboard</h4>
        <Button variant="warning" onClick={handleDownload}>
          <i className="bi bi-download me-1" /> Download CSV
        </Button>
      </Card.Header>

      <Card.Body>
        {/* Filters */}
        <Row className="g-3 mb-4">
          <Col md={3}>
            <Form.Select
              size="lg"
              value={filters.campsite}
              onChange={(e) => handleFilterChange("campsite", e.target.value)}
            >
              <option value="">All campsites</option>
              <option>Gache Gache</option>
              <option>Lakeview</option>
              <option>Prison Ministries</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select
              size="lg"
              value={filters.tshirt_size}
              onChange={(e) =>
                handleFilterChange("tshirt_size", e.target.value)
              }
            >
              <option value="">All sizes</option>
              {["S", "M", "L", "XL", "XXL"].map((sz) => (
                <option key={sz} value={sz}>
                  {sz}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Control
              size="lg"
              type="search"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(0);
              }}
            />
          </Col>
          <Col md={2} className="d-flex align-items-center">
            <Button variant="link" onClick={resetFilters}>
              Reset Filters
            </Button>
          </Col>
        </Row>

        {/* Table */}
        <div className="table-responsive mb-4">
          <Table striped hover className="mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Campsite</th>
                <th>Email</th>
                <th>T-Shirt</th>
                <th>Visitors</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((r) => (
                <tr key={r.id}>
                  <td>{r.full_name}</td>
                  <td>{r.campsite}</td>
                  <td>{r.email}</td>
                  <td>{r.tshirt_size}</td>
                  <td>{r.visitors}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => handleMarkAttendance(r.id, r.full_name)}
                    >
                      Mark Attendance
                    </Button>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    No registrations found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {/* Pagination */}
        {pageCount > 1 && (
          <Pagination className="justify-content-center">
            <Pagination.Prev
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              disabled={page === 0}
            />
            {[...Array(pageCount)].map((_, i) => (
              <Pagination.Item
                key={i}
                active={i === page}
                onClick={() => setPage(i)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => setPage((p) => Math.min(p + 1, pageCount - 1))}
              disabled={page === pageCount - 1}
            />
          </Pagination>
        )}
      </Card.Body>
    </Card>
  );
}
