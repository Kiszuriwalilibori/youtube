import React, { SyntheticEvent, useCallback, useEffect, useRef, useState } from "react";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

import BasicButton from "components/BasicButton";
import Icons from "icons";

import { useBreakpoints } from "contexts/ViewPortProvider";
import { useBoolean, useDispatchAction } from "hooks";
import { RootStateType } from "types";
import { MicrophoneButton } from "styles/styled";
import { createURL } from "functions/createURL";
import { Start, End } from "./components";

const placeHolder = "Szukaj";

type LastSize = "large" | "small" | undefined;

const TopBar = () => {
    const { point: viewportType, orientation } = useBreakpoints();
    const { setQuery } = useDispatchAction();

    const previousSize = useRef<LastSize>(undefined);
    const inputRef = useRef<HTMLInputElement>(null);

    const [isFolded, fold, unfold] = useBoolean(true);
    const [isStartVisible, showStart, hideStart] = useBoolean(true);
    const [isKeyboardButtonVisible, showKeyboard, ,] = useBoolean(false);
    const [isLeftArrowButtonVisible, showLeftArrowButton, hideLeftArrowButton] = useBoolean(false);

    const [textContent, setTextContent] = useState<string>("");

    const inputClickHandler = useCallback((event: { key: string }) => {
        if (event.key === "Enter") {
            inputRef.current && inputRef.current!.value && setTextContent(inputRef.current!.value);
        }
    }, []);

    const searchHandler = (e: SyntheticEvent) => {
        e.preventDefault();
        inputRef.current && inputRef.current!.value && setTextContent(inputRef.current!.value);
        if (orientation === "horizontal") {
            unfold();
            hideStart();
            showLeftArrowButton();
        }
    };

    const arrowLeftClickHandler = useCallback((e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        showStart();
        hideLeftArrowButton();
        fold();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (orientation === "horizontal") {
            //przejście do mniejszych
            if (!(previousSize.current === "small")) {
                previousSize.current = "small";
                fold();
            }
        }
        if (orientation === "vertical") {
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
    useEffect(() => {
        if (textContent) {
            const url = createURL(textContent);
            setQuery(url);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textContent]);

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
                                <img src="//www.gstatic.com/inputtools/images/tia.png" alt="keyboard"></img>
                            </BasicButton>
                        )}
                    </div>
                )}

                <BasicButton
                    className={isFolded ? "button--neutral" : "button--search"}
                    type="submit"
                    onClick={searchHandler}
                >
                    <Icons.Search />
                </BasicButton>
                <MicrophoneButton className="with-tooltip" data-tooltip="Wyszukuj głosowo">
                    <Icons.Microphone />
                </MicrophoneButton>
            </div>
            <End />
        </header>
    );
};

export default TopBar;
