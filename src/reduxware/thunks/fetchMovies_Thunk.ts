import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

import { startLoading, completeLoading, showError, storeMovies, setPageToken } from "../actionCreators";
import { RootStateType } from "types/types";

const thunkFetchMovies = (URL: string): ThunkAction<void, RootStateType, unknown, AnyAction> => {
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
                                dispatch(storeMovies([...json.items]));
                            } else {
                                dispatch(
                                    showError({
                                        isError: true,
                                        errorMessage: "No movies found",
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

export default thunkFetchMovies;
