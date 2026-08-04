import type { Meta, StoryObj } from '@storybook/react';
import { Empty } from '../src/components/Empty';
import styles from './story.module.css';

const meta: Meta<typeof Empty> = {
  title: 'Internal/Empty',
  component: Empty,
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
};

export default meta;

type Story = StoryObj<typeof Empty>;

export const Default: Story = {};

export const CustomCopy: Story = {
  args: {
    title: 'No users found',
    description: 'Try adjusting your filters or invite a teammate.',
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
