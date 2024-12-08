import { gql } from '@apollo/client';

export const GET_WAREHOUSES = gql`
  query GetWarehouses {
    warehouses {
      id
      name
      maxStock
      currentStock
      freeStockSpace
    }
  }
`;

export const ADD_WAREHOUSE = gql`
  mutation AddWarehouse($name: String!, $maxStock: Float!) {
    addWarehouse(name: $name, maxStock: $maxStock) {
      id
      name
      maxStock
      currentStock
      freeStockSpace
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      size
      hazardous
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation AddProduct($name: String!, $size: Float!, $hazardous: Boolean!) {
    addProduct(name: $name, size: $size, hazardous: $hazardous) {
      id
      name
      size
      hazardous
    }
  }
`;

export const GET_WAREHOUSE_DETAILS = gql`
  query GetWarehouseDetails($id: ID!) {
    warehouse(id: $id) {
      id
      name
      currentStock
      freeStockSpace
      importsExports {
        id
        product
        amount
        date
        type
      }
    }
  }
`;

export const ADD_IMPORT = gql`
  mutation AddImport($warehouseId: ID!, $product: String!, $amount: Int!, $date: String!) {
    addImport(warehouseId: $warehouseId, product: $product, amount: $amount, date: $date) {
      id
      product
      amount
      date
      type
    }
  }
`;

export const ADD_EXPORT = gql`
  mutation AddExport($warehouseId: ID!, $product: String!, $amount: Int!, $date: String!) {
    addExport(warehouseId: $warehouseId, product: $product, amount: $amount, date: $date) {
      id
      product
      amount
      date
      type
    }
  }
`;