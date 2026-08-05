import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Error as ErrorView } from '../src/components/Error';

describe('Error', () => {
  it('renders an assertive alert with a semantic heading', () => {
    render(<ErrorView error={new Error('Network failed')} />);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('aria-live', 'assertive');
    expect(alert.tagName).toBe('SECTION');
    expect(
      screen.getByRole('heading', { name: 'Something went wrong!' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Unable to load the content.')).toBeInTheDocument();
  });

  it('renders string errors without changing default copy', () => {
    render(<ErrorView error="Request timed out" />);
    expect(screen.getByText('Unable to load the content.')).toBeInTheDocument();
  });

  it('renders a fallback for unknown errors', () => {
    render(<ErrorView error={{ code: 500 }} />);
    expect(screen.getByText('Unable to load the content.')).toBeInTheDocument();
  });

  it('supports a custom title and description', () => {
    render(
      <ErrorView
        title="Sync failed"
        description="Please check your connection."
        error="ignored when description is set"
      />,
    );

    expect(
      screen.getByRole('heading', { name: 'Sync failed' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Please check your connection.'),
    ).toBeInTheDocument();
    expect(
      screen.queryByText('ignored when description is set'),
    ).not.toBeInTheDocument();
  });

  it('renders a retry button when onRetry is provided', async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();

    render(<ErrorView error="Failed" onRetry={onRetry} />);

    await user.click(screen.getByRole('button', { name: 'Try again' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('supports solid and gradient backgrounds with opacity', () => {
    const { rerender } = render(<ErrorView error="Failed" />);
    expect(screen.getByRole('alert')).toHaveAttribute(
      'data-error-background',
      'none',
    );

    rerender(
      <ErrorView
        error="Failed"
        background={['#EF4444']}
        backgroundOpacity={0.2}
      />,
    );
    expect(screen.getByRole('alert')).toHaveAttribute(
      'data-error-background',
      'solid',
    );
    expect(screen.getByRole('alert').style.background).toContain('color-mix');

    rerender(
      <ErrorView
        error="Failed"
        background={['#EF4444', '#F59E0B']}
        backgroundOpacity={0.3}
      />,
    );
    expect(screen.getByRole('alert')).toHaveAttribute(
      'data-error-background',
      'gradient',
    );
    expect(screen.getByRole('alert').style.background).toContain(
      'linear-gradient',
    );
  });
});
