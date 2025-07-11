import { useEffect } from "react";

import useDispatchAction from "./useDispatchAction";
import useMessage from "./useMessage";

export const useSetInitialConnectionStatus = () => {
    const showMessage = useMessage();
    const { setIsOnline } = useDispatchAction();
    useEffect(() => {
        navigator.onLine && setIsOnline(true);
        !navigator.onLine && setIsOnline(false);
    }, [showMessage, setIsOnline]);
};
export default useSetInitialConnectionStatus;
