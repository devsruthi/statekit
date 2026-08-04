import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Loading } from '../src/components/Loading';

describe('Loading', () => {
  it('renders an accessible busy status region', () => {
    render(<Loading />);

    const status = screen.getByRole('status', { busy: true });
    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(status.tagName).toBe('SECTION');
    expect(
      screen.getByRole('heading', { name: 'Loading' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Please wait while content loads.'),
    ).toBeInTheDocument();
  });

  it('supports custom copy', () => {
    render(<Loading title="Fetching users" description="Almost ready." />);

    expect(
      screen.getByRole('heading', { name: 'Fetching users' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Almost ready.')).toBeInTheDocument();
  });

  it('marks decorative media as hidden from assistive tech', () => {
    const { container } = render(<Loading />);
    const media = container.querySelector('[aria-hidden="true"]');
    expect(media).not.toBeNull();
  });
});
