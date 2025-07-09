import { useState, useRef, useCallback, SyntheticEvent, useEffect, KeyboardEvent } from "react";

import useDispatchAction from "./useDispatchAction";

import { SliderOrientation } from "types";

export type InputContent = string;
const INITIAL_INPUT_CONTENT_VALUE = "";

export const useManageInput = (orientation: SliderOrientation, helper: Function) => {
    const [inputContent, setInputContent] = useState<InputContent>(INITIAL_INPUT_CONTENT_VALUE);
    const inputRef = useRef<HTMLInputElement>(null);
    const { setQuery } = useDispatchAction();
    const clearInput = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.value = INITIAL_INPUT_CONTENT_VALUE;
        }
    }, []);
    const handleEnterKeyPress = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && inputRef.current?.value) {
            setInputContent(inputRef.current.value);
            setQuery(inputRef.current.value);
            clearInput();
        }
    }, []);
    const handleSearch = useCallback(
        (e: SyntheticEvent) => {
            e.stopPropagation();
            e.preventDefault();
            if (inputRef.current?.value) {
                setInputContent(inputRef.current.value);
                setQuery(inputRef.current.value);
                clearInput();
            }
            if (orientation === "horizontal") {
                helper();
            }
        },
        [helper, orientation]
    );

    const updateInput = useCallback(
        (newContent: InputContent) => {
            const updatedInputContent = inputContent + " " + newContent;
            inputRef.current!.value = updatedInputContent;
        },
        [inputContent]
    );

    useEffect(() => {
        if (inputContent) {
            setQuery(inputContent);
        }
    }, [setQuery, inputContent]);

    return { handleSearch, handleClickInput: handleEnterKeyPress, inputRef, setInputContent, updateInput };
};

export default useManageInput;
