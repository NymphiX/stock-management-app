import { IResolvers } from '@graphql-tools/utils';
import pool from '../db';
import { calculateExpression } from '../services/calculationService';
import { Warehouse } from '../models/warehouse';
import { StockMovement } from '../models/stockMovement';

const warehouseResolver: IResolvers = {
  Query: {
    warehouses: async () => {
      const result = await pool.query('SELECT * FROM warehouses');
      return result.rows;
    },
    warehouse: async (_, { id }) => {
      const result = await pool.query('SELECT * FROM warehouses WHERE id = $1', [id]);
      return result.rows[0];
    },
    stockMovements: async () => {
      const result = await pool.query('SELECT * FROM stock_movements');
      return result.rows;
    },
    stockMovement: async (_, { id }) => {
      const result = await pool.query('SELECT * FROM stock_movements WHERE id = $1', [id]);
      return result.rows[0];
    },
    warehouseStock: async (_, { warehouseId }) => {
      const result = await pool.query('SELECT * FROM stock_movements WHERE warehouse_id = $1', [warehouseId]);
      const stockMovements: StockMovement[] = result.rows;
      let totalStock = 0;
      for (const movement of stockMovements) {
        const expression = `${totalStock} ${movement.type === 'import' ? '+' : '-'} ${movement.amount}`;
        totalStock = await calculateExpression(expression);
      }
      return totalStock;
    },
    warehouseFreeSpace: async (_, { warehouseId }) => {
      const warehouseResult = await pool.query('SELECT * FROM warehouses WHERE id = $1', [warehouseId]);
      const warehouse: Warehouse = warehouseResult.rows[0];
      const stockResult = await pool.query('SELECT * FROM stock_movements WHERE warehouse_id = $1', [warehouseId]);
      const stockMovements: StockMovement[] = stockResult.rows;
      let totalStock = 0;
      for (const movement of stockMovements) {
        const expression = `${totalStock} ${movement.type === 'import' ? '+' : '-'} ${movement.amount}`;
        totalStock = await calculateExpression(expression);
      }
      const freeSpace = warehouse.maxSize - totalStock;
      return freeSpace;
    },
  },
  Mutation: {
    addWarehouse: async (_, { name, maxSize, hazardous }) => {
      const result = await pool.query(
        'INSERT INTO warehouses (name, maxSize, hazardous) VALUES ($1, $2, $3) RETURNING *',
        [name, maxSize, hazardous]
      );
      return result.rows[0];
    },
    updateWarehouse: async (_, { id, name, maxSize, hazardous }) => {
      const result = await pool.query(
        'UPDATE warehouses SET name = $1, maxSize = $2, hazardous = $3 WHERE id = $4 RETURNING *',
        [name, maxSize, hazardous, id]
      );
      return result.rows[0];
    },
    deleteWarehouse: async (_, { id }) => {
      await pool.query('DELETE FROM warehouses WHERE id = $1', [id]);
      return true;
    },
    addStockMovement: async (_, { productId, warehouseId, amount, date, type }) => {
      const result = await pool.query(
        'INSERT INTO stock_movements (product_id, warehouse_id, amount, date, type) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [productId, warehouseId, amount, date, type]
      );
      return result.rows[0];
    },
    updateStockMovement: async (_, { id, productId, warehouseId, amount, date, type }) => {
      const result = await pool.query(
        'UPDATE stock_movements SET product_id = $1, warehouse_id = $2, amount = $3, date = $4, type = $5 WHERE id = $6 RETURNING *',
        [productId, warehouseId, amount, date, type, id]
      );
      return result.rows[0];
    },
    deleteStockMovement: async (_, { id }) => {
      await pool.query('DELETE FROM stock_movements WHERE id = $1', [id]);
      return true;
    },
  },
};

export default warehouseResolver;