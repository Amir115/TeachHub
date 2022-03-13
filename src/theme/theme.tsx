import {ReactNode} from "react";
import {createTheme, ThemeProvider as MuiThemeProvider} from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
        },
        secondary: {
            main: '#61b6cd'
        },
    },
});

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>