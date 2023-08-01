import thunk from "redux-thunk";
import React, { ReactNode } from "react";

import { Theme } from "@mui/material/styles";
import { ThemeProvider, StyledEngineProvider } from "@mui/material";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { HashRouter as Router } from "react-router-dom";

import fetchReducer from "reduxware/reducers/fetchReducer";
import videosReducer from "reduxware/reducers/playerReducer";
import logReducer from "reduxware/reducers/logReducer";
import pageTokenReducer from "reduxware/reducers/pageTokenReducer";
import queryReducer from "reduxware/reducers/queryReducer";

import { ViewportProvider } from "contexts/ViewPortProvider";

import theme from "themes/theme";
import { SnackbarProvider } from "notistack";

const rootReducer = combineReducers({
    fetch: fetchReducer,
    movies: videosReducer,
    log: logReducer,
    pageToken: pageTokenReducer,
    query: queryReducer,
});
// declare module "@mui/styles/defaultTheme" {
//     // eslint-disable-next-line @typescript-eslint/no-empty-interface
//     interface DefaultTheme extends Theme {}
// }
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
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
