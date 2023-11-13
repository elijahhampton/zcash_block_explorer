// @ts-nocheck
import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#679598",
      dark: '#3e5a5b',
      darker: '#151e1e',
      light: '#a4c0c1',
      lighter: '#e1eaea'
    },
    secondary: {
      main: "#DAA520", // Soft Gold as the secondary color
    },
    background: {
      default: "#FFFFFF", // White background for general content
      paper: "#FAFAFA", // Light gray background for components like Cards
    },
    text: {
      primary: "#000000", // Standard Black for primary text
      secondary: "#8A8A8A", // Gray for less important information
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        textColorPrimary: {
          color: "#003366", // Deep Blue for Tab text color
          textTransform: "none", // Make tab label lowercase
          backgroundColor: "#F5F5F5", // Soft light gray background for tab label
          paddingBottom: "0px !important",
          borderBottom: "0x !important ",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          cursor: "pointer",
          fontSize: 12,
          color: "#008080", // Muted Teal for Links
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderColor: "#EDEDED", // Light gray for table border
        },
        cell: {
          color: "#333333", // Dark gray for cell text
          fontSize: "14px", // Regular font size for cell content
        },
        head: {
          backgroundColor: "#DAA520", // Soft Gold background for table header
          color: "#FFFFFF", // White text for table header
          fontSize: "16px", // Slightly larger font for headers to make them stand out
          fontWeight: "bold", // Bold font for headers for emphasis
        },
      },
    },
  },
});

export default theme;
