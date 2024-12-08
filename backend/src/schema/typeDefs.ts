import { gql } from 'apollo-server';

const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    size: Float!
    hazardous: Boolean!
  }

  type Warehouse {
    id: ID!
    name: String!
    maxStock: Float!
    currentStock: Float!
    freeStockSpace: Float!
    importsExports: [ImportExport]
  }

  type ImportExport {
    id: ID!
    product: String!
    amount: Int!
    date: String!
    type: String!
  }

  type Query {
    products: [Product]
    warehouses: [Warehouse]
    warehouse(id: ID!): Warehouse
  }

  type Mutation {
    addProduct(name: String!, size: Float!, hazardous: Boolean!): Product
    addWarehouse(name: String!, maxStock: Float!): Warehouse
    addImport(warehouseId: ID!, product: String!, amount: Int!, date: String!): ImportExport
    addExport(warehouseId: ID!, product: String!, amount: Int!, date: String!): ImportExport
  }
`;

export default typeDefs;