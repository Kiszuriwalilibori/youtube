import { MouseEventHandler, MutableRefObject, useCallback, useRef } from "react";

export const useManageEye = (input: MutableRefObject<HTMLInputElement | null>) => {
    const toggleInputType = useCallback(
        (event: any) => {
            console.log("clicked");
            if (input.current) {
                event.stopPropagation();
                if (input.current.type === "password") {
                    input.current.type = "text";
                } else {
                    input.current.type = "password";
                }
            }
        },
        [input]
    );

    return { toggleInputType };
};

export default useManageEye;
