import thunk from "redux-thunk";
import React, { ReactNode } from "react";

import { ThemeProvider, StyledEngineProvider } from "@mui/material";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { HashRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { register } from "serviceWorkerRegistration";
import { ViewportProvider } from "contexts/ViewPortProvider";

import theme from "themes/theme";
import "i18n/config";

import {
    fetchReducer,
    logReducer,
    pageTokenReducer,
    queryReducer,
    onlineReducer,
    moviesReducer,
} from "reduxware/reducers";

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
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
});
register();
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
