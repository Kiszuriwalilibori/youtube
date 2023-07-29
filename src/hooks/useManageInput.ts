import { useState, useRef, useCallback, SyntheticEvent, useEffect } from "react";

import useDispatchAction from "./useDispatchAction";

import { SliderOrientation } from "types";
import { createURL } from "functions";

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
            const url = createURL(textContent);

            const payload = { query: url, rawQuery: textContent };
            // setQuery(url);
            setQuery(payload);
        }
    }, [setQuery, textContent]);

    return { searchHandler, inputClickHandler, inputRef };
};

export default useManageInput;
