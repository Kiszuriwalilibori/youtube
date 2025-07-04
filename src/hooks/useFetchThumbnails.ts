import React, { useEffect, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatchAction } from "hooks";
import { showError } from "reduxware/actionCreators";
import { createTanstackURL, fetchThumbnails } from "functions";

function useFetchThumbnails(query: string) {
    const [token, setToken] = React.useState("");
    const { startLoading, completeLoading, storeVideos } = useDispatchAction();
    // const url = createTanstackURL(query, token);
    const url = useMemo(() => createTanstackURL(query, token), [query, token]);
    const fetchData = useCallback(() => fetchThumbnails(url), [url]);
    const { data, refetch, isFetching, isPreviousData } = useQuery({
        // queryKey: ["users", url],
        // queryFn: () => fetchThumbnails(url),
        queryKey: ["users", query, token],
        queryFn: fetchData,
        enabled: Boolean(url) && navigator.onLine,
        keepPreviousData: true,
        staleTime: 5 * 60 * 1000,
        // cacheTime: 60 * 60 * 1000,
    });

    // useEffect(() => {
    //     console.log("Fetch Status:", { isFetching, isPreviousData, token, dataAvailable: !!data });
    // }, [isFetching, isPreviousData, token, data]);
    // console.log("QueryKey:", ["users", query, token]);
    useEffect(() => {
        isFetching && startLoading();
    }, [isFetching, startLoading]);

    useEffect(() => {
        if (data) {
            completeLoading();
            if (data && data.items && data.items.length) {
                storeVideos([...data.items]);
            }
            if (!data.items || !data.items.length) {
                showError({
                    isError: true,
                    errorMessage: "No videos found",
                });
                completeLoading();
            }
        }
    }, [data]);

    const pageTokens = useMemo(() => {
        const tokens = { next: data?.nextPageToken || "", prev: data?.prevPageToken || "" };
        // console.log("PageTokens:", tokens, "Current Token:", token);
        return tokens;
    }, [data]);

    // useEffect(() => {
    //     console.log("Fetching:", isFetching, "Data:", data, "Token:", token);
    // }, [isFetching, data, token]);

    // useEffect(() => {
    //     if (query) {
    //         refetch();
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [query, token]);
    const lengthOfVideosArray = data ? data.items.length : undefined;
    const fetchedVideos = data && data.items ? (data.items as []) : undefined;
    return { setToken, pageTokens, lengthOfVideosArray, fetchedVideos, token };
}

export default useFetchThumbnails;
