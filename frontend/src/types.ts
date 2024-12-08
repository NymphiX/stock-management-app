export interface Warehouse {
  id: string;
  name: string;
  maxStock: number;
  currentStock: number;
  freeStockSpace: number;
  importsExports: ImportExport[];
}

export interface ImportExport {
  id: string;
  product: string;
  amount: number;
  date: string;
  type: 'import' | 'export';
}

export interface Product {
  id: string;
  name: string;
  size: number;
  hazardous: boolean;
}