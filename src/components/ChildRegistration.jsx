import React, { useState } from "react";

export default function ChildRegistration({ onRegister, onCancel }) {
  const [uniqueCode, setUniqueCode] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [placeOfRegistration, setPlaceOfRegistration] = useState("");
  const [parentGuardianName, setParentGuardianName] = useState("");
  const [stateOfOrigin, setStateOfOrigin] = useState("");
  const [parentPhoneNumber, setParentPhoneNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !uniqueCode ||
      !name ||
      !surname ||
      !dateOfBirth ||
      !placeOfBirth ||
      !placeOfRegistration ||
      !parentGuardianName ||
      !stateOfOrigin ||
      !parentPhoneNumber
    ) {
      return alert("Please fill all fields");
    }
    onRegister({
      uniqueCode,
      name: `${name} ${surname}`,
      dateOfBirth,
      placeOfBirth,
      placeOfRegistration,
      parentGuardianName,
      stateOfOrigin,
      parentPhoneNumber,
      vaccines: [],
    });
  };

  return (
    <div className="container">
      <h2>Register New Child</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Unique Code"
          value={uniqueCode}
          onChange={(e) => setUniqueCode(e.target.value)}
          required
        />
        <input
          placeholder="Child Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Child Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
        />
        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          required
        />
        <input
          placeholder="Place of Birth"
          value={placeOfBirth}
          onChange={(e) => setPlaceOfBirth(e.target.value)}
          required
        />
        <input
          placeholder="Place of Registration"
          value={placeOfRegistration}
          onChange={(e) => setPlaceOfRegistration(e.target.value)}
          required
        />
        <input
          placeholder="Parent/Guardian Name"
          value={parentGuardianName}
          onChange={(e) => setParentGuardianName(e.target.value)}
          required
        />
        <input
          placeholder="State of Origin"
          value={stateOfOrigin}
          onChange={(e) => setStateOfOrigin(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Parent/Guardian Phone Number"
          value={parentPhoneNumber}
          onChange={(e) => setParentPhoneNumber(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <button
        onClick={onCancel}
        style={{ marginTop: "1rem", backgroundColor: "#eee", color: "#666" }}
      >
        Cancel
      </button>
    </div>
  );
}
