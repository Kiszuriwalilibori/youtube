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
export const storeMovies = createAction<Videos>("MOVIES_STORE");
export const setSelectedMovie = createAction<Video>("SELECTED_MOVIE_SET");
export const logUser = createAction("USER_LOGIN");
export const logOutUser = createAction("USER_LOGOUT");
export const clearMovies = createAction("MOVIES_CLEAR");
export const setPageToken = createAction<PageToken>("PAGE_TOKEN_SET");
export const resetPageToken = createAction("PAGE_TOKEN_RESET");
