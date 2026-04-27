import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { VcCarousel } from './carousel.component';
import { VcCarouselItem } from './carousel-item/carousel-item.component';

const meta: Meta<VcCarousel> = {
  title: 'Layout/Carousel',
  component: VcCarousel,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [VcCarouselItem],
    }),
  ],
  argTypes: {
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Color theme for controls and indicators',
    },
    width: {
      control: 'number',
      description: 'Width of the carousel viewport in pixels',
    },
    height: {
      control: 'number',
      description: 'Height of the carousel viewport in pixels',
    },
    size: {
      control: 'select',
      options: ['md', 'lg'],
      description: 'Size of controls and indicators',
    },
    indicatorType: {
      control: 'select',
      options: ['dot', 'line'],
      description: 'Style of the slide indicators',
    },
    indicatorsFramed: {
      control: 'boolean',
      description: 'Whether indicators have a framed background',
    },
    wrapSlides: {
      control: 'boolean',
      description: 'Whether slides wrap around at the ends',
    },
    cols: {
      control: 'number',
      description: 'Number of columns (items visible per slide)',
    },
    columnGap: {
      control: 'number',
      description: 'Gap between columns in pixels',
    },
    innerHorizontalPadding: {
      control: 'number',
      description: 'Inner horizontal padding in pixels',
    },
    innerVerticalPadding: {
      control: 'number',
      description: 'Inner vertical padding in pixels',
    },
    showSlideControlsOnHover: {
      control: 'boolean',
      description: 'Only show prev/next controls on hover',
    },
    showCarouselIndicators: {
      control: 'boolean',
      description: 'Whether to show slide indicators',
    },
    showCarouselControlsInside: {
      control: 'boolean',
      description: 'Whether controls are rendered inside the carousel body',
    },
  },
};
export default meta;
type Story = StoryObj<VcCarousel>;

const slideStyle =
  'display: flex; align-items: center; justify-content: center; background: #e2e8f0; border-radius: 8px; height: 100%; font-weight: 600; font-size: 1.25rem; color: #334155;';

