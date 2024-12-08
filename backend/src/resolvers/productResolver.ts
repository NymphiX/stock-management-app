import { IResolvers } from '@graphql-tools/utils';
import pool from '../db';

const productResolver: IResolvers = {
  Query: {
    products: async () => {
      const result = await pool.query('SELECT * FROM products');
      return result.rows;
    },
    product: async (_, { id }) => {
      const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
      return result.rows[0];
    },
  },
  Mutation: {
    addProduct: async (_, { name, size, hazardous }) => {
      const result = await pool.query(
        'INSERT INTO products (name, size, hazardous) VALUES ($1, $2, $3) RETURNING *',
        [name, size, hazardous]
      );
      return result.rows[0];
    },
    updateProduct: async (_, { id, name, size, hazardous }) => {
      const result = await pool.query(
        'UPDATE products SET name = $1, size = $2, hazardous = $3 WHERE id = $4 RETURNING *',
        [name, size, hazardous, id]
      );
      return result.rows[0];
    },
    deleteProduct: async (_, { id }) => {
      try {
        const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
          throw new Error('Product not found');
        }
        return result.rows[0];
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to delete product: ${error.message}`);
        } else {
          throw new Error('Failed to delete product due to an unknown error');
        }
      }
    },
  },
};

export default productResolver;