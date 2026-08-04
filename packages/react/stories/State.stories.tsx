import type { Meta, StoryObj } from '@storybook/react';
import { State } from '../src/components/State';

const meta = {
  title: 'Components/State',
  component: State,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    children: (
      <div
        style={{
          padding: '1.5rem',
          border: '1px solid #d4d4d4',
          borderRadius: '0.5rem',
        }}
      >
        Success content
      </div>
    ),
  },
} satisfies Meta<typeof State>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Success: Story = {};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const ErrorState: Story = {
  name: 'Error',
  args: {
    error: new Error('Unable to fetch users.'),
  },
};

export const Empty: Story = {
  args: {
    empty: true,
  },
};

export const PriorityLoadingWins: Story = {
  name: 'Priority: loading wins',
  args: {
    loading: true,
    error: 'This error should not render',
    empty: true,
  },
};

export const PriorityErrorOverEmpty: Story = {
  name: 'Priority: error over empty',
  args: {
    error: 'This error should render',
    empty: true,
  },
};
