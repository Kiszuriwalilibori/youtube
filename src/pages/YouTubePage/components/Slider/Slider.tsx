import uuid from "react-uuid";
import isEqual from "lodash/isEqual";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";

import { getRawQuery } from "reduxware/reducers/queryReducer";
import { useBreakpoints } from "contexts/ViewPortProvider";
import { useFetchThumbnails, useManageThumbnails, useSelectVideo } from "hooks";
import { ButtonPrevious, VideoThumbnail, ButtonNext } from "./components";
import { calculateNumberOfVideos } from "./utils";
import { Video } from "types";

const Slider = () => {
    const rawQuery = useSelector(getRawQuery, shallowEqual);
    const { width, height, sliderOrientation, sliderClass } = useBreakpoints();
    const [numberOfVideos, setNumberOfVideos] = useState<number>(0);

    const sliderRef = useRef<HTMLBaseElement>(null);
    const { selectedVideo, selectVideo } = useSelectVideo();
    const { setToken, pageTokens, lengthOfVideosArray } = useFetchThumbnails(rawQuery); //

    console.log(numberOfVideos);
    const {
        isFirst,
        isLast,
        showNext,
        showPrevious,
        visibleVideoThumbnails,
        isNextDisabled,
        isPreviousDisabled,
        firstVisibleThumbnailIndex,
        resetFirstVisibleThumbnailIndex,
        setFirstVisibleThumbnailIndex,
    } = useManageThumbnails({
        numberOfVideos,
    });

    useEffect(() => {
        const count = calculateNumberOfVideos(sliderOrientation!, width, height);
        count && setNumberOfVideos(count);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width, height, sliderOrientation]);

    const buttonNextClickHandler = useCallback(() => {
        if (!isLast) {
            showNext();
        } else {
            pageTokens.next && setToken(pageTokens.next);
            resetFirstVisibleThumbnailIndex();
        }
    }, [isLast, pageTokens.next, setToken, showNext]);

    const buttonPreviousClickHandler = useCallback(() => {
        if (!isFirst) {
            showPrevious();
        } else {
            pageTokens.prev && setToken(pageTokens.prev);
            setFirstVisibleThumbnailIndex(lengthOfVideosArray - numberOfVideos);
        }
    }, [isFirst, pageTokens.prev, setToken, showPrevious, resetFirstVisibleThumbnailIndex]);

    return (
        <aside className={sliderClass} ref={sliderRef}>
            <ButtonPrevious
                sliderOrientation={sliderOrientation}
                clickHandler={buttonPreviousClickHandler}
                disabled={isFirst && !pageTokens.prev} //
            />

            {visibleVideoThumbnails.map((video: Video) => {
                return (
                    <VideoThumbnail
                        key={uuid()}
                        clickHandler={selectVideo}
                        video={video}
                        isSelected={isEqual(video, selectedVideo)}
                    />
                );
            })}

            <ButtonNext
                sliderOrientation={sliderOrientation}
                clickHandler={buttonNextClickHandler}
                disabled={isLast && !pageTokens.next}
            />
        </aside>
    );
};

export default Slider;
