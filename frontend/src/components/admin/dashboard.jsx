import React from "react";
import "./dashboard.css";

export default function Dashboard() {
  return (
    <div>
      <h2>Welcome back, Admin!</h2>
      <div className="stats">
        <div className="card">Total Users<br /><b>12,450</b></div>
        <div className="card">Resumes Created<br /><b>8,320</b></div>
        <div className="card">Monthly Revenue<br /><b>$15,780</b></div>
        <div className="card">Active Subscriptions<br /><b>3,210</b></div>
      </div>
    </div>
  );
}
