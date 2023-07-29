import React, { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatchAction } from "hooks";
import { showError } from "reduxware/actionCreators";
import { createTanstackURL } from "functions";

function useFetchThumbnails(query: string) {
    const [token, setToken] = React.useState("");
    const { startLoading, completeLoading, storeVideos } = useDispatchAction();
    // console.log("token z usefetchthumbnails", token);
    // const createURL = (pageToken: string) =>
    //     `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25${
    //         pageToken ? `&pageToken=${pageToken}` : ""
    //     }&q=dogstype=video&key=AIzaSyBIyuKpGCSTL2QpVJKCq2vAcMX1sPsxlC0`;
    const url = createTanstackURL(query, token);
    const fetchThumbnails = async (token: string) => {
        // const url = createURL(token);

        const res = await fetch(url);
        return res.json();
    };

    const { isLoading, data, isError, refetch, isFetching, isPreviousData } = useQuery({
        queryKey: ["users", url],
        queryFn: () => fetchThumbnails(url),
        enabled: false,
    });

    // console.log("isLoading, data, isError, query, url", isLoading, data, isError, query, url);
    // if (isLoading && query) {
    //     startLoading();
    // }

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

    // const pageTokens = {
    //     next: data?.nextPageToken || "",
    //     prev: data?.prevPageToken || "",
    // };
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
    return { setToken, pageTokens };
}

export default useFetchThumbnails;
