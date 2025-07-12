import { useBreakpoints } from "contexts/ViewportProvider";
import { useFetchThumbnails, useManageThumbnails, useSelectVideo } from "hooks";
import isEqual from "lodash/isEqual";
import { SyntheticEvent, useCallback, useMemo, useRef } from "react";
import { useSelector, shallowEqual } from "react-redux";
import uuid from "react-uuid";
import { getQuery } from "reduxware/reducers/queryReducer";
import { Video } from "types";

import { ButtonPrevious, VideoThumbnail, ButtonNext } from "./components";
import { getSliderCapacity } from "./utils";

const Slider = () => {
    const query = useSelector(getQuery, shallowEqual);
    const { sliderOrientation, sliderClass, viewportSize } = useBreakpoints();
    const sliderRef = useRef<HTMLBaseElement>(null);
    const { selectedVideo, selectVideo } = useSelectVideo();
    const { setToken, pageTokens, lengthOfVideosArray, fetchedVideos, token } = useFetchThumbnails(query); //

    const sliderCapacity = useMemo(
        () => getSliderCapacity(sliderOrientation, viewportSize),
        [sliderOrientation, viewportSize]
    );

    const {
        isFirst,
        isLast,
        showNext,
        showPrevious,
        visibleVideoThumbnails,
        resetFirstVisibleThumbnailIndex,
        setFirstVisibleThumbnailIndex,
    } = useManageThumbnails({
        sliderCapacity,
        fetchedVideos,
    });

    const handleClickNext = useCallback(
        (e: SyntheticEvent) => {
            e.stopPropagation();
            if (!isLast) {
                showNext();
            } else {
                pageTokens.next && setToken(pageTokens.next);
                resetFirstVisibleThumbnailIndex();
            }
        },
        [isLast, pageTokens.next, resetFirstVisibleThumbnailIndex, setToken, showNext]
    );

    const handleClickPrevious = useCallback(
        (e: SyntheticEvent) => {
            e.stopPropagation();

            if (!isFirst) {
                showPrevious();
            } else {
                pageTokens.prev && setToken(pageTokens.prev);
                setFirstVisibleThumbnailIndex(lengthOfVideosArray - sliderCapacity);
            }
        },
        [
            isFirst,
            showPrevious,
            pageTokens.prev,
            setToken,
            setFirstVisibleThumbnailIndex,
            lengthOfVideosArray,
            sliderCapacity,
        ]
    );

    if (!visibleVideoThumbnails) return null;

    return (
        <aside className={sliderClass} ref={sliderRef}>
            <ButtonPrevious
                sliderOrientation={sliderOrientation}
                handleClick={handleClickPrevious}
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
                handleClick={handleClickNext}
                disabled={isLast && !pageTokens.next}
            />
        </aside>
    );
};

export default Slider;
