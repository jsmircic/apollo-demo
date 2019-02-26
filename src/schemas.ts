import { gql } from "apollo-server";

export default gql`
  type Query {
    """
    Test Message.
    """
    document: [Document]
    item: [Item]
    testFn(id: Int): Document
  }
  type Item {
    id: ID!
    name: String
  }
  type Document {
    id: ID!
    name: String
    description: String
    date: String
    createdBy: String
    opp: Int
    items: [Item]!
  }
`;
