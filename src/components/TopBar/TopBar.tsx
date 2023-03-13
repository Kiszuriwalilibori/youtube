import React, { SyntheticEvent, useCallback, useEffect, useRef, useState } from "react";

import BasicButton from "components/BasicButton";
import Start from "./Start";
import End from "./End";
import Icons from "icons";

import { useBreakpoints } from "contexts/ViewPortProvider";
import { useBoolean } from "hooks";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootStateType } from "types/types";
import useDispatchAction from "hooks/useDispatchAction";

const prefix = " https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=";
const postfix = "&key=";
const placeHolder = "Szukaj";

type LastSize = "large" | "small" | undefined;

interface Props {
    thunkFetchMovies: (URL: string) => ThunkAction<void, RootStateType, unknown, AnyAction>;
}
const TopBar = (props: Props) => {
    const { thunkFetchMovies } = props;
    const { showError } = useDispatchAction();
    const { point: viewportType, orientation } = useBreakpoints();

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
            const URL = `${prefix}${textContent}type=video${postfix}${process.env.REACT_APP_API_KEY}`;

            thunkFetchMovies(URL);
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
                <BasicButton className="button--microphone with-tooltip" data-tooltip="Wyszukuj głosowo">
                    <Icons.Microphone />
                </BasicButton>
            </div>
            <End />
        </header>
    );
};

export default TopBar;
