
import React from "react";

function UserInfo({ data }) {
  if (!data) return null;

  return (
    <div className="card">
      <h2>User Info</h2>
      <p><b>Username:</b> {data.username}</p>
      <p><b>Skill Score:</b> {data.skillScore}</p>
      <p><b>Proof Hash:</b> {data.proofHash}</p>
    </div>
  );
}

export default UserInfo;
