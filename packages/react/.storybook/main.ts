import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  staticDirs: [
    {
      from: '../../../assets/branding',
      to: '/branding',
    },
  ],
  managerHead: (head) => `
    ${head}
    <link rel="icon" type="image/svg+xml" href="/branding/favicon.svg" />
  `,
  previewHead: (head) => `
    ${head}
    <link rel="icon" type="image/svg+xml" href="/branding/favicon.svg" />
  `,
};

export default config;
