import { useCallback, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";

import { RootStateType } from "types";

interface Props {
    moviesNumber: number;
}
const useThumbnails = (props: Props) => {
    const { moviesNumber } = props;
    const [firstMovie, setFirstMovie] = useState<number>(0);

    const movies = useSelector((state: RootStateType) => state.movies.movies, shallowEqual);
    const nextPageToken = useSelector((state: RootStateType) => state.pageToken.next, shallowEqual);
    const prevPageToken = useSelector((state: RootStateType) => state.pageToken.prev, shallowEqual);
    console.log(nextPageToken, "nesx");
    console.log(prevPageToken, "prev");
    const showNext = useCallback(() => {
        if (firstMovie <= movies.length - 2 - moviesNumber) setFirstMovie(firstMovie => firstMovie + 1);
        else {
            setFirstMovie(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [firstMovie, moviesNumber, movies]);

    const showPrevious = useCallback(() => {
        if (firstMovie !== 0) setFirstMovie(firstMovie - 1);
        else {
            setFirstMovie(movies.length - 1);
        }
    }, [firstMovie, movies]);

    const visibleVideoThumbnails = movies.slice(firstMovie, moviesNumber + firstMovie);

    const isPreviousDisabled = Boolean(firstMovie <= moviesNumber - 1);
    const isFirst = Boolean(firstMovie <= moviesNumber - 1);
    const isNextDisabled = Boolean(firstMovie >= movies.length - 2 - moviesNumber);
    const isLast = Boolean(firstMovie >= movies.length - 2 - moviesNumber);

    return {
        isLast,
        isFirst,
        firstMovie,
        showNext,
        showPrevious,
        isNextDisabled,
        isPreviousDisabled,
        visibleVideoThumbnails,
    };
};

export default useThumbnails;
