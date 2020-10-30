import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

it.skip('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Sightly/i);
  expect(linkElement).toBeInTheDocument();
});
