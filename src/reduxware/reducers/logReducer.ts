import { createReducer } from "@reduxjs/toolkit";

import { logUser, logOutUser } from "../actionCreators";
import { RootStateType } from "types/types";

const initialState = {
    isLogged: false,
};

const moviesReducer = createReducer(initialState, builder => {
    builder.addCase(logUser, state => {
        state.isLogged = true;
    });
    builder.addCase(logOutUser, state => {
        state.isLogged = false;
    });
});

export default moviesReducer;

export const getLoginStatus = (state: RootStateType) => state.log.isLogged;
