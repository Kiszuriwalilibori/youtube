import { createSelector } from "@reduxjs/toolkit";

import { getMovies, getSelectedId } from "reduxware/reducers/moviesReducer";
import { Videos } from "types/types";

const createSelectedMovie = (ary: Videos, str: string) => {
    const movie = ary.find(item => item.id.videoId === str);
    return { videoId: movie?.id.videoId, title: movie?.snippet.title, description: movie?.snippet.description };
};

export const selectMovie = createSelector(getMovies, getSelectedId, createSelectedMovie);
