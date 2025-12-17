import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: '#1976d2' },
        secondary: { main: '#9c27b0' },
    },
    typography: { fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' },
    components: {
        MuiInputBase: {
            styleOverrides: {
                input: {
                    '&:-webkit-autofill': {
                        WebkitBoxShadow: '0 0 0px 1000px white inset',
                        WebkitTextFillColor: 'black',
                        caretColor: 'black',
                    },
                    '&:-webkit-autofill:focus': {
                        WebkitBoxShadow: '0 0 0px 1000px white inset',
                        WebkitTextFillColor: 'black',
                    },
                },
            },
        },
    },
});
