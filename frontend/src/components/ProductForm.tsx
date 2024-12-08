import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PRODUCT } from '../graphql/queries';

interface ProductFormProps {
  refetch: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ refetch }) => {
  const [name, setName] = useState('');
  const [size, setSize] = useState(0);
  const [hazardous, setHazardous] = useState(false);
  const [addProduct] = useMutation(ADD_PRODUCT);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addProduct({ variables: { name, size, hazardous } });
    setName('');
    setSize(0);
    setHazardous(false);
    refetch();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Size:</label>
        <input type="number" value={size} onChange={(e) => setSize(parseFloat(e.target.value))} />
      </div>
      <div>
        <label>Hazardous:</label>
        <input type="checkbox" checked={hazardous} onChange={(e) => setHazardous(e.target.checked)} />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;