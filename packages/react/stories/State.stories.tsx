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

export const LoadingCustomCopy: Story = {
  name: 'Loading / custom copy',
  args: {
    loading: true,
    loadingTitle: 'Fetching users',
    loadingDescription: 'This usually takes less than a second.',
  },
};

export const LoadingTable: Story = {
  name: 'Loading / table',
  decorators: [
    (Story) => (
      <div className={styles.wideFrame}>
        <Story />
      </div>
    ),
  ],
  args: {
    loading: true,
    layout: 'table',
  },
};

export const LoadingGrid: Story = {
  name: 'Loading / grid',
  decorators: [
    (Story) => (
      <div className={styles.wideFrame}>
        <Story />
      </div>
    ),
  ],
  args: {
    loading: true,
    layout: 'grid',
  },
};

export const LoadingList: Story = {
  name: 'Loading / list',
  args: {
    loading: true,
    layout: 'list',
  },
};

export const LoadingCustomComponent: Story = {
  name: 'Loading / custom component',
  args: {
    loading: true,
    loadingComponent: (
      <div className={styles.customPanel}>Custom loading experience</div>
    ),
  },
};

export const ErrorState: Story = {
  name: 'Error',
  args: {
    error: new Error('Unable to fetch users.'),
  },
};

export const ErrorCustomCopy: Story = {
  name: 'Error / custom copy',
  args: {
    error: new Error('network'),
    errorTitle: 'Could not load users',
    errorDescription: 'Check your connection and try again.',
  },
};

export const ErrorWithRetry: Story = {
  name: 'Error / retry',
  args: {
    error: new Error('Unable to fetch users.'),
    onRetry: () => undefined,
  },
};

export const ErrorCustomComponent: Story = {
  name: 'Error / custom component',
  args: {
    error: true,
    errorComponent: (
      <div className={styles.customPanel}>Custom error experience</div>
    ),
  },
};

export const Empty: Story = {
  args: {
    empty: true,
  },
};

export const EmptyCustomCopy: Story = {
  name: 'Empty / custom copy',
  args: {
    empty: true,
    emptyTitle: 'No users found',
    emptyDescription: 'Try adjusting your filters or invite a teammate.',
  },
};

export const EmptyCustomComponent: Story = {
  name: 'Empty / custom component',
  args: {
    empty: true,
    emptyComponent: (
      <div className={styles.customPanel}>Custom empty experience</div>
    ),
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

export const DarkThemeTable: Story = {
  name: 'Dark theme: table skeleton',
  decorators: [
    (Story) => (
      <div className={styles.darkCanvas} data-statekit-theme="dark">
        <Story />
      </div>
    ),
  ],
  args: {
    loading: true,
    layout: 'table',
  },
};
