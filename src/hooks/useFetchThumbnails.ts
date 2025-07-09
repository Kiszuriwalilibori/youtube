import React, { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { useDispatchAction, useErrorMessageService } from "hooks";
import { showError } from "reduxware/actionCreators";
import { createTanstackURL, fetchThumbnails } from "functions";

function useFetchThumbnails(query: string) {
    const { t } = useTranslation();
    const errorService = useErrorMessageService(t);
    const [token, setToken] = React.useState("");
    const { startLoading, completeLoading, storeVideos } = useDispatchAction();
    const url = createTanstackURL(query, token);

    const { data, isFetching, isPreviousData } = useQuery({
        queryKey: ["users", url],
        queryFn: () => fetchThumbnails(url),
        enabled: Boolean(url) && navigator.onLine,
        keepPreviousData: true,
        staleTime: 30 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    });

    useEffect(() => {
        console.log("Fetch Status:", { isFetching, isPreviousData, token, dataAvailable: !!data });
    }, [isFetching, isPreviousData, token, data]);
    console.log("QueryKey:", ["users", query, token]);
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
                const errorInfo = errorService.categorizeError(t("video.noVideosFound"));
                showError({
                    isError: true,
                    errorMessage: errorInfo.message,
                });
                completeLoading();
            }
        }
    }, [data]);

    const pageTokens = useMemo(() => {
        const tokens = { next: data?.nextPageToken || "", prev: data?.prevPageToken || "" };
        console.log("PageTokens:", tokens, "Current Token:", token);
        return tokens;
    }, [data]);

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
