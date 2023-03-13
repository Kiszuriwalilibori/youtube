import { createReducer } from "@reduxjs/toolkit";

import { storeMovies, setSelectedMovie, clearMovies } from "../actionCreators";
import { RootStateType } from "types/types";
import { Videos } from "types/types";

const initialState = {
    movies: [] as Videos,
    videoId: "",
};

const moviesReducer = createReducer(initialState, builder => {
    builder
        .addCase(storeMovies, (state, action) => {
            if (action.payload) {
                state.movies = action.payload;
            }
        })
        .addCase(setSelectedMovie, (state, action) => {
            if (action.payload) {
                if (action.payload.id) state.videoId = action.payload.id.videoId;
            }
        })
        .addCase(clearMovies, state => {
            state.movies = initialState.movies;
            state.videoId = initialState.videoId;
        });
});

export const getMovies = (state: RootStateType) => state.movies.movies;
export const getSelectedId = (state: RootStateType) => state.movies.videoId;
export default moviesReducer;
