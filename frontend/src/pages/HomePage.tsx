import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PRODUCTS, ADD_PRODUCT } from '../graphql/queries';
import { Product } from '../types';

const ProductEntryScreen: React.FC = () => {
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS);
  const [addProduct] = useMutation(ADD_PRODUCT);

  const [name, setName] = useState('');
  const [size, setSize] = useState(0);
  const [hazardous, setHazardous] = useState(false);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    await addProduct({ variables: { name, size, hazardous } });
    setName('');
    setSize(0);
    setHazardous(false);
    refetch();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {data.products.map((product: Product) => (
          <li key={product.id}>
            {product.name} - {product.size} - {product.hazardous ? 'Hazardous' : 'Non-Hazardous'}
          </li>
        ))}
      </ul>
      <h3>Add Product</h3>
      <form onSubmit={handleAddProduct}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Size:
          <input type="number" value={size} onChange={(e) => setSize(Number(e.target.value))} />
        </label>
        <label>
          Hazardous:
          <input type="checkbox" checked={hazardous} onChange={(e) => setHazardous(e.target.checked)} />
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default ProductEntryScreen;