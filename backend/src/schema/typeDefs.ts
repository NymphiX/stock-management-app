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
    maxSize: Float!
    hazardous: Boolean!
  }

  type StockMovement {
    id: ID!
    productId: ID!
    warehouseId: ID!
    amount: Float!
    date: String!
    type: String!
  }

  type Query {
    products: [Product]
    product(id: ID!): Product
    warehouses: [Warehouse]
    warehouse(id: ID!): Warehouse
    stockMovements: [StockMovement]
    stockMovement(id: ID!): StockMovement
    warehouseStock(warehouseId: ID!): Float
    warehouseFreeSpace(warehouseId: ID!): Float
  }

  type Mutation {
    addProduct(name: String!, size: Float!, hazardous: Boolean!): Product
    updateProduct(id: ID!, name: String, size: Float, hazardous: Boolean): Product
    deleteProduct(id: ID!): Boolean

    addWarehouse(name: String!, maxSize: Float!, hazardous: Boolean!): Warehouse
    updateWarehouse(id: ID!, name: String, maxSize: Float, hazardous: Boolean): Warehouse
    deleteWarehouse(id: ID!): Boolean

    addStockMovement(productId: ID!, warehouseId: ID!, amount: Float!, date: String!, type: String!): StockMovement
    updateStockMovement(id: ID!, productId: ID, warehouseId: ID, amount: Float, date: String, type: String): StockMovement
    deleteStockMovement(id: ID!): Boolean
  }
`;

export default typeDefs;