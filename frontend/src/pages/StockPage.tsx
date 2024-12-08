import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_WAREHOUSE_DETAILS, ADD_IMPORT, ADD_EXPORT } from '../graphql/queries';
import { useParams } from 'react-router-dom';
import { Warehouse, ImportExport } from '../types';

const WarehouseStockMovementScreen: React.FC = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_WAREHOUSE_DETAILS, {
    variables: { id },
  });

  const [addImport] = useMutation(ADD_IMPORT);
  const [addExport] = useMutation(ADD_EXPORT);

  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState('');
  const [type, setType] = useState<'import' | 'export'>('import');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (type === 'import') {
      await addImport({ variables: { warehouseId: id, product, amount, date } });
    } else {
      await addExport({ variables: { warehouseId: id, product, amount, date } });
    }
    setProduct('');
    setAmount(0);
    setDate('');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const warehouse: Warehouse = data.warehouse;

  return (
    <div>
      <h2>{warehouse.name}</h2>
      <p>Current Stock: {warehouse.currentStock}</p>
      <p>Free Stock Space: {warehouse.freeStockSpace}</p>
      <h3>Historic Imports/Exports</h3>
      <ul>
        {warehouse.importsExports.map((record: ImportExport) => (
          <li key={record.id}>
            {record.date} - {record.product} - {record.amount} ({record.type})
          </li>
        ))}
      </ul>
      <h3>Add Import/Export</h3>
      <form onSubmit={handleAdd}>
        <label>
          Product:
          <input type="text" value={product} onChange={(e) => setProduct(e.target.value)} />
        </label>
        <label>
          Amount:
          <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
        </label>
        <label>
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label>
          Type:
          <select value={type} onChange={(e) => setType(e.target.value as 'import' | 'export')}>
            <option value="import">Import</option>
            <option value="export">Export</option>
          </select>
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default WarehouseStockMovementScreen;