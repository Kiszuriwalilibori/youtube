import { createSelector } from "@reduxjs/toolkit";

import { getMovies, getSelectedId } from "reduxware/reducers/videosReducer";
import { Videos } from "types/types";

const createSelectedMovie = (ary: Videos, str: string) => {
    const video = ary.find(item => item.id.videoId === str);
    return { videoId: video?.id.videoId, title: video?.snippet.title, description: video?.snippet.description };
};

export const selectVideo = createSelector(getMovies, getSelectedId, createSelectedMovie);
