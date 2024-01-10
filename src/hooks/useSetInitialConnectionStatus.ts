import { useEffect } from "react";
import useMessage from "./useMessage";
import useDispatchAction from "./useDispatchAction";

export const useSetInitialConnectionStatus = () => {
    const showMessage = useMessage();
    const { setIsOnline } = useDispatchAction();
    useEffect(() => {
        navigator.onLine && setIsOnline(true);
        !navigator.onLine && setIsOnline(false);
    }, [showMessage, setIsOnline]);
};
export default useSetInitialConnectionStatus;
