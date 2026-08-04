import type { Meta, StoryObj } from '@storybook/react';
import { Error as ErrorView } from '../src/components/Error';
import styles from './story.module.css';

const meta: Meta<typeof ErrorView> = {
  title: 'Internal/Error',
  component: ErrorView,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div className={styles.frame}>
        <Story />
      </div>
    ),
  ],
  args: {
    error: new Error('Unable to fetch users.'),
  },
};

export default meta;

type Story = StoryObj<typeof ErrorView>;

export const Default: Story = {};

export const StringError: Story = {
  args: {
    error: 'Request timed out.',
  },
};

export const UnknownError: Story = {
  args: {
    error: { code: 500 },
  },
};

export const DarkTheme: Story = {
  decorators: [
    (Story) => (
      <div className={styles.darkCanvas} data-statekit-theme="dark">
        <Story />
      </div>
    ),
  ],
};
