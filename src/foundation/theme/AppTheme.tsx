import React, {ReactChild} from 'react';
import {StylesProvider, jssPreset, createMuiTheme, ThemeProvider, CssBaseline} from '@foundation';
import {create} from 'jss';
import rtl from 'jss-rtl';
import {SnackbarProvider} from 'notistack';

const jss = create({plugins: [...jssPreset().plugins, rtl()]});
interface IProps {
    children: ReactChild
}
const theme = createMuiTheme({})

export const AppTheme = ({children}: IProps): JSX.Element => {
    return (
        <StylesProvider jss={jss}>
            <ThemeProvider theme={theme}>
                <SnackbarProvider>
                    <CssBaseline/>
                    {children}
                </SnackbarProvider>
            </ThemeProvider>
        </StylesProvider>
    )
}

