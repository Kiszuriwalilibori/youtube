import { useState, useRef, useCallback, SyntheticEvent, useEffect } from "react";

import useDispatchAction from "./useDispatchAction";

import { SliderOrientation } from "types";

export const useManageInput = (orientation: SliderOrientation, helper: any) => {
    const [textContent, setTextContent] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);
    const { setQuery } = useDispatchAction();

    const inputClickHandler = useCallback((event: { key: string }) => {
        if (event.key === "Enter") {
            inputRef.current && inputRef.current!.value && setTextContent(inputRef.current!.value);
        }
    }, []);
    const searchHandler = useCallback(
        (e: SyntheticEvent) => {
            e.preventDefault();
            inputRef.current && inputRef.current!.value && setTextContent(inputRef.current!.value);
            if (orientation === "horizontal") {
                helper();
            }
        },
        [helper, orientation]
    );

    useEffect(() => {
        if (textContent) {
            setQuery(textContent);
        }
    }, [setQuery, textContent]);

    return { searchHandler, inputClickHandler, inputRef };
};

export default useManageInput;
