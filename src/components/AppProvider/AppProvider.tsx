import thunk from "redux-thunk";
import React, { ReactNode } from "react";

import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { HashRouter as Router } from "react-router-dom";

import fetchReducer from "reduxware/reducers/fetchReducer";
import moviesReducer from "reduxware/reducers/moviesReducer";
import logReducer from "reduxware/reducers/logReducer";

import { ViewportProvider } from "contexts/ViewPortProvider";
import App from "components/App";

const rootReducer = combineReducers({
    fetch: fetchReducer,
    movies: moviesReducer,
    log: logReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
});
const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <ViewportProvider>
            <Provider store={store}>
                <Router>
                    <App />
                </Router>
            </Provider>
        </ViewportProvider>
    );
};

export default AppProvider;
export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
