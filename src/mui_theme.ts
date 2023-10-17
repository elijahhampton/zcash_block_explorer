
import { createTheme } from '@mui/material';
import { green, purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          cursor: 'pointer',
          fontSize: 12
        }
      }
    },
    MuiTable: {
      styleOverrides: {
        'root': {
          borderColor: 'red'
        }
      }
    }
  }
});

export default theme