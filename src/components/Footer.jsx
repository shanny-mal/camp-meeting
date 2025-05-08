import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-custom">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <span>Kariba Camp Meeting • August 10–16, 2025</span>
        <span>
          Contact: <a href="mailto:info@campkariba.org">info@campkariba.org</a>
        </span>
      </div>
    </footer>
  );
}
