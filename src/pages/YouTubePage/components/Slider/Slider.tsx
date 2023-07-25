import uuid from "react-uuid";
import isEqual from "lodash/isEqual";

import { useEffect, useRef, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";

import { getQuery } from "reduxware/reducers/queryReducer";
import { useBreakpoints } from "contexts/ViewPortProvider";
import { useThumbnails, useSelectVideo } from "hooks";
import { ButtonPrevious, VideoThumbnail, ButtonNext } from "./components";
import { calculateNumberOfVideos } from "./utils";
import { Video } from "types/index";

const Slider = () => {
    const query = useSelector(getQuery, shallowEqual);
    const { width, height, orientation: sliderOrientation, sliderClass } = useBreakpoints();
    const [numberOfVideos, setNumberOfVideos] = useState<number>(0);

    const sliderRef = useRef<HTMLBaseElement>(null);
    const { selectedVideo, selectVideo } = useSelectVideo();

    const {
        isFirst,
        isLast,
        showNext,
        showPrevious,
        visibleVideoThumbnails,
        isNextDisabled,
        isPreviousDisabled,
        firstVideo,
    } = useThumbnails({
        numberOfVideos,
    });

    useEffect(() => {
        const count = calculateNumberOfVideos(sliderOrientation!, width, height);
        count && setNumberOfVideos(count);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width, height, sliderOrientation]);

    console.log(numberOfVideos, visibleVideoThumbnails.length); // todo tutaj jeżeli kliknie się na pierwszy albo ostatni element powinno pobrac nowy zasób. Czyli nie ma aktywny nieaktywny, ale zróżnicowanie akcji - na "stary aktywny przesuwa, na nowy aktywny robi fetcha"
    return (
        <aside className={sliderClass} ref={sliderRef}>
            <ButtonPrevious
                sliderOrientation={sliderOrientation}
                clickHandler={showPrevious}
                disabled={isPreviousDisabled}
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

            <ButtonNext sliderOrientation={sliderOrientation} clickHandler={showNext} disabled={isNextDisabled} />
        </aside>
    );
};

export default Slider;
