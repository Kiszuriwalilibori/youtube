import uuid from "react-uuid";
import isEqual from "lodash/isEqual";

import { useCallback, useMemo, useRef } from "react";
import { useSelector, shallowEqual } from "react-redux";

import { getQuery } from "reduxware/reducers/queryReducer";
import { useBreakpoints } from "contexts/ViewPortProvider";
import { useFetchThumbnails, useManageThumbnails, useSelectVideo } from "hooks";
import { ButtonPrevious, VideoThumbnail, ButtonNext } from "./components";
import { calculateSliderCapacity } from "./utils";
import { Video } from "types";

const Slider = () => {
    const query = useSelector(getQuery, shallowEqual);
    const { sliderOrientation, sliderClass, viewportSize } = useBreakpoints();
    const sliderRef = useRef<HTMLBaseElement>(null);
    const { selectedVideo, selectVideo } = useSelectVideo();
    const { setToken, pageTokens, lengthOfVideosArray, fetchedVideos } = useFetchThumbnails(query); //

    const sliderCapacity = useMemo(
        () => calculateSliderCapacity(sliderOrientation, viewportSize),
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

    const buttonNextClickHandler = useCallback(() => {
        if (!isLast) {
            showNext();
        } else {
            pageTokens.next && setToken(pageTokens.next);
            resetFirstVisibleThumbnailIndex();
        }
    }, [isLast, pageTokens.next, resetFirstVisibleThumbnailIndex, setToken, showNext]);

    const buttonPreviousClickHandler = useCallback(() => {
        if (!isFirst) {
            showPrevious();
        } else {
            pageTokens.prev && setToken(pageTokens.prev);
            setFirstVisibleThumbnailIndex(lengthOfVideosArray - sliderCapacity);
        }
    }, [
        isFirst,
        showPrevious,
        pageTokens.prev,
        setToken,
        setFirstVisibleThumbnailIndex,
        lengthOfVideosArray,
        sliderCapacity,
    ]);

    if (!visibleVideoThumbnails) return null;

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
