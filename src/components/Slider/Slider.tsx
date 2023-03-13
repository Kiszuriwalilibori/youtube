import uuid from "react-uuid";
import isEqual from "lodash/isEqual";

import { useEffect, useRef, useState } from "react";

import VideoThumbnail from "./VideoThumbnail";
import ButtonPrevious from "./ButtonPrevious";
import ButtonNext from "./ButtonNext";

import { useBreakpoints } from "contexts/ViewPortProvider";
import { Video, SliderOrientation } from "types";
import { useThumbnails, useSelectVideo } from "hooks";

const movieHeight = 200;
const movieWidth = 180;

function calculateMoviesNumber(window: number, movieSize: number) {
    return Math.floor(window / movieSize);
}

function calculateNumberOfVideos(orientation: SliderOrientation, width: number, height: number) {
    let count = 0;

    switch (orientation) {
        case "horizontal":
            if (width) count = calculateMoviesNumber(width - 40, movieWidth);
            break;
        case "vertical":
            if (height) count = calculateMoviesNumber(height as number, movieHeight);
            break;
        default:
            break;
    }

    return count;
}

const Slider = () => {
    const { width, height, orientation: sliderOrientation, sliderClass } = useBreakpoints();
    const [moviesNumber, setMoviesNumber] = useState<number>(0);

    const sliderRef = useRef<HTMLBaseElement>(null);
    const { selectedVideo, selectVideo } = useSelectVideo();

    const { showNext, showPrevious, visibleVideoThumbnails, isNextDisabled, isPreviousDisabled } = useThumbnails({
        moviesNumber,
    });

    useEffect(() => {
        const count = calculateNumberOfVideos(sliderOrientation!, width, height);
        count && setMoviesNumber(count);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width, height, sliderOrientation]);

    return (
        <aside className={sliderClass} ref={sliderRef}>
            <ButtonPrevious
                sliderOrientation={sliderOrientation}
                clickHandler={showPrevious}
                disabled={isPreviousDisabled}
            />

            {visibleVideoThumbnails.map(video => {
                return (
                    <VideoThumbnail
                        key={uuid()}
                        clickHandler={selectVideo}
                        movie={video}
                        isSelected={isEqual(video, selectedVideo)}
                    />
                );
            })}

            <ButtonNext sliderOrientation={sliderOrientation} clickHandler={showNext} disabled={isNextDisabled} />
        </aside>
    );
};

export default Slider;
