import type { Meta, StoryObj } from '@storybook/react';
import { Loading } from '../src/components/Loading';
import styles from './story.module.css';

const meta: Meta<typeof Loading> = {
  title: 'Internal/Loading',
  component: Loading,
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

type Story = StoryObj<typeof Loading>;

export const Default: Story = {};

export const CustomCopy: Story = {
  args: {
    title: 'Fetching users',
    description: 'This usually takes less than a second.',
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
