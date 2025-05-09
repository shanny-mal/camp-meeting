// File: src/components/Navbar.jsx

import React, { useContext, useState } from "react";
import {
  Navbar as BsNavbar,
  Nav,
  Container,
  NavDropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Avatar from "./Avatar";
import SearchInput from "./SearchInput";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => setMenuOpen((o) => !o);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
    closeMenu();
  };

  const goTo = (path) => {
    navigate(path);
    closeMenu();
  };

  return (
    <Container fluid className="p-0">
      <BsNavbar
        expand="lg"
        collapseOnSelect
        className="navbar-custom"
        fixed="top"
        variant="dark"
        expanded={menuOpen}
      >
        <Container fluid className="px-2 px-md-3">
          {/* Brand/Logo (non-link) */}
          <Logo className="me-auto me-lg-0 px-2 px-md-3" />

          {/* Hamburger toggler */}
          <BsNavbar.Toggle
            aria-controls="navbar-nav"
            className="custom-toggler"
            onClick={handleToggle}
          />

          {/* Slide‑in menu */}
          <BsNavbar.Collapse
            in={menuOpen}
            id="navbar-nav"
            className="custom-collapse"
          >
            {/* Left links */}
            <Nav className="me-auto">
              {!user && (
                <Nav.Link
                  onClick={() => goTo("/")}
                  className="nav-link-custom px-2 px-md-3 py-3"
                >
                  HOME
                </Nav.Link>
              )}
              <Nav.Link
                onClick={() => goTo("/help")}
                className="nav-link-custom px-2 px-md-3 py-3"
              >
                HELP
              </Nav.Link>
              {!user ? (
                <>
                  <Nav.Link
                    onClick={() => goTo("/login")}
                    className="nav-link-custom px-2 px-md-3 py-3"
                  >
                    LOGIN
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => goTo("/signup")}
                    className="nav-link-custom px-2 px-md-3 py-3"
                  >
                    SIGNUP
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link
                  onClick={() => goTo(user.is_staff ? "/admin" : "/dashboard")}
                  className="nav-link-custom px-2 px-md-3 py-3"
                >
                  DASHBOARD
                </Nav.Link>
              )}
            </Nav>

            {/* Right controls */}
            <Nav className="ms-auto align-items-center">
              <div className="px-2 px-md-3 py-3">
                <SearchInput onSearch={(q) => console.log("search", q)} />
              </div>
              <div className="px-2 px-md-3 py-3">
                <ThemeToggle />
              </div>
              {user && (
                <NavDropdown
                  title={<Avatar username={user.username} />}
                  id="user-menu"
                  align="end"
                  className="px-2 px-md-3 py-3"
                  onSelect={closeMenu}
                >
                  <NavDropdown.Item
                    onClick={() =>
                      goTo(user.is_staff ? "/admin" : "/dashboard")
                    }
                  >
                    Dashboard
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => goTo("/profile")}>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </BsNavbar.Collapse>
        </Container>
      </BsNavbar>
    </Container>
  );
}
