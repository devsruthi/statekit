import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { State } from '../src/components/State';

describe('State', () => {
  it('renders children in the success state', () => {
    render(
      <State>
        <div>Users table</div>
      </State>,
    );

    expect(screen.getByText('Users table')).toBeInTheDocument();
  });

  it('renders the loading state when loading is true', () => {
    render(
      <State loading>
        <div>Users table</div>
      </State>,
    );

    expect(screen.getByRole('status', { busy: true })).toBeInTheDocument();
    expect(screen.getByText('Loading')).toBeInTheDocument();
    expect(screen.queryByText('Users table')).not.toBeInTheDocument();
  });

  it('renders the error state when error is truthy', () => {
    render(
      <State error={new Error('Network failed')}>
        <div>Users table</div>
      </State>,
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Network failed')).toBeInTheDocument();
    expect(screen.queryByText('Users table')).not.toBeInTheDocument();
  });

  it('renders a string error message', () => {
    render(
      <State error="Request timed out">
        <div>Users table</div>
      </State>,
    );

    expect(screen.getByText('Request timed out')).toBeInTheDocument();
  });

  it('renders a fallback error message for unknown values', () => {
    render(
      <State error={{ code: 500 }}>
        <div>Users table</div>
      </State>,
    );

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });

  it('renders the empty state when empty is true', () => {
    render(
      <State empty>
        <div>Users table</div>
      </State>,
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('No data')).toBeInTheDocument();
    expect(screen.queryByText('Users table')).not.toBeInTheDocument();
  });

  it('prioritizes loading over error and empty', () => {
    render(
      <State loading error="boom" empty>
        <div>Users table</div>
      </State>,
    );

    expect(screen.getByText('Loading')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.queryByText('No data')).not.toBeInTheDocument();
    expect(screen.queryByText('Users table')).not.toBeInTheDocument();
  });

  it('prioritizes error over empty', () => {
    render(
      <State error="boom" empty>
        <div>Users table</div>
      </State>,
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('boom')).toBeInTheDocument();
    expect(screen.queryByText('No data')).not.toBeInTheDocument();
  });

  it('returns null when there is no active state and no children', () => {
    const { container } = render(<State />);
    expect(container).toBeEmptyDOMElement();
  });

  it('treats falsy error values as inactive', () => {
    render(
      <State error={null}>
        <div>Users table</div>
      </State>,
    );

    expect(screen.getByText('Users table')).toBeInTheDocument();
  });
});
