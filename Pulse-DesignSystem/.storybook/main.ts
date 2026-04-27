import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../ui/**/src/**/*.stories.ts', '../docs/**/*.mdx'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../assets'],
};

export default config;
