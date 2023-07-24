import { createReducer } from "@reduxjs/toolkit";
import { setQuery, resetQuery } from "../actionCreators";
import { RootStateType } from "types/types";

const initialState = {
    query: undefined,
};

const queryReducer = createReducer(initialState, builder => {
    builder.addCase(setQuery, (state, action) => {
        if (action.payload) state.query = action.payload;
    });
    builder.addCase(resetQuery, state => {
        state.query = initialState.query;
    });
});

export default queryReducer;

export const getQuery = (state: RootStateType) => state.query;
