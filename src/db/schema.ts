const Document = {
  name: "Patient",
  primaryKey: "id",
  properties: {
    id: "string",
    firstName: "string",
    lastName: "string",
    OIB: "string?",
    dateOfBirth: "string?"
  }
};

export const Schema = [Document];
