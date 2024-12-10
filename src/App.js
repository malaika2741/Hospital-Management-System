import React, { useState } from "react";
import "./App.css";
// import {
//   createRecord,
//   getRecord,
//   grantAccess,
//   revokeAccess,
// } from "./blockchain";
// import {
// createRecord,
// getRecord,
// grantAccess,
// revokeAccess,
// } from "./HealthcareContract";
// import {HealthcareContract} from "./HealthcareContract";
import {
  createRecord,
  getRecord,
  grantAccess,
  revokeAccess,
} from "./HealthcareContract";

function App() {
  const [patientID, setPatientID] = useState("");
  const [patientName, setPatientName] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [providerID, setProviderID] = useState("");
  const [record, setRecord] = useState(null);

  // const healthcare = new HealthcareContract();
  // const { createRecord, getRecord, grantAccess, revokeAccess } = healthcare;

  const handleCreateRecord = async () => {
    await createRecord(patientID, patientName, medicalHistory);
  };

  const handleGetRecord = async () => {
    const record = await getRecord(patientID, providerID);
    setRecord(record);
  };

  const handleGrantAccess = async () => {
    await grantAccess(patientID, providerID);
  };

  const handleRevokeAccess = async () => {
    await revokeAccess(patientID, providerID);
  };

  return (
    <div className="App">
      <h1>Blockchain Healthcare Records</h1>

      <div>
        <input
          type="text"
          placeholder="Patient ID"
          value={patientID}
          onChange={(e) => setPatientID(e.target.value)}
        />
        <input
          type="text"
          placeholder="Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Medical History"
          value={medicalHistory}
          onChange={(e) => setMedicalHistory(e.target.value)}
        />
        <button onClick={handleCreateRecord}>Create Record</button>
      </div>

      <div>
        <input
          type="text"
          placeholder="Provider ID"
          value={providerID}
          onChange={(e) => setProviderID(e.target.value)}
        />
        <button onClick={handleGetRecord}>Get Record</button>
        <button onClick={handleGrantAccess}>Grant Access</button>
        <button onClick={handleRevokeAccess}>Revoke Access</button>
      </div>

      {record && (
        <div>
          <h3>Patient Record:</h3>
          <p>ID: {record.patientID}</p>
          <p>Name: {record.patientName}</p>
          <p>History: {record.medicalHistory}</p>
        </div>
      )}
    </div>
  );
}

export default App;
