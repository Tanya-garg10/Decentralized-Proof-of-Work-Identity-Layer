import React from "react";

function Badges({ badges }) {
  if (!badges) return null;

  return (
    <div className="card">
      <h2>Badges</h2>
      <div style={{ display: "flex", gap: "10px" }}>
        {badges.map((b, i) => (
          <div key={i} className="badge">
            {b.icon} {b.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Badges;