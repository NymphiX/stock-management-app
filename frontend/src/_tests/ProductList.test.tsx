import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import ProductList from '../components/ProductList';
import { GET_PRODUCTS } from '../graphql/queries';

const mocks = [
  {
    request: {
      query: GET_PRODUCTS,
    },
    result: {
      data: {
        products: [
          { id: '1', name: 'Product 1', size: 10, hazardous: false },
          { id: '2', name: 'Product 2', size: 20, hazardous: true },
        ],
      },
    },
  },
];

test('renders ProductList and displays products', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ProductList />
    </MockedProvider>
  );

  expect(await screen.findByText(/product 1/i)).toBeInTheDocument();
  expect(await screen.findByText(/product 2/i)).toBeInTheDocument();
});