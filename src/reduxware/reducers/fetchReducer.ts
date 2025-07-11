import { createReducer } from "@reduxjs/toolkit";
import { RootStateType } from "types";

import { clearError, completeLoading, showError, startLoading } from "../actionCreators";

export const initialState = {
    errorMessage: "",
    isError: false,
    isLoading: false,
    isFetched: true,
};

const fetchReducer = createReducer(initialState, builder => {
    builder
        .addCase(showError, (state, action) => {
            const { isError, errorMessage } = action.payload;
            state.isError = isError;
            state.errorMessage = errorMessage;
        })
        .addCase(clearError, (state, action) => {
            state.isError = false;
            state.errorMessage = "";
        })
        .addCase(startLoading, (state, action) => {
            state.isLoading = true;
        })
        .addCase(completeLoading, (state, action) => {
            state.isLoading = false;
        });
});

export const getErrorStatus = (state: RootStateType) => state.fetch.isError;
export const getErrorMessage = (state: RootStateType) => state.fetch.errorMessage;
export const getLoadingStatus = (state: RootStateType) => state.fetch.isLoading;

export default fetchReducer;