// --- Default ---
export const Default: Story = {
  args: {
    width: 600,
    height: 300,
    theme: 'dark',
    size: 'md',
    indicatorType: 'dot',
    indicatorsFramed: true,
    wrapSlides: true,
    cols: 1,
    columnGap: 0,
    showSlideControlsOnHover: true,
    showCarouselIndicators: true,
    showCarouselControlsInside: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <vc-carousel
        [width]="width"
        [height]="height"
        [theme]="theme"
        [size]="size"
        [indicatorType]="indicatorType"
        [indicatorsFramed]="indicatorsFramed"
        [wrapSlides]="wrapSlides"
        [cols]="cols"
        [columnGap]="columnGap"
        [showSlideControlsOnHover]="showSlideControlsOnHover"
        [showCarouselIndicators]="showCarouselIndicators"
        [showCarouselControlsInside]="showCarouselControlsInside"
      >
        <vc-carousel-item><div style="${slideStyle}">Slide 1</div></vc-carousel-item>
        <vc-carousel-item><div style="${slideStyle}">Slide 2</div></vc-carousel-item>
        <vc-carousel-item><div style="${slideStyle}">Slide 3</div></vc-carousel-item>
        <vc-carousel-item><div style="${slideStyle}">Slide 4</div></vc-carousel-item>
      </vc-carousel>
    `,
  }),
};

// --- Light Theme ---
export const LightTheme: Story = {
  render: () => ({
    template: `
      <vc-carousel [width]="600" [height]="300" theme="light" [wrapSlides]="true">
        <vc-carousel-item><div style="${slideStyle} background: #1e293b; color: #f1f5f9;">Slide 1</div></vc-carousel-item>
        <vc-carousel-item><div style="${slideStyle} background: #1e293b; color: #f1f5f9;">Slide 2</div></vc-carousel-item>
        <vc-carousel-item><div style="${slideStyle} background: #1e293b; color: #f1f5f9;">Slide 3</div></vc-carousel-item>
      </vc-carousel>
    `,
  }),
};

// --- Line Indicators ---
export const LineIndicators: Story = {
  render: () => ({
    template: `
      <vc-carousel [width]="600" [height]="300" indicatorType="line" [wrapSlides]="true">
        <vc-carousel-item><div style="${slideStyle}">Slide 1</div></vc-carousel-item>
        <vc-carousel-item><div style="${slideStyle}">Slide 2</div></vc-carousel-item>
        <vc-carousel-item><div style="${slideStyle}">Slide 3</div></vc-carousel-item>
      </vc-carousel>
    `,
  }),
};

// --- Multiple Columns ---
export const MultipleColumns: Story = {
  render: () => ({
    template: `
      <vc-carousel [width]="800" [height]="200" [cols]="3" [columnGap]="16" [wrapSlides]="true">
        <vc-carousel-item><div style="${slideStyle}">Item 1</div></vc-carousel-item>
        <vc-carousel-item><div style="${slideStyle}">Item 2</div></vc-carousel-item>
        <vc-carousel-item><div style="${slideStyle}">Item 3</div></vc-carousel-item>
        <vc-carousel-item><div style="${slideStyle}">Item 4</div></vc-carousel-item>
        <vc-carousel-item><div style="${slideStyle}">Item 5</div></vc-carousel-item>
        <vc-carousel-item><div style="${slideStyle}">Item 6</div></vc-carousel-item>
      </vc-carousel>
    `,
  }),
};

// --- No Wrap ---
export const NoWrap: Story = {
  render: () => ({
    template: `
      <vc-carousel [width]="600" [height]="300" [wrapSlides]="false">
        <vc-carousel-item><div style="${slideStyle}">Slide 1</div></vc-carousel-item>
        <vc-carousel-item><div style="${slideStyle}">Slide 2</div></vc-carousel-item>
        <vc-carousel-item><div style="${slideStyle}">Slide 3</div></vc-carousel-item>
      </vc-carousel>
    `,
  }),
};

// --- Controls Outside ---
export const ControlsOutside: Story = {
  render: () => ({
    template: `
      <vc-carousel [width]="600" [height]="300" [showCarouselControlsInside]="false" [wrapSlides]="true">
        <vc-carousel-item><div style="${slideStyle}">Slide 1</div></vc-carousel-item>
        <vc-carousel-item><div style="${slideStyle}">Slide 2</div></vc-carousel-item>
        <vc-carousel-item><div style="${slideStyle}">Slide 3</div></vc-carousel-item>
      </vc-carousel>
    `,
  }),
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
            <vc-carousel [width]="380" [height]="180" [showCarouselIndicators]="true" indicatorType="dot" [wrapSlides]="true">
              <vc-carousel-item><div style="${slideStyle}">Slide 1 of 3</div></vc-carousel-item>
              <vc-carousel-item><div style="${slideStyle}">Slide 2 of 3</div></vc-carousel-item>
              <vc-carousel-item><div style="${slideStyle}">Slide 3 of 3</div></vc-carousel-item>
            </vc-carousel>
            <p class="dnd-caption">Show dot or line indicators so users know how many slides exist and which one they're on.</p>
          </div>
        </div>
        <div class="dnd-dont">
          <div class="dnd-dont-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 3L3 11M3 3l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Don't
          </div>
          <div class="dnd-dont-body">
            <vc-carousel [width]="380" [height]="180" [showCarouselIndicators]="false" [showSlideControlsOnHover]="false" [wrapSlides]="true">
              <vc-carousel-item><div style="${slideStyle}">Slide A</div></vc-carousel-item>
              <vc-carousel-item><div style="${slideStyle}">Slide B</div></vc-carousel-item>
              <vc-carousel-item><div style="${slideStyle}">Slide C</div></vc-carousel-item>
            </vc-carousel>
            <p class="dnd-caption">Don't auto-advance a carousel without giving users a way to pause or control it — it's disorienting and inaccessible.</p>
          </div>
        </div>
      </div>
    `,
  }),
};
