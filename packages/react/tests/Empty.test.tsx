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
      screen.getByRole('heading', { name: 'No records found' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('There are no records to display.'),
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

  it('supports a custom empty icon that replaces the default SVG', () => {
    const { container } = render(
      <Empty icon={<span data-testid="custom-empty-icon">∅</span>} />,
    );

    expect(screen.getByTestId('custom-empty-icon')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeNull();
  });

  it('renders a default SVG empty icon without a circular badge', () => {
    const { container } = render(<Empty />);

    expect(container.querySelector('svg')).not.toBeNull();
    expect(container.querySelector('[class*="badge"]')).toBeNull();
    expect(container.querySelector('[class*="media"]')).toBeNull();
  });

  it('supports solid and gradient backgrounds with opacity', () => {
    const { rerender } = render(<Empty />);
    expect(screen.getByRole('status')).toHaveAttribute(
      'data-empty-background',
      'none',
    );

    rerender(<Empty background={['#3558A0']} backgroundOpacity={0.2} />);
    expect(screen.getByRole('status')).toHaveAttribute(
      'data-empty-background',
      'solid',
    );
    expect(screen.getByRole('status').style.background).toContain('color-mix');

    rerender(
      <Empty background={['#3558A0', '#06B6D4']} backgroundOpacity={0.3} />,
    );
    expect(screen.getByRole('status')).toHaveAttribute(
      'data-empty-background',
      'gradient',
    );
    expect(screen.getByRole('status').style.background).toContain(
      'linear-gradient',
    );
  });
});
