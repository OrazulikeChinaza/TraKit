// src/components/ChildList.jsx
import React from "react";
import "./ChildList.css";

const ChildList = ({ children, onSelectChild }) => {
  return (
    <div className="child-list">
      {children.length === 0 && <p>No children found.</p>}
      {children.map((child) => (
        <div
          key={child.id}
          className="child-card"
          onClick={() => onSelectChild(child)}
        >
          <div className="child-avatar">
            {child.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div className="child-info">
            <h4>{child.name}</h4>
            <p>Age: {child.age} years</p>
          </div>
          <div className={`status ${child.status.replace(" ", "-")}`}>
            {child.status.replace("-", " ").toUpperCase()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChildList;
