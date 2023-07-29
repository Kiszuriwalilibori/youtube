import { createReducer } from "@reduxjs/toolkit";

import { storeVideos, setSelectedVideo, clearVideos, clearSelectedVideo } from "../actionCreators";
import { RootStateType } from "types/types";
import { Videos } from "types/types";

const initialState = {
    movies: [] as Videos,
    videoId: "",
};

const moviesReducer = createReducer(initialState, builder => {
    builder
        .addCase(storeVideos, (state, action) => {
            if (action.payload) {
                console.log("payload of storevideos", action.payload);
                state.movies = action.payload;
            }
        })
        .addCase(setSelectedVideo, (state, action) => {
            if (action.payload) {
                if (action.payload.id) state.videoId = action.payload.id.videoId;
            }
        })
        .addCase(clearVideos, state => {
            state.movies = initialState.movies;
            state.videoId = initialState.videoId;
        })
        .addCase(clearSelectedVideo, state => {
            state.videoId = initialState.videoId;
        });
});

export const getMovies = (state: RootStateType) => state.movies.movies;
export const getSelectedId = (state: RootStateType) => state.movies.videoId;
export default moviesReducer;
