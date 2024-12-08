CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  size FLOAT NOT NULL,
  hazardous BOOLEAN NOT NULL
);

CREATE TABLE warehouses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  maxSize FLOAT NOT NULL,
  hazardous BOOLEAN NOT NULL
);

CREATE TABLE stock_movements (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES products(id),
  warehouse_id INT REFERENCES warehouses(id),
  amount FLOAT NOT NULL,
  date TIMESTAMP NOT NULL,
  type VARCHAR(10) NOT NULL
);