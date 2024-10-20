'use client'
import React from 'react'
import {createTheme, ThemeProvider} from "@mui/material/styles";
import createCache from "@emotion/cache";
import {prefixer} from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import {CacheProvider} from "@emotion/react";
import { CssBaseline } from '@mui/material';


const theme = createTheme({
    direction: "rtl",
    typography:{
        fontFamily:"dana"
    },
});
const cacheRtl = createCache({
    key: "css",
    stylisPlugins: [prefixer, rtlPlugin],
    prepend:true,
    speedy:true,
});

export const MuiRtlProvider = ({children}) => {
    cacheRtl.compat = true;
    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                {children}
            </ThemeProvider>
        </CacheProvider>
    )
}
