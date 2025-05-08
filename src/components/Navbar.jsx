import React, { useContext, useState } from "react";
import { Navbar as BsNavbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Avatar from "./Avatar";
import SearchInput from "./SearchInput";
import ThemeToggle from "./ThemeToggle";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => setMenuOpen((o) => !o);
  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <BsNavbar expand="lg" className="navbar-custom" fixed="top" variant="dark">
      <Container fluid>
        {/* Brand/Logo */}
        <Link to="/" className="navbar-brand brand-logo">
          Kariba Camp
        </Link>

        {/* Hamburger */}
        <BsNavbar.Toggle
          aria-controls="navbar-nav"
          className={`custom-toggler ${menuOpen ? "" : "collapsed"}`}
          onClick={handleToggle}
        />

        {/* Slide-in menu */}
        <BsNavbar.Collapse
          in={menuOpen}
          id="navbar-nav"
          className="custom-collapse"
        >
          {/* Left links */}
          <Nav className="me-auto">
            {!user && (
              <Nav.Link as={Link} to="/" className="nav-link-custom">
                HOME
              </Nav.Link>
            )}
            {!user ? (
              <>
                <Nav.Link as={Link} to="/login" className="nav-link-custom">
                  LOGIN
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" className="nav-link-custom">
                  SIGNUP
                </Nav.Link>
              </>
            ) : (
              <Nav.Link
                as={Link}
                to={user.is_staff ? "/admin" : "/dashboard"}
                className="nav-link-custom"
              >
                DASHBOARD
              </Nav.Link>
            )}
          </Nav>

          {/* Right controls */}
          <Nav className="ms-auto align-items-center">
            <SearchInput onSearch={(q) => console.log("search", q)} />
            <ThemeToggle />
            {user && (
              <Nav.Link
                onClick={handleLogout}
                className="nav-link-custom logout-link"
              >
                <Avatar username={user.username} />
              </Nav.Link>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}
