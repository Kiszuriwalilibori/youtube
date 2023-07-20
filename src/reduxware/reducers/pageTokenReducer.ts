import { createReducer } from "@reduxjs/toolkit";

import { setPageToken, resetPageToken } from "../actionCreators";
import { PageToken } from "types/types";

const initialState: PageToken = {
    prev: undefined,
    next: undefined,
};

const pageTokenReducer = createReducer(initialState, builder => {
    builder.addCase(setPageToken, (state, action) => {
        if (action.payload.prev) state.prev = action.payload.prev;
        if (action.payload.next) state.next = action.payload.next;
    });
    builder.addCase(resetPageToken, state => {
        state = initialState;
    });
});

export default pageTokenReducer;
