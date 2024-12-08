CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  size FLOAT NOT NULL,
  hazardous BOOLEAN NOT NULL
);

CREATE TABLE warehouses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  max_stock FLOAT NOT NULL,
  current_stock FLOAT NOT NULL DEFAULT 0,
  free_stock_space FLOAT NOT NULL DEFAULT 0
);

CREATE TABLE imports_exports (
  id SERIAL PRIMARY KEY,
  warehouse_id INT REFERENCES warehouses(id),
  product VARCHAR(100) NOT NULL,
  amount INT NOT NULL,
  date DATE NOT NULL,
  type VARCHAR(10) NOT NULL CHECK (type IN ('import', 'export'))
);