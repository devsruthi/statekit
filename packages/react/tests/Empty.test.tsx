import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Empty } from '../src/components/Empty';

describe('Empty', () => {
  it('renders an accessible status region', () => {
    render(<Empty />);

    const status = screen.getByRole('status');
    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(status.tagName).toBe('SECTION');
    expect(
      screen.getByRole('heading', { name: 'No data' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('There is nothing to display yet.'),
    ).toBeInTheDocument();
  });

  it('supports custom copy', () => {
    render(
      <Empty
        title="No users found"
        description="Invite a teammate to get started."
      />,
    );

    expect(
      screen.getByRole('heading', { name: 'No users found' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Invite a teammate to get started.'),
    ).toBeInTheDocument();
  });

  it('marks decorative media as hidden from assistive tech', () => {
    const { container } = render(<Empty />);
    const media = container.querySelector('[aria-hidden="true"]');
    expect(media).not.toBeNull();
  });
});
