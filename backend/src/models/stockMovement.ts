export interface StockMovement {
  id: number;
  productId: number;
  warehouseId: number;
  amount: number;
  date: string;
  type: 'import' | 'export';
}