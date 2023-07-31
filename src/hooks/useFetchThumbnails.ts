import React, { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatchAction } from "hooks";
import { showError } from "reduxware/actionCreators";
import { createTanstackURL } from "functions";

function useFetchThumbnails(query: string) {
    const [token, setToken] = React.useState("");
    const { startLoading, completeLoading, storeVideos } = useDispatchAction();
    const url = createTanstackURL(query, token);
    const fetchThumbnails = async (token: string) => {
        const res = await fetch(url);
        return res.json();
    };

    const { isLoading, data, isError, refetch, isFetching, isPreviousData } = useQuery({
        queryKey: ["users", url],
        queryFn: () => fetchThumbnails(url),
        enabled: false,
    });

    useEffect(() => {
        if (data) {
            completeLoading();

            if (data.error) {
                showError({
                    isError: true,
                    errorMessage: data.error,
                });
            } else {
                if (data.items && data.items.length) {
                    storeVideos([...data.items]);
                }
                if (!data.items || !data.items.length) {
                    showError({
                        isError: true,
                        errorMessage: "No videos found",
                    });
                }
            }
        }
    }, [data]);

    const pageTokens = useMemo(() => {
        const tokens = { next: data?.nextPageToken || "", prev: data?.prevPageToken || "" };
        return tokens;
    }, [data]);

    useEffect(() => {
        if (query) {
            refetch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, token]);
    const lengthOfVideosArray = data ? data.items.length : undefined;
    return { setToken, pageTokens, lengthOfVideosArray };
}

export default useFetchThumbnails;
