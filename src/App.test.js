import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders github link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/github/i);
  expect(linkElement).toBeInTheDocument();
});
