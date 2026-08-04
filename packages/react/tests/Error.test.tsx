import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Error as ErrorView } from '../src/components/Error';

describe('Error', () => {
  it('renders an assertive alert with a semantic heading', () => {
    render(<ErrorView error={new Error('Network failed')} />);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('aria-live', 'assertive');
    expect(alert.tagName).toBe('SECTION');
    expect(
      screen.getByRole('heading', { name: 'Something went wrong' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Network failed')).toBeInTheDocument();
  });

  it('renders string errors', () => {
    render(<ErrorView error="Request timed out" />);
    expect(screen.getByText('Request timed out')).toBeInTheDocument();
  });

  it('renders a fallback for unknown errors', () => {
    render(<ErrorView error={{ code: 500 }} />);
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });

  it('supports a custom title', () => {
    render(<ErrorView title="Sync failed" error="Try again later." />);
    expect(
      screen.getByRole('heading', { name: 'Sync failed' }),
    ).toBeInTheDocument();
  });
});
