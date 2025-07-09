import { MutableRefObject, useCallback, useState } from "react";

export const useManageEye = (input: MutableRefObject<HTMLInputElement | null>) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const toggleInputType = useCallback(
        (event: any) => {
            if (input.current) {
                event.stopPropagation();
                if (input.current.type === "password") {
                    input.current.type = "text";
                    setIsPasswordVisible(true);
                } else {
                    input.current.type = "password";
                    setIsPasswordVisible(false);
                }
            }
        },
        [input]
    );

    return { toggleInputType, isPasswordVisible };
};

export default useManageEye;
