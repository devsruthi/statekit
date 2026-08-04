import type { Meta, StoryObj } from '@storybook/react';
import { State } from '../src/components/State';
import styles from './story.module.css';

const meta: Meta<typeof State> = {
  title: 'Components/State',
  component: State,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className={styles.frame}>
        <Story />
      </div>
    ),
  ],
  args: {
    children: <div className={styles.successPanel}>Success content</div>,
  },
};

export default meta;

type Story = StoryObj<typeof State>;

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

export const DarkThemeLoading: Story = {
  name: 'Dark theme: loading',
  decorators: [
    (Story) => (
      <div className={styles.darkCanvas} data-statekit-theme="dark">
        <Story />
      </div>
    ),
  ],
  args: {
    loading: true,
  },
};
