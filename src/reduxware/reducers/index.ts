import fetchReducer, { getErrorStatus, getErrorMessage, getLoadingStatus } from "./fetchReducer";
import logReducer, { getLoginStatus } from "./logReducer";
import moviesReducer, { getPlayerFeed } from "./moviesReducer";
import onlineReducer, { isOfflineSelector, isOnlineSelector } from "./onlineReducer";
import pageTokenReducer from "./pageTokenReducer";
import queryReducer, { getQuery } from "./queryReducer";

export { fetchReducer, logReducer, onlineReducer, pageTokenReducer, moviesReducer, queryReducer };
export {
    getLoginStatus,
    getPlayerFeed,
    getQuery,
    isOnlineSelector,
    isOfflineSelector,
    getErrorStatus,
    getErrorMessage,
    getLoadingStatus,
};
