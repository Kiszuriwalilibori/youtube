import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import Icons from "icons";
import keyb from "icons/keyboard.png";

import { useBreakpoints } from "contexts/ViewPortProvider";
import { useBoolean, useManageInput, useSanitizeInput, useVoice } from "hooks";
import { SliderOrientation } from "types";
import { BasicButton } from "components";
import { Start, End } from "./components";
import { isOfflineSelector } from "reduxware/reducers";
import { listeningMicrophoneSx, ShowHiddenButton, MicrophoneButton } from "./TopBar.styles";
import { TFunction } from "i18next";

type LastSize = "large" | "small" | undefined;
const SEARCH_INPUT_MAX_LENGTH = 100;

const TopBar = () => {
    const { point: viewportType, sliderOrientation } = useBreakpoints();
    const isOffline = useSelector(isOfflineSelector);
    const previousSize = useRef<LastSize>(undefined);
    const [isFolded, fold, unfold] = useBoolean(true);
    const [isStartVisible, showStart, hideStart] = useBoolean(true);
    const [isKeyboardButtonVisible, showKeyboard, ,] = useBoolean(false);
    const [isShowHiddenButtonVisible, showShowHiddenButton, hideShowHiddenButton] = useBoolean(false);
    const { t } = useTranslation();
    const getSearchInputTitle = (t: TFunction, maxLength: number): string =>
        t("topbar.searchInputTitle", { maxLength });

    const horizontalSearchHandleHelper = useCallback(() => {
        unfold();
        hideStart();
        showShowHiddenButton();
    }, [hideStart, showShowHiddenButton, unfold]);

    const { handleClickInput, handleSearch, inputRef, updateInput } = useManageInput(
        sliderOrientation as SliderOrientation,
        horizontalSearchHandleHelper
    );
    const {
        handleKeyDown: handleSanitizedKeyDown,
        handleInputChange,
        handlePaste,
    } = useSanitizeInput({
        forbiddenChars: ["<", ">"],
        onKeyDown: handleClickInput,
    });

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

    const { handleClickMicrophone, isMicrophoneDisabled, listening } = useVoice(updateInput);

    return (
        <header className="TopBar">
            {isStartVisible && <Start />}
            <div className="TopBar__center">
                {isShowHiddenButtonVisible && (
                    <ShowHiddenButton
                        aria-label={t("topbar.showHidden")}
                        title={t("buttons.bell")}
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
                            onKeyDown={handleSanitizedKeyDown}
                            onInput={handleInputChange}
                            onPaste={handlePaste}
                            placeholder={t("buttons.search")}
                            aria-label={t("buttons.search")}
                            type="text"
                            tabIndex={0}
                            ref={inputRef}
                            disabled={isOffline}
                            maxLength={SEARCH_INPUT_MAX_LENGTH}
                            title={getSearchInputTitle(t, SEARCH_INPUT_MAX_LENGTH)}
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
                    aria-label={t("buttons.search")}
                    disabled={isOffline}
                >
                    <Icons.Search />
                </BasicButton>
                <MicrophoneButton
                    sx={{ ...listeningMicrophoneSx(listening) }}
                    className="with-tooltip"
                    data-tooltip={t("buttons.microphone")}
                    aria-label={t("topbar.searchByVoice")}
                    disabled={isMicrophoneDisabled}
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
