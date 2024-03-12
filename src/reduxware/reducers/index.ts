import fetchReducer from "./fetchReducer";
import logReducer, { getLoginStatus } from "./logReducer";
import onlineReducer, { isOfflineSelector, isOnlineSelector } from "./onlineReducer";
import pageTokenReducer from "./pageTokenReducer";
import moviesReducer, { getPlayerFeed } from "./moviesReducer";
import queryReducer, { getQuery } from "./queryReducer";

export { fetchReducer, logReducer, onlineReducer, pageTokenReducer, moviesReducer, queryReducer };
export { getLoginStatus, getPlayerFeed, getQuery, isOnlineSelector, isOfflineSelector };
