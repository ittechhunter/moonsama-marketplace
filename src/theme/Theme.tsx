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
    MuiCssBaseline: {
      '@global': {
        '*::-webkit-scrollbar': {
          width: '0.5em',
          cursor: 'pointer',
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(210, 2, 62, 0.6)',
          outline: '0',
        },
      },
    },
    MuiButton: {
      root: {
        borderRadius: 0,
        textTransform: 'none',
        height: defaultTheme.spacing(5),
        fontSize: defaultTheme.typography.fontSize,
      },
      outlinedPrimary: {
        color: colors.text?.primary || 'white',
        borderColor: colors.text?.disabled || 'white',
        '&:hover': {
          backgroundColor: '#111',
          color: 'white',
          borderColor: 'inherit',
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
        borderRadius: 0,
        height: defaultTheme.spacing(5),
        width: '380px',
        maxWidth: '100%',
        paddingRight: '0 !important',

        [defaultTheme.breakpoints.down('sm')]: {
          width: '100%',
        },
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
    MuiDrawer: {
      paper: {
        backgroundColor: '#000',
        padding: '20px',
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
    MuiTable: {
      root: {
        backgroundColor: '#111',
        border: '0 !important',
      },
    },
    MuiTableRow: {
      root: {
        borderBottom: '1px solid #000',
      },
    },
    MuiTableCell: {
      root: {
        border: '0 !important',
      },
      head: {
        lineHeight: 1,
      },
    },
    MuiSvgIcon: {
      root: {
        color: '#fff',
      },
    },
    MuiPaper: {
      root: {
        '& a': {
          textDecoration: 'none',
        },
        '& a:hover': {
          textDecoration: 'underline',
          color: '#d2023e',
        },
      },
    },
    MuiFormControl: {
      root: {
        maxWidth: '100%',
      },
    },
    MuiInputAdornment: {
      positionStart: {
        '& .MuiOutlinedInput-root': {
          borderRadius: '8px 0 0 8px',
        },
      },
    },
    MuiGrid: {
      root: {
        justifyContent: 'center',
      },
    },
    MuiCircularProgress: {
      root: {
        margin: '0 auto',
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
