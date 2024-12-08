import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import ProductForm from '../components/ProductForm';
import { ADD_PRODUCT } from '../graphql/queries';

const mocks = [
  {
    request: {
      query: ADD_PRODUCT,
      variables: { name: 'Test Product', size: 10, hazardous: false },
    },
    result: {
      data: {
        addProduct: {
          id: '1',
          name: 'Test Product',
          size: 10,
          hazardous: false,
        },
      },
    },
  },
];

test('renders ProductForm and submits form', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ProductForm refetch={() => {}} />
    </MockedProvider>
  );

  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test Product' } });
  fireEvent.change(screen.getByLabelText(/size/i), { target: { value: '10' } });
  fireEvent.click(screen.getByLabelText(/hazardous/i));

  fireEvent.click(screen.getByText(/add product/i));

  await waitFor(() => {
    expect(screen.getByLabelText(/name/i)).toHaveValue('');
    expect(screen.getByLabelText(/size/i)).toHaveValue(0);
    expect(screen.getByLabelText(/hazardous/i)).not.toBeChecked();
  });
});