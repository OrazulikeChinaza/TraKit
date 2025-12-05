import React, { useState } from "react";

export default function ChildAccessPrompt({ onAccess, onCancel }) {
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code) return alert("Enter a unique code");
    onAccess(code);
  };

  return (
    <div className="container">
      <h2>Access Child Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter Unique Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="submit">Enter</button>
      </form>
      <button
        onClick={onCancel}
        style={{ marginTop: "1rem", backgroundColor: "#eee", color: "#666" }}
      >
        Back
      </button>
    </div>
  );
}
