import { render, screen } from '@testing-library/react';
import App from './App';

test('renders students table heading', () => {
  render(<App />);
  const heading = screen.getByText(/students table/i);
  expect(heading).toBeInTheDocument();
});