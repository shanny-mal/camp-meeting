import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function Avatar({ username, imgUrl, size = 40 }) {
  // Generate initials if no image
  const initials = username
    .split(" ")
    .map((n) => n[0].toUpperCase())
    .slice(0, 2)
    .join("");

  const style = { width: size, height: size };

  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id="avatar-tooltip">Logout</Tooltip>}
    >
      {imgUrl ? (
        <img src={imgUrl} alt={username} className="avatar" style={style} />
      ) : (
        <div className="avatar" style={style}>
          {initials}
        </div>
      )}
    </OverlayTrigger>
  );
}
