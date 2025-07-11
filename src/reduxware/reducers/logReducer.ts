import { createReducer } from "@reduxjs/toolkit";
import { RootStateType } from "types/types";

import { logUser, logOutUser } from "../actionCreators";

const initialState = {
    isLogged: false,
};

const logReducer = createReducer(initialState, builder => {
    builder.addCase(logUser, state => {
        state.isLogged = true;
    });
    builder.addCase(logOutUser, state => {
        state.isLogged = false;
    });
});

export default logReducer;

export const getLoginStatus = (state: RootStateType) => state.log.isLogged;
