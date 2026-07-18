import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders password generator heading', () => {
  render(<App />);
  const heading = screen.getByText(/password generator/i);
  expect(heading).toBeInTheDocument();
});

test('renders generate button', () => {
  render(<App />);
  const button = screen.getByRole('button', { name: /generate/i });
  expect(button).toBeInTheDocument();
});

test('renders character length slider', () => {
  render(<App />);
  expect(screen.getByText(/character length/i)).toBeInTheDocument();
});
