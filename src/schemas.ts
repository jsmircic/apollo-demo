import { gql } from "apollo-server";

export default gql`
  type Query {
    # List of Jadrolinija vessels
    vessels: [Vessel]

    # List of ports
    ports: [Port]
    # List of islands
    islands: [Island]
    # types of lines
    lineTypes: [LineType]
    # list of lines that Jadrolinija operates on
    lines: [Line]
    # returns a list of lines for line type
    linesByType(lineTypeId: String): [Line]
  }
  # List of Jadrolinija vessels
  type Vessel {
    id: ID!
    # Name of the Vessel
    name: String
  }

  type VoyageItem {
    id: ID!
    departurePort: Port
    destinationPort: Port
    departureTime: String
    arrivalTime: String
  }

  type Port {
    id: ID!
    name: String
    CIMISId: String
  }

  type Island {
    id: ID!
    name: String
    ports: [Port]
  }

  type Line {
    id: ID!
    name: String
    type: LineType
  }

  type LineType {
    id: ID!
    name: String
  }
`;
