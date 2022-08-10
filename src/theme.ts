import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

/**
 * Create system theme via material-ui
 *
 * 通过material-ui的createTheme方法构建定制化主题
 */
const theme = createTheme({
  palette: {
    primary: {
      light: "#484848",
      main: "#020202",
      dark: "#000000",
    },
    secondary: {
      light: "#ff833a",
      main: "#e65100",
      dark: "#ac1900",
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "1.1rem",
          color: "rgba(0, 0, 0, 0.6) !important",
        },
      },
    },
  },
});

export default theme;
