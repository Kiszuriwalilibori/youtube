import { useState, useRef, useCallback, SyntheticEvent, useEffect } from "react";

import useDispatchAction from "./useDispatchAction";

import { SliderOrientation } from "types";

export type InputContent = string;

export const useManageInput = (orientation: SliderOrientation, helper: Function) => {
    const [inputContent, setInputContent] = useState<InputContent>("");
    const inputRef = useRef<HTMLInputElement>(null);
    const { setQuery } = useDispatchAction();

    const handleClickInput = useCallback((event: { key: string }) => {
        if (event.key === "Enter") {
            inputRef.current && inputRef.current!.value && setInputContent(inputRef.current!.value);
        }
    }, []);
    const handleSearch = useCallback(
        (e: SyntheticEvent) => {
            e.stopPropagation();
            e.preventDefault();
            inputRef.current && inputRef.current!.value && setInputContent(inputRef.current!.value);
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

    return { handleSearch, handleClickInput, inputRef, setInputContent, updateInput };
};

export default useManageInput;
