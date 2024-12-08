import { IResolvers } from '@graphql-tools/utils';
import { query } from '../db';
import { ImportExport } from '../models/importExport';

const importExportResolver: IResolvers = {
  Mutation: {
    addImport: async (_, { warehouseId, product, amount, date }): Promise<ImportExport> => {
      const result = await query(
        'INSERT INTO imports_exports (warehouse_id, product, amount, date, type) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [warehouseId, product, amount, date, 'import']
      );
      return result.rows[0];
    },
    addExport: async (_, { warehouseId, product, amount, date }): Promise<ImportExport> => {
      const result = await query(
        'INSERT INTO imports_exports (warehouse_id, product, amount, date, type) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [warehouseId, product, amount, date, 'export']
      );
      return result.rows[0];
    },
  },
};

export default importExportResolver;