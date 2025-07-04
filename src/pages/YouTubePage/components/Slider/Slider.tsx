import uuid from "react-uuid";
import isEqual from "lodash/isEqual";

import { SyntheticEvent, useCallback, useMemo, useRef, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";

import { getQuery } from "reduxware/reducers/queryReducer";
import { useBreakpoints } from "contexts/ViewPortProvider";
import { useFetchThumbnails, useManageThumbnails, useSelectVideo } from "hooks";
import { ButtonPrevious, VideoThumbnail, ButtonNext } from "./components";
import { getSliderCapacity } from "./utils";
import { Video } from "types";
import { SliderButton } from "../../styled";
import Icons from "icons";

const Slider = () => {
    const query = useSelector(getQuery, shallowEqual);
    const prevQueryRef = useRef(query);
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

    useEffect(() => {
        if (prevQueryRef.current !== query) {
            setToken("");
            prevQueryRef.current = query;
        }
    }, [query, setToken]);

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
            // console.log("Previous clicked", { isFirst, pageTokens, token, fetchedVideos });
            e.stopPropagation();
            // console.log("Previous clicked", { isFirst, pageTokens, token, fetchedVideos });
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
    // console.log("Query from useSelector:", query);
    return (
        <aside className={sliderClass} ref={sliderRef}>
            <ButtonPrevious
                sliderOrientation={sliderOrientation}
                handleClick={handleClickPrevious}
                disabled={isFirst && !pageTokens.prev} //
            />
            {/* <SliderButton
                id="previous"
                variant="previous"
                orientation={sliderOrientation}
                onClick={handleClickPrevious}
                disabled={isFirst && !pageTokens.prev}
            >
                <Icons.Right />
            </SliderButton> */}

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
            {/* <SliderButton
                id="next"
                variant="next"
                orientation={sliderOrientation}
                onClick={onClickNext}
                disabled={isLast && !pageTokens.next}
            >
                <Icons.Right />
            </SliderButton> */}
        </aside>
    );
};

export default Slider;
