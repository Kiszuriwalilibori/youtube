import { createReducer } from "@reduxjs/toolkit";

import { showError, clearError, startLoading, completeLoading } from "../actionCreators";

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

export default fetchReducer;
