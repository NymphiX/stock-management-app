import { IResolvers } from '@graphql-tools/utils';
import { query } from '../db';
import { Warehouse } from '../models/warehouse';

const warehouseResolver: IResolvers = {
  Query: {
    warehouses: async (): Promise<Warehouse[]> => {
      const result = await query('SELECT * FROM warehouses');
      return result.rows;
    },
    warehouse: async (_, { id }): Promise<Warehouse> => {
      const result = await query('SELECT * FROM warehouses WHERE id = $1', [id]);
      const warehouse = result.rows[0];
      if (warehouse) {
        const importsExportsResult = await query('SELECT * FROM imports_exports WHERE warehouse_id = $1', [id]);
        warehouse.importsExports = importsExportsResult.rows;

        const currentStockResult = await query('SELECT SUM(amount) as currentStock FROM imports_exports WHERE warehouse_id = $1 AND type = $2', [id, 'import']);
        const currentStock = currentStockResult.rows[0].currentStock || 0;

        const exportStockResult = await query('SELECT SUM(amount) as exportStock FROM imports_exports WHERE warehouse_id = $1 AND type = $2', [id, 'export']);
        const exportStock = exportStockResult.rows[0].exportStock || 0;

        warehouse.currentStock = currentStock - exportStock;
        warehouse.freeStockSpace = warehouse.maxStock - warehouse.currentStock;
      }
      return warehouse;
    },
  },
  Mutation: {
    addWarehouse: async (_, { name, maxStock }): Promise<Warehouse> => {
      const result = await query(
        'INSERT INTO warehouses (name, max_stock) VALUES ($1, $2) RETURNING *',
        [name, maxStock]
      );
      return result.rows[0];
    },
  },
};

export default warehouseResolver;