// "use strict";

// Import necessary module
// import { Contract } from "fabric-contract-api";

// Initialize the ledger (used to set up initial state)
async function initLedger(ctx) {
  console.log("Initializing the ledger");
}

// Create a new medical record for a patient
async function createRecord(ctx, patientID, patientName, medicalHistory) {
  const record = {
    patientID,
    patientName,
    medicalHistory,
    authorizedProviders: [],
  };

  await ctx.stub.putState(patientID, Buffer.from(JSON.stringify(record)));
  console.log(`Record created for patient: ${patientID}`);
}

// Get a patient's medical record (only accessible by authorized providers)
async function getRecord(ctx, patientID, providerID) {
  const recordAsBytes = await ctx.stub.getState(patientID);
  if (!recordAsBytes || recordAsBytes.length === 0) {
    throw new Error(`${patientID} does not exist`);
  }

  const record = JSON.parse(recordAsBytes.toString());

  // Check if the provider is authorized
  if (!record.authorizedProviders.includes(providerID)) {
    throw new Error(
      `Provider ${providerID} is not authorized to access this record`
    );
  }

  return JSON.stringify(record);
}

// Grant access to a healthcare provider
async function grantAccess(ctx, patientID, providerID) {
  const recordAsBytes = await ctx.stub.getState(patientID);
  if (!recordAsBytes || recordAsBytes.length === 0) {
    throw new Error(`${patientID} does not exist`);
  }

  const record = JSON.parse(recordAsBytes.toString());

  // Grant access to the provider
  record.authorizedProviders.push(providerID);
  await ctx.stub.putState(patientID, Buffer.from(JSON.stringify(record)));
  console.log(`Provider ${providerID} granted access to ${patientID}'s record`);
}

// Revoke access from a healthcare provider
async function revokeAccess(ctx, patientID, providerID) {
  const recordAsBytes = await ctx.stub.getState(patientID);
  if (!recordAsBytes || recordAsBytes.length === 0) {
    throw new Error(`${patientID} does not exist`);
  }

  const record = JSON.parse(recordAsBytes.toString());

  // Revoke access from the provider
  const index = record.authorizedProviders.indexOf(providerID);
  if (index > -1) {
    record.authorizedProviders.splice(index, 1);
    await ctx.stub.putState(patientID, Buffer.from(JSON.stringify(record)));
    console.log(
      `Provider ${providerID} revoked access to ${patientID}'s record`
    );
  } else {
    throw new Error(
      `Provider ${providerID} does not have access to ${patientID}'s record`
    );
  }
}

// Export functions as a module
export { initLedger, createRecord, getRecord, grantAccess, revokeAccess };
