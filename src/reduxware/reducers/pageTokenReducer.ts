import { createReducer } from "@reduxjs/toolkit";
import { PageToken } from "types/types";

import { setPageToken, clearPageToken } from "../actionCreators";

const initialState: PageToken = {
    prev: undefined,
    next: undefined,
};

const pageTokenReducer = createReducer(initialState, builder => {
    builder.addCase(setPageToken, (state, action) => {
        if (action.payload.prev) state.prev = action.payload.prev;
        if (action.payload.next) state.next = action.payload.next;
    });
    builder.addCase(clearPageToken, state => {
        state = initialState;
    });
});

export default pageTokenReducer;
