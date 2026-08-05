import type { Meta, StoryObj } from '@storybook/react';
import { Loading } from '../src/components/Loading';
import {
  LOADER_COLOR_GRADIENT,
  LOADER_COLOR_PRIMARY,
  LOADER_TYPE,
} from '../src/constants/loader';
import styles from './story.module.css';

const meta: Meta<typeof Loading> = {
  title: 'Internal/Loading',
  component: Loading,
  parameters: {
    layout: 'padded',
  },
  args: {
    type: 'spinner',
    size: 'lg',
    color: LOADER_COLOR_PRIMARY,
    speed: 'normal',
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

export const GradientSpinner: Story = {
  args: {
    color: LOADER_COLOR_GRADIENT,
    text: 'Loading your data...',
    subtext: 'Please wait while we load the data.',
  },
};

export const Dots: Story = {
  args: { type: LOADER_TYPE.dots, color: LOADER_COLOR_GRADIENT },
};

export const Pulse: Story = {
  args: { type: LOADER_TYPE.pulse },
};

export const Bars: Story = {
  args: { type: LOADER_TYPE.bars, color: LOADER_COLOR_GRADIENT },
};

export const Infinity: Story = {
  args: { type: LOADER_TYPE.infinity, color: LOADER_COLOR_GRADIENT },
};

export const Ring: Story = {
  args: { type: LOADER_TYPE.ring, color: LOADER_COLOR_GRADIENT },
};

export const Orbit: Story = {
  args: { type: LOADER_TYPE.orbit },
};

export const Spokes: Story = {
  args: { type: LOADER_TYPE.spokes, color: LOADER_COLOR_GRADIENT },
};

export const Activity: Story = {
  args: { type: LOADER_TYPE.activity, color: LOADER_COLOR_PRIMARY },
};

export const Ripple: Story = {
  args: { type: LOADER_TYPE.ripple, color: LOADER_COLOR_GRADIENT },
};

export const Aurora: Story = {
  args: { type: LOADER_TYPE.aurora, color: LOADER_COLOR_GRADIENT },
};

export const Bloom: Story = {
  args: { type: LOADER_TYPE.bloom, color: LOADER_COLOR_GRADIENT },
};

export const Comet: Story = {
  args: { type: LOADER_TYPE.comet, color: LOADER_COLOR_GRADIENT },
};

export const Eclipse: Story = {
  args: { type: LOADER_TYPE.eclipse, color: LOADER_COLOR_GRADIENT },
};

export const Gauge: Story = {
  args: {
    type: LOADER_TYPE.gauge,
    color: LOADER_COLOR_PRIMARY,
  },
};

export const ProgressCircle: Story = {
  args: {
    type: LOADER_TYPE.progressCircle,
    color: LOADER_COLOR_GRADIENT,
    progress: 72,
  },
};

export const ProgressBar: Story = {
  args: {
    type: LOADER_TYPE.progressBar,
    color: LOADER_COLOR_GRADIENT,
    progress: 72,
    size: 'md',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Loading key={size} size={size} text={size.toUpperCase()} subtext="" />
      ))}
    </div>
  ),
};

export const DarkTheme: Story = {
  args: {
    theme: 'dark',
    color: LOADER_COLOR_GRADIENT,
    text: 'Loading your data...',
  },
  decorators: [
    (Story) => (
      <div className={styles.darkCanvas} data-statekit-theme="dark">
        <Story />
      </div>
    ),
  ],
};
