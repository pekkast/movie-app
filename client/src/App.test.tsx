import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders search field', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/movie title/i);
  expect(inputElement).toBeInTheDocument();
});
