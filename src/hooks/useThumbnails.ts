import { useCallback, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";

import { RootStateType } from "types";

interface Props {
    numberOfVideos: number;
}
const useThumbnails = (props: Props) => {
    const { numberOfVideos } = props;
    const [firstVideo, setFirstVideo] = useState<number>(0);

    const videos = useSelector((state: RootStateType) => state.movies.movies, shallowEqual);
    const nextPageToken = useSelector((state: RootStateType) => state.pageToken.next, shallowEqual);
    const prevPageToken = useSelector((state: RootStateType) => state.pageToken.prev, shallowEqual);
    // console.log(nextPageToken, "next");
    // console.log(prevPageToken, "prev");
    const showNext = useCallback(() => {
        if (firstVideo <= videos.length - 2 - numberOfVideos) setFirstVideo(firstVideo => firstVideo + 1);
        else {
            setFirstVideo(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [firstVideo, numberOfVideos, videos]);

    const showPrevious = useCallback(() => {
        if (firstVideo !== 0) setFirstVideo(firstVideo - 1);
        else {
            setFirstVideo(videos.length - 1);
        }
    }, [firstVideo, videos]);

    const visibleVideoThumbnails = videos.slice(firstVideo, numberOfVideos + firstVideo);
    const isPreviousDisabled = Boolean(firstVideo <= numberOfVideos - 1);
    const isFirst = Boolean(firstVideo <= numberOfVideos - 1);
    const isNextDisabled = Boolean(firstVideo >= videos.length - 2 - numberOfVideos);
    const isLast = Boolean(firstVideo >= videos.length - 2 - numberOfVideos);

    return {
        isLast,
        isFirst,
        firstVideo,
        showNext,
        showPrevious,
        isNextDisabled,
        isPreviousDisabled,
        visibleVideoThumbnails,
    };
};

export default useThumbnails;
