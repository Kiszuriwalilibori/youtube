import { useCallback, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";

import { RootStateType } from "types";

interface Props {
    numberOfVideos: number;
}
const useManageThumbnails = (props: Props) => {
    const { numberOfVideos } = props;
    const [firstVisibleThumbnailIndex, setFirstVisibleThumbnailIndex] = useState<number>(0);
    const resetFirstVisibleThumbnailIndex = useCallback(() => {
        setFirstVisibleThumbnailIndex(0);
    }, [setFirstVisibleThumbnailIndex]);

    const videos = useSelector((state: RootStateType) => state.movies.movies, shallowEqual);
    const nextPageToken = useSelector((state: RootStateType) => state.pageToken.next, shallowEqual);
    const prevPageToken = useSelector((state: RootStateType) => state.pageToken.prev, shallowEqual);
    // console.log(nextPageToken, "next");
    // console.log(prevPageToken, "prev");
    const showNext = useCallback(() => {
        if (firstVisibleThumbnailIndex <= videos.length - 2 - numberOfVideos)
            setFirstVisibleThumbnailIndex(firstVideo => firstVideo + 1);
        else {
            setFirstVisibleThumbnailIndex(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [firstVisibleThumbnailIndex, numberOfVideos, videos]);

    const showPrevious = useCallback(() => {
        if (firstVisibleThumbnailIndex !== 0) setFirstVisibleThumbnailIndex(firstVisibleThumbnailIndex - 1);
        else {
            setFirstVisibleThumbnailIndex(videos.length - 1);
        }
    }, [firstVisibleThumbnailIndex, videos]);

    const visibleVideoThumbnails = videos.slice(
        firstVisibleThumbnailIndex,
        numberOfVideos + firstVisibleThumbnailIndex
    );
    const isPreviousDisabled = Boolean(firstVisibleThumbnailIndex <= numberOfVideos - 1);
    const isFirst = Boolean(firstVisibleThumbnailIndex <= numberOfVideos - 1);
    const isNextDisabled = Boolean(firstVisibleThumbnailIndex >= videos.length - 2 - numberOfVideos);
    const isLast = Boolean(firstVisibleThumbnailIndex >= videos.length - 2 - numberOfVideos);

    return {
        isLast,
        isFirst,
        firstVisibleThumbnailIndex,
        resetFirstVisibleThumbnailIndex,
        setFirstVisibleThumbnailIndex,
        showNext,
        showPrevious,
        isNextDisabled,
        isPreviousDisabled,
        visibleVideoThumbnails,
    };
};

export default useManageThumbnails;
