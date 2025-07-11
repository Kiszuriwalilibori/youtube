import { useRef } from "react";

import useDispatchAction from "hooks/useDispatchAction";

export const useCheckApiKey = () => {
    const { showError } = useDispatchAction();

    const isAPIKeyAvailable = useRef(false);

    if (!process.env.REACT_APP_API_KEY) {
        showError({ isError: true, errorMessage: "No API key found" });
    } else {
        isAPIKeyAvailable.current = true;
    }
    return isAPIKeyAvailable.current;
};

export default useCheckApiKey;
