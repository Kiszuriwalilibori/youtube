import { createReducer } from "@reduxjs/toolkit";
import { PlayerFeed, RootStateType } from "types";

import { clearPlayerFeed, setPlayerFeed } from "../actionCreators";

const initialState = {
    playerFeed: {} as PlayerFeed,
};

const moviesReducer = createReducer(initialState, builder => {
    builder

        .addCase(setPlayerFeed, (state, action) => {
            if (action.payload) state.playerFeed = action.payload;
        })
        .addCase(clearPlayerFeed, state => {
            state.playerFeed = initialState.playerFeed;
        });
});

export const getPlayerFeed = (state: RootStateType) => state.movies.playerFeed;
export default moviesReducer;
