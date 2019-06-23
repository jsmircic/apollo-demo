import { gql } from "apollo-server";
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from "graphql-iso-date";

export default gql`
  scalar GraphQLDateTime
  scalar GraphQLDate
  scalar GraphQLTime

  type Query {
    """
    Jadrolinija fleet
    Returns a list of vessels operated by Jadrolinija
    """
    vessels: [Vessel]

    vesselItinerary(
      vesselId: String
      startDate: GraphQLDate
      pageNumber: Int
    ): [Journey]

    """
    List of ports
    """
    ports: [Port]
    """
    List of islands
    """
    islands: [Island]
    """
    Types of lines
    """
    lineTypes: [LineType]

    """
    List of lines that Jadrolinija operates on
    """
    lines: [Line]

    """
    Returns a list of lines for line type
    """
    linesByType(lineTypeId: String): [Line]
  }
  # List of Jadrolinija vessels
  type Vessel {
    """
    Vessel unique Id
    """
    id: ID!
    """
    Name of the Vessel
    """
    name: String
  }

  type Journey {
    id: ID!
    vessel: Vessel
    line: Line
    departureTime: GraphQLDateTime
    departurePort: Port
    destinationPort: Port
    arrivalTime: GraphQLDateTime
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
