import React, { useState, useEffect } from "react";
import { Bell, X } from "lucide-react";
import "./ChildDashboard.css";
import { VACCINE_SCHEDULE } from "../data/nigeriaVaccines";

// Child Dashboard Component - FIXED WITH PERSISTENCE
const ChildDashboard = ({ child, onBack }) => {
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  const [vaccineRecords, setVaccineRecords] = useState({});
  const [showProfile, setShowProfile] = useState(false);

  // ✅ PERSISTENCE: Load records from localStorage on mount
  useEffect(() => {
    if (child?.uniqueCode) {
      const saved = localStorage.getItem(`vaccineRecords_${child.uniqueCode}`);
      if (saved) {
        setVaccineRecords(JSON.parse(saved));
      }
    }
  }, [child?.uniqueCode]);

  // ✅ PERSISTENCE: Save records to localStorage whenever they change
  useEffect(() => {
    if (child?.uniqueCode && Object.keys(vaccineRecords).length > 0) {
      localStorage.setItem(
        `vaccineRecords_${child.uniqueCode}`,
        JSON.stringify(vaccineRecords)
      );
    }
  }, [vaccineRecords, child?.uniqueCode]);

  console.log(VACCINE_SCHEDULE);

  // ✅ SAFETY CHECK - prevent crash if no child data
  if (!child) {
    return (
      <div className="dashboard-container">
        <div style={{ textAlign: "center", padding: "40px" }}>
          <h2>No child data available</h2>
          <button onClick={onBack} className="btn-back">
            ← Back to Menu
          </button>
        </div>
      </div>
    );
  }

  // ✅ FIXED: Safe initials calculation
  const getInitials = () => {
    if (child.name) {
      return child.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
    }
    return child.uniqueCode?.slice(0, 2).toUpperCase() || "ID";
  };

  const initials = getInitials();

  const calculateAge = (dob) => {
    if (!dob) return 0;
    const today = new Date();
    const birthDate = new Date(dob);
    let months = (today.getFullYear() - birthDate.getFullYear()) * 12;
    months -= birthDate.getMonth();
    months += today.getMonth();
    return months;
  };

  const calculateDaysOld = (dob) => {
    if (!dob) return 0;
    const today = new Date();
    const birthDate = new Date(dob);
    const diffTime = Math.abs(today - birthDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getVaccineStatus = (vaccine) => {
    const ageInMonths = calculateAge(child.dateOfBirth);
    const record = vaccineRecords[vaccine.id];

    if (record) return "completed";
    if (ageInMonths < vaccine.ageMonths) return "upcoming";
    return "not-completed";
  };

  const getScheduledDate = (vaccine) => {
    const birthDate = new Date(child.dateOfBirth || Date.now());
    const scheduledDate = new Date(birthDate);

    if (vaccine.ageWeeks > 0) {
      scheduledDate.setDate(scheduledDate.getDate() + vaccine.ageWeeks * 7);
    } else {
      scheduledDate.setMonth(scheduledDate.getMonth() + vaccine.ageMonths);
    }
    return scheduledDate;
  };

  const vaccineSchedule = [
    {
      ageGroup: "At Birth",
      vaccines: VACCINE_SCHEDULE.filter((v) => v.ageMonths === 0),
    },
    {
      ageGroup: "6 Weeks",
      vaccines: VACCINE_SCHEDULE.filter((v) => v.ageWeeks === 6),
    },
    {
      ageGroup: "10 Weeks",
      vaccines: VACCINE_SCHEDULE.filter((v) => v.ageWeeks === 10),
    },
    {
      ageGroup: "14 Weeks",
      vaccines: VACCINE_SCHEDULE.filter((v) => v.ageWeeks === 14),
    },
    {
      ageGroup: "6 Months",
      vaccines: VACCINE_SCHEDULE.filter((v) => v.ageMonths === 6),
    },
    {
      ageGroup: "9 Months",
      vaccines: VACCINE_SCHEDULE.filter((v) => v.ageMonths === 9),
    },
    {
      ageGroup: "12 Months",
      vaccines: VACCINE_SCHEDULE.filter((v) => v.ageMonths === 12),
    },
    {
      ageGroup: "15 Months",
      vaccines: VACCINE_SCHEDULE.filter((v) => v.ageMonths === 15),
    },
    {
      ageGroup: "108 Months",
      vaccines: VACCINE_SCHEDULE.filter((v) => v.ageMonths === 108),
    },
  ].filter((group) => group.vaccines.length > 0);

  const notifications = VACCINE_SCHEDULE.filter(
    (v) => getVaccineStatus(v) === "not-completed"
  );

  const handleVaccineClick = (vaccine) => {
    setSelectedVaccine(vaccine);
  };

  const handleCheckboxChange = (vaccine) => {
    const status = getVaccineStatus(vaccine);

    if (status === "completed") {
      const newRecords = { ...vaccineRecords };
      delete newRecords[vaccine.id];
      setVaccineRecords(newRecords);
    } else {
      const record = {
        dateAdministered: new Date().toISOString(),
        phcName: child.phcName || "PHC Center",
        healthWorker: "Health Worker",
        notes: "",
      };
      setVaccineRecords({ ...vaccineRecords, [vaccine.id]: record });
    }
  };

  const ageMonths = calculateAge(child.dateOfBirth);
  const daysOld = calculateDaysOld(child.dateOfBirth);

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-left">
          <div className="logo-small">🩺</div>
          <h2>TraKit PHC</h2>
        </div>
        <div className="header-right">
          <div className="notification-icon">
            <Bell size={24} />
            {notifications.length > 0 && (
              <span className="badge">{notifications.length}</span>
            )}
          </div>
          {/* ✅ CLICKABLE PROFILE AVATAR */}
          <div
            className="profile-avatar clickable"
            onClick={() => setShowProfile(true)}
            title="View Profile"
          >
            {initials}
          </div>
          <button onClick={onBack} className="btn-logout">
            ← Back
          </button>
        </div>
      </div>

      {/* Child Info */}
      <div className="child-info-header">
        <div className="info-row">
          <div className="info-group">
            <span className="info-label">Name:</span>
            <span className="info-value">{child.name || "N/A"}</span>
          </div>
          <div className="info-group">
            <span className="info-label">ID:</span>
            <span className="info-value">{child.uniqueCode || "N/A"}</span>
          </div>
          <div className="info-group">
            <span className="info-label">Age:</span>
            <span className="info-value">{ageMonths / 12} Years</span>
          </div>
        </div>
      </div>

      {/* Vaccine Table */}
      <div className="vaccine-table-container">
        <table className="vaccine-table">
          <thead>
            <tr>
              <th>Age Group</th>
              <th>Vaccine</th>
              <th>Scheduled</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {vaccineSchedule.map((group, groupIndex) =>
              group.vaccines.map((vaccine, vIndex) => {
                const status = getVaccineStatus(vaccine);
                const record = vaccineRecords[vaccine.id];
                const scheduledDate = getScheduledDate(vaccine);

                return (
                  <tr
                    key={vaccine.id}
                    className={`status-${status}`}
                    onClick={() => handleVaccineClick(vaccine)}
                  >
                    {vIndex === 0 && (
                      <td rowSpan={group.vaccines.length}>{group.ageGroup}</td>
                    )}
                    <td>
                      <input
                        type="checkbox"
                        checked={status === "completed"}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleCheckboxChange(vaccine);
                        }}
                      />
                      {vaccine.name}
                    </td>
                    <td>{scheduledDate.toLocaleDateString("en-GB")}</td>
                    <td>
                      <span className={`status-badge ${status}`}>
                        {status === "completed"
                          ? "✓ Completed"
                          : status === "upcoming"
                          ? "Upcoming"
                          : "⚠️ Overdue"}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Vaccine Modal */}
      {selectedVaccine && (
        <div className="modal-overlay" onClick={() => setSelectedVaccine(null)}>
          <div className="modal-content">
            <h3>{selectedVaccine.name}</h3>
            <p>{selectedVaccine.description}</p>
            <button
              className="btn-primary"
              onClick={() => handleCheckboxChange(selectedVaccine)}
            >
              {getVaccineStatus(selectedVaccine) === "completed"
                ? "Mark as Missed"
                : "Mark as Completed"}
            </button>
          </div>
        </div>
      )}

      {/* ✅ PROFILE MODAL */}
      {showProfile && (
        <div className="modal-overlay" onClick={() => setShowProfile(false)}>
          <div
            className="modal-content profile-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Child Profile</h3>
              <button
                className="close-btn"
                onClick={() => setShowProfile(false)}
              >
                <X size={24} />
              </button>
            </div>
            <div className="profile-details">
              <div className="profile-field">
                <span className="field-label">Full Name:</span>
                <span className="field-value">{child.name || "N/A"}</span>
              </div>
              <div className="profile-field">
                <span className="field-label">Unique Code:</span>
                <span className="field-value">{child.uniqueCode || "N/A"}</span>
              </div>
              <div className="profile-field">
                <span className="field-label">Date of Birth:</span>
                <span className="field-value">
                  {child.dateOfBirth
                    ? new Date(child.dateOfBirth).toLocaleDateString("en-GB")
                    : "N/A"}
                </span>
              </div>
              <div className="profile-field">
                <span className="field-label">Place of Birth:</span>
                <span className="field-value">
                  {child.placeOfBirth || "N/A"}
                </span>
              </div>
              <div className="profile-field">
                <span className="field-label">Place of Registration:</span>
                <span className="field-value">
                  {child.placeOfRegistration || "N/A"}
                </span>
              </div>
              <div className="profile-field">
                <span className="field-label">State of Origin:</span>
                <span className="field-value">
                  {child.stateOfOrigin || "N/A"}
                </span>
              </div>
              <div className="profile-field">
                <span className="field-label">Parent/Guardian:</span>
                <span className="field-value">
                  {child.parentGuardianName || "N/A"}
                </span>
              </div>
              <div className="profile-field">
                <span className="field-label">Phone Number:</span>
                <span className="field-value">
                  {child.parentPhoneNumber || "N/A"}
                </span>
              </div>
              <div className="profile-field">
                <span className="field-label">Age:</span>
                <span className="field-value">
                  {Math.floor(ageMonths / 12)} Years, {ageMonths % 12} Months
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChildDashboard;
