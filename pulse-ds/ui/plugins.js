const plugin = require('tailwindcss/plugin');

const typography = plugin(function ({ addUtilities, theme, e }) {
  const fontSizes = theme('fontSize');
  const fontWeights = theme('fontWeight');
  const colors = theme('colors');

  const headingUtilities = {
    '.heading-1': {
      color: colors['primary'][500],
      'font-size': '35px',
      'font-weight': fontWeights.medium,
      'line-height': '300%',
      'letter-spacing': '-1.5%',
    },
    '.heading-2': {
      color: colors['primary'][500],
      'font-size': '29px',
      'font-weight': fontWeights.medium,
      'line-height': '250%',
      'letter-spacing': '-0.5%',
    },
    '.heading-3': {
      color: colors['primary'][500],
      'font-size': '24px',
      'font-weight': fontWeights.medium,
      'line-height': '200%',
      'letter-spacing': '-0.5%',
    },
    '.heading-4': {
      color: colors['primary'][500],
      'font-size': '20px',
      'font-weight': fontWeights.medium,
      'line-height': '200%',
      'letter-spacing': '0.25%',
    },
    '.heading-5': {
      color: colors['primary'][500],
      'font-size': '18px',
      'font-weight': fontWeights.medium,
      'line-height': '150%',
      'letter-spacing': '0.15%',
    },
    '.heading-6': {
      color: colors['primary'][500],
      'font-size': '16px',
      'font-weight': fontWeights.semibold,
      'line-height': '150%',
      'letter-spacing': '0.15%',
    },
  };

  const subHeadingUtilities = {
    '.subheading-1': {
      color: colors['primary'][500],
      'font-size': fontSizes.lg,
      'font-weight': fontWeights.medium,
      'line-height': '150%',
      'letter-spacing': '0.15%',
    },
    '.subheading-2': {
      color: colors['primary'][500],
      'font-size': fontSizes.base,
      'font-weight': fontWeights.medium,
      'line-height': '140%',
      'letter-spacing': '0.15%',
    },
  };

  const labelUtilities = {
    '.label-1': {
      color: colors['primary'][500],
      'font-size': fontSizes.base,
      'font-weight': fontWeights.medium,
    },
    '.label-2': {
      color: colors['primary'][500],
      'font-size': fontSizes.base,
    },
    '.label-3': {
      color: colors['primary'][300],
      'font-size': fontSizes.sm,
    },
  };

  const textUtilities = Object.entries(fontSizes).flatMap(
    ([sizeKey, sizeValue]) => {
      return Object.entries(fontWeights).map(([weightKey, weightValue]) => {
        const fontSize = Array.isArray(sizeValue) ? sizeValue[0] : sizeValue;
        const additionalStyles = Array.isArray(sizeValue) ? sizeValue[1] : {};

        return {
          [`.${e(`text-${sizeKey}-${weightKey}`)}`]: {
            'font-size': `${fontSize}`,
            'font-weight': `${weightValue}`,
            'line-height': additionalStyles.lineHeight || 'normal',
            'letter-spacing': additionalStyles.letterSpacing || 'normal',
          },
        };
      });
    },
  );

  const utilities = [
    headingUtilities,
    subHeadingUtilities,
    labelUtilities,
    ...textUtilities,
  ];
  addUtilities(utilities);
});

// function generateTypography(
//   color,
//   fontSize,
//   fontWeight,
//   lineHeight,
//   letterSpacing,
//   textTransform,
// ) {
//   return {
//     color: color,
//     'font-size': fontSize,
//     'font-weight': fontWeight,
//     'line-height': lineHeight,
//     'letter-spacing': letterSpacing,
//     'text-transform': textTransform,
//   };
// }

module.exports = typography;
