import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { VRating } from './rating.component';

const meta: Meta<VRating> = {
  title: 'Form Controls/Rating',
  component: VRating,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [FormsModule] })],
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 10, step: 0.5 },
      description: 'Rating value (0 to max, supports .5 increments)',
    },
    max: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Total number of stars',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    color: {
      control: 'select',
      options: ['yellow', 'purple', 'gray'],
      description: 'Star fill color',
    },
    interactive: {
      control: 'boolean',
      description: 'Allow user interaction',
    },
    count: {
      control: 'number',
      description: 'Optional review count shown in parentheses',
    },
    showValue: {
      control: 'boolean',
      description: 'Show numeric value after stars',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label',
    },
  },
};

export default meta;
type Story = StoryObj<VRating>;

export const Default: Story = {
  args: {
    value: 3.5,
    max: 5,
    size: 'md',
    color: 'yellow',
    interactive: false,
    count: null,
    showValue: false,
  },
};

export const Interactive: Story = {
  args: {
    value: 0,
    max: 5,
    size: 'md',
    color: 'yellow',
    interactive: true,
    showValue: true,
  },
};

export const WithCount: Story = {
  args: {
    value: 4.2,
    max: 5,
    size: 'md',
    color: 'yellow',
    interactive: false,
    count: 128,
    showValue: true,
  },
};

export const Small: Story = {
  args: {
    value: 4,
    max: 5,
    size: 'sm',
    color: 'yellow',
    interactive: false,
  },
};

export const Large: Story = {
  args: {
    value: 4,
    max: 5,
    size: 'lg',
    color: 'yellow',
    interactive: false,
  },
};

export const PurpleColor: Story = {
  args: {
    value: 3,
    max: 5,
    size: 'md',
    color: 'purple',
    interactive: false,
  },
};

export const GrayColor: Story = {
  args: {
    value: 2.5,
    max: 5,
    size: 'md',
    color: 'gray',
    interactive: false,
  },
};

export const HalfStars: Story = {
  args: {
    value: 2.5,
    max: 5,
    size: 'lg',
    color: 'yellow',
    interactive: false,
    showValue: true,
  },
};

export const TenStars: Story = {
  args: {
    value: 7,
    max: 10,
    size: 'md',
    color: 'yellow',
    interactive: true,
    showValue: true,
  },
};

export const DoAndDont: Story = {
  render: () => ({
    template: `
      <div class="dnd-wrap">
        <div class="dnd-do">
          <div class="dnd-do-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l4 4 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Do
          </div>
          <div class="dnd-do-body">
            <div style="display:flex;align-items:center;gap:10px;">
              <v-rating [value]="4.2" [max]="5" size="md" color="yellow" [showValue]="true" [count]="128"></v-rating>
            </div>
            <p class="dnd-caption">Display the numeric score and review count alongside the stars so users have quantitative context.</p>
          </div>
        </div>
        <div class="dnd-dont">
          <div class="dnd-dont-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 3L3 11M3 3l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Don't
          </div>
          <div class="dnd-dont-body">
            <div style="display:flex;flex-direction:column;gap:6px;width:100%;">
              <div style="display:flex;justify-content:space-between;border-bottom:1px solid #eaeaed;padding:6px 0;align-items:center;">
                <span style="font-size:13px;">Product A</span>
                <v-rating [value]="4" [max]="5" size="lg" color="yellow"></v-rating>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;">
                <span style="font-size:13px;">Product B</span>
                <v-rating [value]="3.5" [max]="5" size="lg" color="yellow"></v-rating>
              </div>
            </div>
            <p class="dnd-caption">Don't use large star rating controls in dense tables — the star UI is too wide and disrupts the table layout.</p>
          </div>
        </div>
      </div>
    `,
  }),
};
