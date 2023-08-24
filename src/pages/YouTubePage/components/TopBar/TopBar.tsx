import { useCallback, useEffect, useRef } from "react";

import BasicButton from "components/BasicButton";
import Icons from "icons";
import keyb from "icons/keyboard.png";

import { useBreakpoints } from "contexts/ViewPortProvider";
import { useBoolean, useManageInput } from "hooks";
import { SliderOrientation } from "types";
import { Start, End, MicrophoneButton } from "./components";

const placeHolder = "Szukaj";

type LastSize = "large" | "small" | undefined;

const TopBar = () => {
    const { point: viewportType, sliderOrientation } = useBreakpoints();
    const previousSize = useRef<LastSize>(undefined);
    const [isFolded, fold, unfold] = useBoolean(true);
    const [isStartVisible, showStart, hideStart] = useBoolean(true);
    const [isKeyboardButtonVisible, showKeyboard, ,] = useBoolean(false);
    const [isLeftArrowButtonVisible, showLeftArrowButton, hideLeftArrowButton] = useBoolean(false);

    const horizontalSearchHandleHelper = useCallback(() => {
        unfold();
        hideStart();
        showLeftArrowButton();
    }, [hideStart, showLeftArrowButton, unfold]);

    const { inputClickHandler, searchHandler, inputRef } = useManageInput(
        sliderOrientation as SliderOrientation,
        horizontalSearchHandleHelper
    );
    const arrowLeftClickHandler = useCallback((e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        showStart();
        hideLeftArrowButton();
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
                isLeftArrowButtonVisible && hideLeftArrowButton();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [viewportType]);

    return (
        <header className="TopBar">
            {isStartVisible && <Start />}
            <div className="TopBar__center">
                {isLeftArrowButtonVisible && (
                    <BasicButton className="button--reverted" onClick={arrowLeftClickHandler}>
                        <Icons.ArrowLeft />
                    </BasicButton>
                )}
                {!isFolded && (
                    <div className="search">
                        <div className="search__buttons">
                            <BasicButton className="button smaller hidden" type="submit" onClick={searchHandler}>
                                <Icons.Search />
                            </BasicButton>
                        </div>

                        <input
                            className="search__input"
                            onMouseEnter={showKeyboard}
                            onKeyDown={inputClickHandler}
                            placeholder={placeHolder}
                            type="text"
                            tabIndex={0}
                            ref={inputRef}
                        ></input>
                        {isKeyboardButtonVisible && (
                            <BasicButton className="button button--keyboard">
                                <img src={keyb} alt="keyboard"></img>
                            </BasicButton>
                        )}
                    </div>
                )}

                <BasicButton
                    className={isFolded ? "button--neutral" : "button--search"}
                    type="submit"
                    onClick={searchHandler}
                    aria-label="Search"
                >
                    <Icons.Search />
                </BasicButton>
                <MicrophoneButton className="with-tooltip" data-tooltip="Wyszukuj głosowo" aria-label="Search by voice">
                    <Icons.Microphone />
                </MicrophoneButton>
            </div>
            <End />
        </header>
    );
};

export default TopBar;
