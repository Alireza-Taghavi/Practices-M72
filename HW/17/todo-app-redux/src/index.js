import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createTheme, ThemeProvider} from "@mui/material";
import {Provider} from 'react-redux';
import store from "./redux/store"
//theme
const theme = createTheme({
    palette: {
        primary: {
            main: "#191e2d",
            light: "#404556",
            dark: "#000002",
        },
        secondary: {
            main: '#1f388e',
            dark: '#001460',
            light: '#5862bf',
        },
        gray: {
            main: '#b8b8b8',
            dark: '#8c8c8c',
            light: '#e0e0e0',
        },
        red: {
            main: '#ff0000'
        }
    },
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider theme={theme}>
        <React.StrictMode>
            <Provider store={store}>
                <App/>
            </Provider>
        </React.StrictMode>

    </ThemeProvider>
);
