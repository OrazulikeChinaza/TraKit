import React, { useState } from "react";

const VaccinationForm = ({ childId }) => {
  const [formData, setFormData] = useState({
    vaccine: "",
    date: "",
    nextDue: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New vaccination record:", { ...formData, childId });
    // Simulate API call
    alert("Vaccination record saved successfully!");
    setFormData({ vaccine: "", date: "", nextDue: "" });
  };

  return (
    <div className="vaccination-form">
      <h3>Add Vaccination Record</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Vaccine Type</label>
          <select
            value={formData.vaccine}
            onChange={(e) =>
              setFormData({ ...formData, vaccine: e.target.value })
            }
            required
          >
            <option value="">Select vaccine</option>
            <option value="BCG">BCG</option>
            <option value="OPV 0">OPV 0</option>
            <option value="Hep B">Hepatitis B</option>
            <option value="Pentavalent 1">Pentavalent 1</option>
            <option value="MMR">MMR</option>
          </select>
        </div>
        <div className="input-group">
          <label>Date Administered</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>
        <div className="input-group">
          <label>Next Due Date</label>
          <input
            type="date"
            value={formData.nextDue}
            onChange={(e) =>
              setFormData({ ...formData, nextDue: e.target.value })
            }
          />
        </div>
        <button type="submit" className="save-btn">
          Save Record
        </button>
      </form>
    </div>
  );
};

export default VaccinationForm;
