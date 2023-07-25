import { createAction } from "@reduxjs/toolkit";
import { PageToken, Video, Videos } from "types/types";

interface ShowError {
    isError: boolean;
    errorMessage: string;
}

export const showError = createAction<ShowError>("ERROR_SHOW");
export const clearError = createAction("ERROR_CLEAR");
export const startLoading = createAction("LOADING_START");
export const completeLoading = createAction("LOADING_COMPLETE");
export const storeVideos = createAction<Videos>("VIDEOS_STORE");
export const setSelectedVideo = createAction<Video>("SELECTED_VIDEO_SET");
export const clearSelectedVideo = createAction("SELECTED_VIDEO_CLEAR");
export const logUser = createAction("USER_LOGIN");
export const logOutUser = createAction("USER_LOGOUT");
export const clearVideos = createAction("VIDEOS_CLEAR");
export const setPageToken = createAction<PageToken>("PAGE_TOKEN_SET");
export const resetPageToken = createAction("PAGE_TOKEN_RESET");
export const setQuery = createAction("QUERY_SET");
export const resetQuery = createAction("QUERY_RESET");
