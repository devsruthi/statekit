import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { State } from '../src/components/State';
import { GridSkeleton } from '../src/components/skeletons/GridSkeleton';
import { ListSkeleton } from '../src/components/skeletons/ListSkeleton';
import { TableSkeleton } from '../src/components/skeletons/TableSkeleton';

describe('layout skeletons', () => {
  it('renders TableSkeleton as an accessible busy status', () => {
    const { container } = render(<TableSkeleton />);

    expect(screen.getByRole('status', { busy: true })).toBeInTheDocument();
    expect(screen.getByText('Loading table')).toBeInTheDocument();
    expect(
      container.querySelector('[data-statekit-skeleton="table"]'),
    ).not.toBeNull();
  });

  it('renders GridSkeleton as an accessible busy status', () => {
    const { container } = render(<GridSkeleton />);

    expect(screen.getByRole('status', { busy: true })).toBeInTheDocument();
    expect(screen.getByText('Loading grid')).toBeInTheDocument();
    expect(
      container.querySelector('[data-statekit-skeleton="grid"]'),
    ).not.toBeNull();
  });

  it('renders ListSkeleton as an accessible busy status', () => {
    const { container } = render(<ListSkeleton />);

    expect(screen.getByRole('status', { busy: true })).toBeInTheDocument();
    expect(screen.getByText('Loading list')).toBeInTheDocument();
    expect(
      container.querySelector('[data-statekit-skeleton="list"]'),
    ).not.toBeNull();
  });
});

describe('State layout prop', () => {
  it('renders the default loading UI when layout is omitted', () => {
    render(
      <State loading>
        <div>Users table</div>
      </State>,
    );

    expect(
      screen.getByRole('heading', { name: 'Loading' }),
    ).toBeInTheDocument();
    expect(screen.queryByText('Loading table')).not.toBeInTheDocument();
  });

  it('renders TableSkeleton when layout is table', () => {
    const { container } = render(
      <State loading layout="table">
        <div>Users table</div>
      </State>,
    );

    expect(
      container.querySelector('[data-statekit-skeleton="table"]'),
    ).not.toBeNull();
    expect(screen.getByText('Loading table')).toBeInTheDocument();
    expect(screen.queryByText('Users table')).not.toBeInTheDocument();
  });

  it('renders GridSkeleton when layout is grid', () => {
    const { container } = render(
      <State loading layout="grid">
        <div>Cards</div>
      </State>,
    );

    expect(
      container.querySelector('[data-statekit-skeleton="grid"]'),
    ).not.toBeNull();
    expect(screen.getByText('Loading grid')).toBeInTheDocument();
  });

  it('renders ListSkeleton when layout is list', () => {
    const { container } = render(
      <State loading layout="list">
        <div>Items</div>
      </State>,
    );

    expect(
      container.querySelector('[data-statekit-skeleton="list"]'),
    ).not.toBeNull();
    expect(screen.getByText('Loading list')).toBeInTheDocument();
  });

  it('ignores layout when not loading', () => {
    render(
      <State layout="table">
        <div>Users table</div>
      </State>,
    );

    expect(screen.getByText('Users table')).toBeInTheDocument();
    expect(screen.queryByText('Loading table')).not.toBeInTheDocument();
  });
});
