import { createReducer } from "@reduxjs/toolkit";
import { setQuery, resetQuery } from "../actionCreators";
import { RootStateType } from "types/types";

const initialState = {
    query: "",
    rawQuery: "",
};

const queryReducer = createReducer(initialState, builder => {
    builder.addCase(setQuery, (state, action) => {
        if (action.payload) {
            state.query = action.payload.query;
            state.rawQuery = action.payload.rawQuery;
        }
    });
    builder.addCase(resetQuery, state => {
        state.query = initialState.query;
    });
});

export default queryReducer;

export const getQuery = (state: RootStateType) => state.query.query;
export const getRawQuery = (state: RootStateType) => state.query.rawQuery;
