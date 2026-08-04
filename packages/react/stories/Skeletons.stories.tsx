import type { Meta, StoryObj } from '@storybook/react';
import { GridSkeleton } from '../src/components/skeletons/GridSkeleton';
import { ListSkeleton } from '../src/components/skeletons/ListSkeleton';
import { TableSkeleton } from '../src/components/skeletons/TableSkeleton';
import styles from './story.module.css';

const meta: Meta = {
  title: 'Internal/Skeletons',
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div className={styles.wideFrame}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj;

export const Table: Story = {
  render: () => <TableSkeleton />,
};

export const Grid: Story = {
  render: () => <GridSkeleton />,
};

export const List: Story = {
  render: () => <ListSkeleton />,
};

export const TableDark: Story = {
  name: 'Table / dark',
  decorators: [
    (Story) => (
      <div className={styles.darkCanvas} data-statekit-theme="dark">
        <Story />
      </div>
    ),
  ],
  render: () => <TableSkeleton />,
};
