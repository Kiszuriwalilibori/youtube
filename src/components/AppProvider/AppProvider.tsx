import React, { ReactNode } from "react";

import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { HashRouter as Router } from "react-router-dom";

import { ViewportProvider } from "contexts/ViewportProvider";

import {
    fetchReducer,
    logReducer,
    moviesReducer,
    onlineReducer,
    pageTokenReducer,
    queryReducer,
} from "reduxware/reducers";

import i18n from "i18n/config";
import { register } from "serviceWorkerRegistration";

import theme from "themes/theme";

const rootReducer = combineReducers({
    fetch: fetchReducer,
    movies: moviesReducer,
    log: logReducer,
    pageToken: pageTokenReducer,
    query: queryReducer,
    online: onlineReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});
register();

// Set initial language
document.documentElement.lang = i18n.language;

// Add language change listener
i18n.on("languageChanged", lng => {
    document.documentElement.lang = lng;
});
const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <ViewportProvider>
            <Provider store={store}>
                <SnackbarProvider
                    maxSnack={3}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                >
                    <StyledEngineProvider injectFirst>
                        <ThemeProvider theme={theme}>
                            <Router>{children}</Router>
                        </ThemeProvider>
                    </StyledEngineProvider>
                </SnackbarProvider>
            </Provider>
        </ViewportProvider>
    );
};

export default AppProvider;
export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
