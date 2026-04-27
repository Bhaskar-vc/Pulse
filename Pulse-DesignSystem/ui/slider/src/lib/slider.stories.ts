import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { VSlider } from './slider.component';

const meta: Meta<VSlider> = {
  title: 'Form Controls/Slider',
  component: VSlider,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [FormsModule] })],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label above the slider',
    },
    hint: {
      control: 'text',
      description: 'Hint text below the slider',
    },
    min: {
      control: 'number',
      description: 'Minimum value',
    },
    max: {
      control: 'number',
      description: 'Maximum value',
    },
    step: {
      control: 'number',
      description: 'Step increment',
    },
    showValue: {
      control: 'boolean',
      description: 'Whether to show the current value',
    },
    valueSuffix: {
      control: 'text',
      description: 'Suffix appended to the value display (e.g. %, px)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Slider size',
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'error', 'warning'],
      description: 'Thumb and fill color',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the slider is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<VSlider>;

export const Default: Story = {
  args: {
    label: 'Volume',
    min: 0,
    max: 100,
    step: 1,
    showValue: true,
    valueSuffix: '%',
    size: 'md',
    color: 'primary',
    disabled: false,
  },
};

export const WithHint: Story = {
  args: {
    label: 'Brightness',
    hint: 'Adjust screen brightness level',
    min: 0,
    max: 100,
    step: 5,
    showValue: true,
    valueSuffix: '%',
    size: 'md',
    color: 'primary',
    disabled: false,
  },
};

export const SuccessColor: Story = {
  args: {
    label: 'Progress',
    min: 0,
    max: 100,
    step: 1,
    showValue: true,
    valueSuffix: '%',
    size: 'md',
    color: 'success',
    disabled: false,
  },
};

export const WarningColor: Story = {
  args: {
    label: 'Risk level',
    min: 0,
    max: 10,
    step: 1,
    showValue: true,
    size: 'md',
    color: 'warning',
    disabled: false,
  },
};

export const ErrorColor: Story = {
  args: {
    label: 'Temperature',
    min: 0,
    max: 100,
    step: 1,
    showValue: true,
    valueSuffix: '°C',
    size: 'md',
    color: 'error',
    disabled: false,
  },
};

export const Small: Story = {
  args: {
    label: 'Small slider',
    min: 0,
    max: 100,
    step: 1,
    showValue: true,
    size: 'sm',
    color: 'primary',
    disabled: false,
  },
};

export const Large: Story = {
  args: {
    label: 'Large slider',
    min: 0,
    max: 100,
    step: 1,
    showValue: true,
    size: 'lg',
    color: 'primary',
    disabled: false,
  },
};

export const CustomRange: Story = {
  args: {
    label: 'Price range',
    min: 100,
    max: 10000,
    step: 100,
    showValue: true,
    valueSuffix: ' USD',
    size: 'md',
    color: 'primary',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled slider',
    min: 0,
    max: 100,
    step: 1,
    showValue: true,
    size: 'md',
    color: 'primary',
    disabled: true,
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
            <div style="width:100%;max-width:320px;">
              <v-slider label="Volume" hint="0 = silent · 100 = max" [min]="0" [max]="100" [step]="1" [showValue]="true" valueSuffix="%" size="md" color="primary"></v-slider>
            </div>
            <p class="dnd-caption">Label the min and max values clearly so users understand the full range of the control.</p>
          </div>
        </div>
        <div class="dnd-dont">
          <div class="dnd-dont-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 3L3 11M3 3l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Don't
          </div>
          <div class="dnd-dont-body">
            <div style="width:100%;max-width:320px;">
              <v-slider label="Quantity" [min]="1" [max]="9999" [step]="1" [showValue]="true" size="md" color="primary"></v-slider>
            </div>
            <p class="dnd-caption">Don't use a slider for precise numeric input over a large range — use a number input field instead where users can type an exact value.</p>
          </div>
        </div>
      </div>
    `,
  }),
};
