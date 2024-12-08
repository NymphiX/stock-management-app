import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_WAREHOUSES = gql`
  query GetWarehouses {
    warehouses {
      id
      name
      maxSize
      hazardous
    }
  }
`;

const WarehouseList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_WAREHOUSES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h2>Warehouse List</h2>
      <ul>
        {data.warehouses.map((warehouse: any) => (
          <li key={warehouse.id}>
            {warehouse.name} - {warehouse.maxSize} - {warehouse.hazardous ? 'Hazardous' : 'Non-Hazardous'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WarehouseList;