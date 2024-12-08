import { IResolvers } from '@graphql-tools/utils';
import { query } from '../db';
import { Product } from '../models/product';

const productResolver: IResolvers = {
  Query: {
    products: async (): Promise<Product[]> => {
      const result = await query('SELECT * FROM products');
      return result.rows;
    },
  },
  Mutation: {
    addProduct: async (_, { name, size, hazardous }): Promise<Product> => {
      const result = await query(
        'INSERT INTO products (name, size, hazardous) VALUES ($1, $2, $3) RETURNING *',
        [name, size, hazardous]
      );
      return result.rows[0];
    },
  },
};

export default productResolver;