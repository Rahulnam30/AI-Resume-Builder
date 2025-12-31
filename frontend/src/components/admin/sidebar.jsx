import React from "react";
import "./sidebar.css";

export default function Sidebar({ setpage }) {
  return (
    <div className="sidebar">
      <h2 className="logo">Resume Builder</h2>

      <button onClick={() => setpage("dashboard")}>Dashboard</button>
      <button onClick={() => setpage("templates")}>Resume Templates</button>
    </div>
  );
}
