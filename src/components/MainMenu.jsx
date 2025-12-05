import React from "react";
import "./MainMenu.css";

const MainMenu = ({ onRegister, onAccess, onLogout }) => {
  return (
    <div className="main-menu-container">
      <div className="main-menu-card">
        {/* Header with friendly icon */}
        <div className="menu-header">
          <div className="logo-icon">🩺</div>
          <h1>TraKit PHC</h1>
          <p>Welcome, Admin! What would you like to do?</p>
        </div>

        {/* Two main action buttons */}
        <div className="menu-actions">
          <button className="menu-btn register-btn" onClick={onRegister}>
            <span className="btn-icon">👶</span>
            <span className="btn-text">Register New Child</span>
          </button>

          <button className="menu-btn access-btn" onClick={onAccess}>
            <span className="btn-icon">📋</span>
            <span className="btn-text">View Child Dashboard</span>
          </button>
        </div>

        {/* Logout option */}
        <div className="menu-footer">
          <button
            className="logout-btn"
            onClick={onLogout} // ✅ Uses onLogout prop instead of reload
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
