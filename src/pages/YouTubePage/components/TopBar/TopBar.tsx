import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useSpeechRecognition } from "react-speech-kit";

import Icons from "icons";
import keyb from "icons/keyboard.png";

import { useBreakpoints } from "contexts/ViewPortProvider";
import { useBoolean, useManageInput } from "hooks";
import { SliderOrientation } from "types";
import { BasicButton } from "components";
import { Start, End } from "./components";
import { isOfflineSelector } from "reduxware/reducers/onlineReducer";
import { getMicrophoneBackgroundColor, getMicrophoneHoverColor, ShowHiddenButton, MicrophoneButton } from "./styled";
import { InputContent } from "hooks/useManageInput";

const SEARCH = "Szukaj";

// const microphoneButtonSx = {
//     "&.Mui-disabled": {
//         opacity: 0.3,
//     },
// };

type LastSize = "large" | "small" | undefined;

const TopBar = () => {
    const { point: viewportType, sliderOrientation } = useBreakpoints();
    const isOffline = useSelector(isOfflineSelector);
    const previousSize = useRef<LastSize>(undefined);
    const [isFolded, fold, unfold] = useBoolean(true);
    const [isStartVisible, showStart, hideStart] = useBoolean(true);
    const [isKeyboardButtonVisible, showKeyboard, ,] = useBoolean(false);
    const [isShowHiddenButtonVisible, showShowHiddenButton, hideShowHiddenButton] = useBoolean(false);

    const horizontalSearchHandleHelper = useCallback(() => {
        unfold();
        hideStart();
        showShowHiddenButton();
    }, [hideStart, showShowHiddenButton, unfold]);

    const { handleClickInput, handleSearch, inputRef, updateInput } = useManageInput(
        sliderOrientation as SliderOrientation,
        horizontalSearchHandleHelper
    );
    const handleLeftArrowClick = useCallback((e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        showStart();
        hideShowHiddenButton();
        fold();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (sliderOrientation === "horizontal") {
            //przejście do mniejszych
            if (!(previousSize.current === "small")) {
                previousSize.current = "small";
                fold();
            }
        }
        if (sliderOrientation === "vertical") {
            // przejście do większych
            if (!(previousSize.current === "large")) {
                previousSize.current = "large";
                isFolded && unfold();
                !isStartVisible && showStart();
                isShowHiddenButtonVisible && hideShowHiddenButton();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [viewportType]);

    const { listen, listening, stop, supported } = useSpeechRecognition({
        onResult: (result: InputContent) => {
            result && updateInput(result);
        },
    });

    const isMicrophoneDisabled = isOffline || !supported;

    const handleClickMicrophone = useCallback(() => {
        listening ? stop() : listen();
    }, [listening, listen, stop]);

    return (
        <header className="TopBar">
            {isStartVisible && <Start />}
            <div className="TopBar__center">
                {isShowHiddenButtonVisible && (
                    <ShowHiddenButton
                        aria-label="show hidden content"
                        title="notifications"
                        onClick={handleLeftArrowClick}
                    >
                        <Icons.ArrowLeft />
                    </ShowHiddenButton>
                )}
                {!isFolded && (
                    <div className="search">
                        <div className="search__buttons">
                            <BasicButton
                                disabled={isOffline}
                                className="button smaller hidden"
                                type="submit"
                                onClick={handleSearch}
                            >
                                <Icons.Search />
                            </BasicButton>
                        </div>

                        <input
                            className="search__input"
                            onMouseEnter={showKeyboard}
                            onKeyDown={handleClickInput}
                            placeholder={SEARCH}
                            aria-label={SEARCH}
                            type="text"
                            tabIndex={0}
                            ref={inputRef}
                            disabled={isOffline}
                        ></input>
                        {isKeyboardButtonVisible && (
                            <BasicButton className="button button--keyboard" disabled={isOffline}>
                                <img src={keyb} alt="keyboard"></img>
                            </BasicButton>
                        )}
                    </div>
                )}

                <BasicButton
                    className={isFolded ? "button button--neutral" : "button button--search"}
                    type="submit"
                    onClick={handleSearch}
                    aria-label="Search"
                    disabled={isOffline}
                >
                    <Icons.Search />
                </BasicButton>
                <MicrophoneButton
                    sx={{
                        backgroundColor: getMicrophoneBackgroundColor(listening),
                        "&:hover": { backgroundColor: getMicrophoneHoverColor(listening) },
                        // ...microphoneButtonSx,
                    }}
                    className="with-tooltip"
                    data-tooltip="Wyszukuj głosowo"
                    aria-label="Search by voice"
                    disabled={isMicrophoneDisabled}
                    // onClick={listening ? stop : listen}
                    onClick={handleClickMicrophone}
                >
                    <Icons.Microphone />
                </MicrophoneButton>
            </div>
            <End />
        </header>
    );
};

export default TopBar;
