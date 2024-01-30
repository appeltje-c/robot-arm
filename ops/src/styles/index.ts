/*
 * Copyright (C) 2024 - Martijn Benjamin
 *
 * -----
 * Written for the Monumental technical assessment
 * "Visualizing a Robotic Crane"
 * -----
 */
import {createTheme, ThemeOptions, responsiveFontSizes} from "@mui/material/styles"
import '@fontsource-variable/outfit';

const options: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#64b5f6',
        },
        secondary: {
            main: '#76ff03',
        },
    },
    typography: {
        fontFamily: ['Outfit Variable'].join(','),
    }
}

export default responsiveFontSizes(createTheme(options))

