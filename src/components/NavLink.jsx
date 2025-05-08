import React from "react";
import { NavLink } from "react-router-dom";

export default function CustomNavLink({ to, children, ...props }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "nav-link nav-link-custom active"
          : "nav-link nav-link-custom"
      }
      {...props}
    >
      {children}
    </NavLink>
  );
}
