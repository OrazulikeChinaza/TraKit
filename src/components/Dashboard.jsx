// src/components/Dashboard.jsx
import React, { useState, useEffect } from "react";
import ChildList from "./ChildList";
import ChildProfile from "./ChildProfile";
import sampleChildren from "../data/sampleChildren";
import sampleVaccinations from "../data/sampleVaccinations";
import VACCINE_SCHEDULE from "../data/nigeriaVaccines";
import "./Dashboard.css";

const Dashboard = ({ onLogout }) => {
  const [children] = useState(sampleChildren);
  const [selectedChild, setSelectedChild] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState("overview"); // 'overview', 'register', 'reports'

  // Enhanced stats calculation
  const totalChildren = children.length;
  const totalAdministered = sampleVaccinations.filter(
    (v) => v.status === "complete"
  ).length;
  const totalMissed = sampleVaccinations.filter(
    (v) => v.status === "missed"
  ).length;
  const totalDueSoon = children.filter((c) => c.status === "due-soon").length;
  const totalOverdue = children.filter((c) => c.status === "overdue").length;
  const coverageRate =
    totalChildren > 0
      ? Math.round(
          (totalAdministered / (totalChildren * NIGERIA_VACCINES.length)) * 100
        )
      : 0; // Using total vaccines count from schedule

  // PHC-specific notifications
  useEffect(() => {
    const urgentNotifications = [
      ...children
        .filter((c) => c.status === "overdue")
        .slice(0, 2)
        .map((c) => ({
          type: "overdue",
          child: c.name,
          vaccine: c.nextVaccine,
        })),
      ...children
        .filter((c) => c.status === "due-soon")
        .slice(0, 3)
        .map((c) => ({
          type: "due-soon",
          child: c.name,
          vaccine: c.nextVaccine,
        })),
    ];
    setNotifications(urgentNotifications);
  }, [children]);

  const filteredChildren = children.filter((child) =>
    child.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="phc-dashboard">
      {/* Header */}
      <header className="phc-header">
        <div className="phc-info">
          <h1>🏥 TraKit - PHC Vaccination Management</h1>
          <div className="phc-meta">
            <span>📍 Your PHC Location</span>
            <span>👤 Health Worker Dashboard</span>
          </div>
        </div>

        <div className="header-actions">
          <div className="notification-bell">
            <button className="bell-btn" title="PHC Alerts">
              🔔
              {notifications.length > 0 && (
                <span
                  className={`notification-badge ${
                    notifications.filter((n) => n.type === "overdue").length > 0
                      ? "urgent"
                      : ""
                  }`}
                >
                  {notifications.length}
                </span>
              )}
            </button>
            {notifications.length > 0 && (
              <div className="notification-dropdown">
                <div className="notification-header">
                  <h4>🚨 PHC Alerts</h4>
                  <span className="alert-count">
                    {notifications.filter((n) => n.type === "overdue").length}{" "}
                    Overdue
                  </span>
                </div>
                {notifications.map((notif, idx) => (
                  <div key={idx} className={`notification-item ${notif.type}`}>
                    <span className={`status-dot ${notif.type}`}></span>
                    <div>
                      <strong>{notif.child}</strong>: {notif.vaccine}
                      <br />
                      <small>Act now!</small>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <input
            type="text"
            placeholder="🔍 Search children by name/code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button onClick={onLogout} className="logout-btn">
            🚪 Logout
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="phc-tabs">
        <button
          className={activeTab === "overview" ? "tab active" : "tab"}
          onClick={() => setActiveTab("overview")}
        >
          📊 Overview
        </button>
        <button
          className={activeTab === "register" ? "tab active" : "tab"}
          onClick={() => setActiveTab("register")}
        >
          ➕ Register Child
        </button>
        <button
          className={activeTab === "reports" ? "tab active" : "tab"}
          onClick={() => setActiveTab("reports")}
        >
          📈 Reports
        </button>
      </nav>

      {/* Dashboard Content */}
      {activeTab === "overview" && (
        <div className="dashboard-content">
          {/* KPIs */}
          <div className="kpi-grid">
            <div className="kpi-card complete">
              <div className="kpi-icon">💉</div>
              <div className="kpi-value">{totalAdministered}</div>
              <div className="kpi-label">Vaccines Administered</div>
            </div>
            <div className="kpi-card warning">
              <div className="kpi-icon">⏰</div>
              <div className="kpi-value">{totalDueSoon}</div>
              <div className="kpi-label">Due Soon</div>
            </div>
            <div className="kpi-card danger">
              <div className="kpi-icon">⚠️</div>
              <div className="kpi-value">{totalOverdue}</div>
              <div className="kpi-label">Overdue</div>
            </div>
            <div className="kpi-card success">
              <div className="kpi-icon">📊</div>
              <div className="kpi-value">{coverageRate}%</div>
              <div className="kpi-label">Coverage Rate</div>
            </div>
          </div>

          {/* Children List */}
          <div className="children-section">
            <div className="section-header">
              <h3>
                👶 Children (0-9 years) - {filteredChildren.length}/
                {totalChildren}
              </h3>
              <button className="primary-btn">📋 Export Register</button>
            </div>
            <ChildList
              children={filteredChildren}
              onSelectChild={setSelectedChild}
            />
          </div>
        </div>
      )}

      {/* Register Tab */}
      {activeTab === "register" && (
        <div className="dashboard-content register-section">
          <h3>➕ Register New Child (0-9 years)</h3>
          <p>
            Generate unique code + fingerprint access for first-time
            registration
          </p>
          {/* Placeholder for your ChildRegistration component */}
          <button className="cta-btn">🚀 Start Registration</button>
        </div>
      )}

      {/* Child Profile Modal */}
      {selectedChild && (
        <div className="child-overlay">
          <ChildProfile
            child={selectedChild}
            onBack={() => setSelectedChild(null)}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
