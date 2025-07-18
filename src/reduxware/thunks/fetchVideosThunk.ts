import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootStateType } from "types";

import { startLoading, completeLoading, showError, storeVideos, setPageToken } from "../actionCreators";

const thunkFetchVideos = (URL: string): ThunkAction<void, RootStateType, unknown, AnyAction> => {
    return async (dispatch, getState) => {
        const path = URL;
        dispatch(startLoading());
        fetch(path)
            .then(res => res.json())
            .then(json => {
                dispatch(completeLoading());
                if (json) {
                    try {
                        if (json.error) {
                            dispatch(
                                showError({
                                    isError: true,
                                    errorMessage: json.error,
                                })
                            );
                        } else {
                            if (json.items && json.items.length) {
                                const pageToken = {
                                    next: json.nextPageToken || "",
                                    prev: json.prevPageToken || "",
                                };
                                dispatch(setPageToken(pageToken));
                                dispatch(storeVideos([...json.items]));
                            } else {
                                dispatch(
                                    showError({
                                        isError: true,
                                        errorMessage: "No videos found",
                                    })
                                );
                            }
                        }
                    } catch (error) {
                        dispatch(
                            showError({
                                isError: true,
                                errorMessage: "Malformed data received",
                            })
                        );
                    }
                } else {
                    dispatch(
                        showError({
                            isError: true,
                            errorMessage: "No valid data received from " + path,
                        })
                    );
                }
            })
            .catch(error => {
                const result = {
                    isError: true,
                    errorMessage: error.message,
                };
                dispatch(showError(result));
            });
    };
};

export default thunkFetchVideos;
