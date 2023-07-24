import thunk from "redux-thunk";
import React, { ReactNode } from "react";
import { Theme } from "@mui/material/styles";
import { ThemeProvider, StyledEngineProvider } from "@mui/material";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { HashRouter as Router } from "react-router-dom";

import fetchReducer from "reduxware/reducers/fetchReducer";
import moviesReducer from "reduxware/reducers/moviesReducer";
import logReducer from "reduxware/reducers/logReducer";
import pageTokenReducer from "reduxware/reducers/pageTokenReducer";
import queryReducer from "reduxware/reducers/queryReducer";

import { ViewportProvider } from "contexts/ViewPortProvider";
import App from "components/App";
import theme from "themes/theme";

const rootReducer = combineReducers({
    fetch: fetchReducer,
    movies: moviesReducer,
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
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={theme}>
                        <Router>
                            <App />
                        </Router>
                    </ThemeProvider>
                </StyledEngineProvider>
            </Provider>
        </ViewportProvider>
    );
};

export default AppProvider;
export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
