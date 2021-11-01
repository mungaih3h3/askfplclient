import { indigo } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = {
  typography: {
    fontFamily:
      "Jost, sans-serif, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue",
  },
  spacing: [0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256],
  palette: {
    mode: "dark",
    primary: {
      main: indigo[700],
    },
  },
} as const;
type CustomTheme = {
  [Key in keyof typeof theme]: typeof theme[Key];
};
declare module "@mui/material/styles" {
  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
}
export default createTheme(theme);
