import { PaletteOptions } from '@material-ui/core/styles/createPalette';

const primary = '#2DE2E6';
const secondary = '#FF3864';
const black = '#0D0221';
const white = '#fcfbfd';
const grey = '#2E2157';
const text = '#777E90';
const lightBlack = '#241734';

const v2_primary = '#006B38FF';
const v2_secondary = '#C5C5C5';
const v2_black = '#101820FF';
const v2_white = white;
const v2_grey = '#C5C5C5';
const v2_text = v2_secondary;
const v2_lightBlack = '#0A1826';
const danger = '#d63535';

export const palette: PaletteOptions = {
  error: {
    main: danger,
  },
  primary: {
    main: v2_primary,
  },
  secondary: {
    main: v2_secondary,
  },
  background: {
    default: v2_black,
    paper: v2_lightBlack,
  },
  text: {
    primary: v2_white,
    secondary: v2_text,
    disabled: v2_grey,
  },
  common: {
    white: v2_white,
  },
  grey: {
    '500': v2_secondary,
    '900': '#3E3E3E',
  },
};

export const lightPalette: PaletteOptions = {
  ...palette,
  background: {
    default: white,
  },
  text: {
    primary: black,
    secondary: text,
    disabled: grey,
  },
};
