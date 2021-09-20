import { ReactNode } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  ThemeProvider,
  createTheme,
  ThemeOptions,
} from '@material-ui/core/styles';

import { useThemeOptions } from 'hooks';
import { typography } from './typography';
import { lightPalette, palette } from './palette';
import {
  PaletteOptions,
  SimplePaletteColorOptions,
} from '@material-ui/core/styles/createPalette';

const defaultTheme = createTheme();

const getDefaultOptions = (colors: PaletteOptions): ThemeOptions => ({
  typography,
  overrides: {
    MuiButton: {
      root: {
        borderRadius: '4px',
        textTransform: 'none',
        height: defaultTheme.spacing(5),
        fontSize: defaultTheme.typography.fontSize,
      },
      outlinedPrimary: {
        color: colors.text?.primary || 'white',
        borderColor: colors.text?.disabled || 'white',
        '&:hover': {
          backgroundColor: (colors.primary as SimplePaletteColorOptions).main,
          color: colors.background?.default || 'black',
        },
      },
      contained: {
        '&.Mui-disabled': {
          backgroundColor: `${defaultTheme.palette.grey[900]}  !important`,
          color: defaultTheme.palette.grey[800] + ' !important',
        },
      },
    },
    MuiToolbar: {
      regular: {
        [defaultTheme.breakpoints.up('sm')]: {
          minHeight: defaultTheme.spacing(10),
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: '4px',
        height: defaultTheme.spacing(5),
        minWidth: '380px',
        maxWidth: '100%',
        paddingRight: '0 !important'
      },
      notchedOutline: {
        borderColor: colors.text?.disabled || 'white',
      },
    },
    MuiDialog: {
      paper: {
        backgroundColor: colors.background?.default,
        borderRadius: defaultTheme.spacing(2),
      },
    },
    MuiIconButton: {
      root: {
        color: 'white',
      },
    },
    MuiSelect: {
      icon: {
        color: 'white',
      },
    },
    MuiInputAdornment: {
      positionStart: {
        '& .MuiOutlinedInput-root': {
          borderRadius: '8px 0 0 8px',
        },
      },
    },
  },
});

const themeOptions: ThemeOptions = {
  palette,
  ...getDefaultOptions(palette),
};

const theme = createTheme(themeOptions);

const lightTheme = createTheme({
  palette: lightPalette,
  ...getDefaultOptions(lightPalette),
});

const Theme = ({ children }: { children: ReactNode }) => {
  const { isDarkTheme } = useThemeOptions();

  return (
    <ThemeProvider theme={isDarkTheme ? theme : lightTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
