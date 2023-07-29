import uuid from "react-uuid";
import isEqual from "lodash/isEqual";

import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";

import { getQuery, getRawQuery } from "reduxware/reducers/queryReducer";
import { useBreakpoints } from "contexts/ViewPortProvider";
import { useFetchThumbnails, useManageThumbnails, useSelectVideo } from "hooks";
import { ButtonPrevious, VideoThumbnail, ButtonNext } from "./components";
import { calculateNumberOfVideos } from "./utils";
import { RootStateType, Video } from "types";

interface Props {
    thunkFetchVideos: (URL: string) => ThunkAction<void, RootStateType, unknown, AnyAction>;
}

const Slider = (props: Props) => {
    const query = useSelector(getQuery, shallowEqual);
    const rawQuery = useSelector(getRawQuery, shallowEqual);
    const { thunkFetchVideos } = props;
    const { width, height, orientation: sliderOrientation, sliderClass } = useBreakpoints(); // todo wyprostować slider orientation/orientation
    const [numberOfVideos, setNumberOfVideos] = useState<number>(0);

    const sliderRef = useRef<HTMLBaseElement>(null);
    const { selectedVideo, selectVideo } = useSelectVideo();
    // const { setToken, pageTokens } = useFetchThumbnails(rawQuery);

    // console.log("pageTokens", pageTokens);
    useEffect(() => {
        if (query) {
            thunkFetchVideos(query);
        }
    }, [query, thunkFetchVideos]);

    const {
        isFirst,
        isLast,
        showNext,
        showPrevious,
        visibleVideoThumbnails,
        isNextDisabled,
        isPreviousDisabled,
        firstVideo,
        // resetFirstVideo,
    } = useManageThumbnails({
        numberOfVideos,
    });
    console.log("firstVideo", firstVideo);
    useEffect(() => {
        const count = calculateNumberOfVideos(sliderOrientation!, width, height);
        count && setNumberOfVideos(count);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width, height, sliderOrientation]);

    // console.log(numberOfVideos, visibleVideoThumbnails.length);
    // todo tutaj jeżeli kliknie się na pierwszy albo ostatni element powinno pobrac nowy zasób. Czyli nie ma aktywny nieaktywny, ale zróżnicowanie akcji - na "stary aktywny przesuwa, na nowy aktywny robi fetcha"

    // const buttonNextClickHandler = useCallback(() => {
    //     // console.log("isLast from button", isLast);
    //     if (!isLast) {
    //         showNext();
    //     } else {
    //         // console.log("token from handler", pageTokens.next);
    //         pageTokens.next && setToken(pageTokens.next);
    //         // resetFirstVideo();
    //     }
    // }, [isLast, pageTokens.next, setToken, showNext]);

    return (
        <aside className={sliderClass} ref={sliderRef}>
            <ButtonPrevious
                sliderOrientation={sliderOrientation}
                clickHandler={showPrevious}
                disabled={isPreviousDisabled}
                // disabled={isFirst && !pageTokens.prev}
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
                clickHandler={showNext}
                // clickHandler={buttonNextClickHandler}
                disabled={isNextDisabled}
                // disabled={isLast && !pageTokens.next}
            />
        </aside>
    );
};

export default Slider;
// todo sprawdzić button next i previous bo dziwnie w nich wygląda, tak jakby nieudane kopie samych siebie
// todo problem sprawia brak resetu firstVideo. Próbuję to naprawić
