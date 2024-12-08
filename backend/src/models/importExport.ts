export interface ImportExport {
  id: number;
  warehouseId: number;
  product: string;
  amount: number;
  date: string;
  type: 'import' | 'export';
}