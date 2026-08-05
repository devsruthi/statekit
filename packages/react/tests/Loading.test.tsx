import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Loading } from '../src/components/Loading';

describe('Loading', () => {
  it('renders an accessible busy status region with defaults', () => {
    const { container } = render(<Loading />);

    const status = screen.getByRole('status', { busy: true });
    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(status).toHaveAttribute('data-loader-type', 'spinner');
    expect(status).toHaveAttribute('data-loader-size', 'lg');
    expect(status).toHaveAttribute('data-loader-color', 'solid');
    expect(status.tagName).toBe('SECTION');
    expect(
      screen.getByRole('heading', { name: 'Loading' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Please wait while content loads.'),
    ).toBeInTheDocument();
    expect(container.querySelector('[data-loader="spinner"]')).not.toBeNull();
  });

  it('supports custom copy via text/subtext', () => {
    render(<Loading text="Fetching users" subtext="Almost ready." />);

    expect(
      screen.getByRole('heading', { name: 'Fetching users' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Almost ready.')).toBeInTheDocument();
  });

  it('supports legacy title/description props', () => {
    render(<Loading title="Fetching users" description="Almost ready." />);

    expect(
      screen.getByRole('heading', { name: 'Fetching users' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Almost ready.')).toBeInTheDocument();
  });

  it('renders alternate loader types', () => {
    const { container, rerender } = render(<Loading type="dots" />);
    expect(container.querySelector('[data-loader="dots"]')).not.toBeNull();

    rerender(<Loading type="progress-circle" progress={72} />);
    expect(
      container.querySelector('[data-loader="progress-circle"]'),
    ).not.toBeNull();
    expect(screen.getByText('72%')).toBeInTheDocument();
  });

  it('uses a single color as a solid fill', () => {
    const { container } = render(<Loading color={['#06B6D4']} />);

    const graphic = container.querySelector('[data-loader="spinner"]');
    expect(graphic).not.toBeNull();
    expect(
      (graphic as HTMLElement).style.getPropertyValue('--sk-loader-from'),
    ).toBe('#06B6D4');
    expect(
      (graphic as HTMLElement).style.getPropertyValue('--sk-loader-to'),
    ).toBe('#06B6D4');
    expect(screen.getByRole('status')).toHaveAttribute(
      'data-loader-color',
      'solid',
    );
  });

  it('uses multiple colors as a gradient', () => {
    const { container } = render(<Loading color={['#7C3AED', '#06B6D4']} />);

    const graphic = container.querySelector('[data-loader="spinner"]');
    expect(graphic).not.toBeNull();
    expect(
      (graphic as HTMLElement).style.getPropertyValue('--sk-loader-from'),
    ).toBe('#7C3AED');
    expect(
      (graphic as HTMLElement).style.getPropertyValue('--sk-loader-to'),
    ).toBe('#06B6D4');
    expect(screen.getByRole('status')).toHaveAttribute(
      'data-loader-color',
      'gradient',
    );
  });

  it('marks decorative media as hidden from assistive tech', () => {
    const { container } = render(<Loading />);
    const media = container.querySelector('[aria-hidden="true"]');
    expect(media).not.toBeNull();
  });
});
