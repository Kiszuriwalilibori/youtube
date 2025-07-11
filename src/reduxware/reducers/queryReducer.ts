import { createReducer } from "@reduxjs/toolkit";
import { RootStateType } from "types/types";

import { setQuery, resetQuery } from "../actionCreators";

const initialState = {
    query: "",
};

const queryReducer = createReducer(initialState, builder => {
    builder.addCase(setQuery, (state, action) => {
        if (action.payload) {
            state.query = action.payload;
        }
    });
    builder.addCase(resetQuery, state => {
        state.query = initialState.query;
    });
});

export default queryReducer;

export const getQuery = (state: RootStateType) => state.query.query;
