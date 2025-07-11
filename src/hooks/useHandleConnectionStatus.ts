import { useEffect } from "react";

import { useTranslation } from "react-i18next";

import useDispatchAction from "./useDispatchAction";
import useMessage from "./useMessage";

export const useHandleConnectionStatus = () => {
    const showMessage = useMessage();
    const { setIsOnline } = useDispatchAction();
    const { t } = useTranslation();
    useEffect(() => {
        const handleStatusChange = () => {
            navigator.onLine && showMessage.success(t("common.online"));
            navigator.onLine && setIsOnline(true);

            !navigator.onLine && showMessage.error(t("errors.network.noConnectionDescription"));
            !navigator.onLine && setIsOnline(false);
        };
        window.addEventListener("online", handleStatusChange);
        window.addEventListener("offline", handleStatusChange);

        return () => {
            window.removeEventListener("offline", handleStatusChange);
            window.removeEventListener("online", handleStatusChange);
        };
    }, [showMessage, setIsOnline]);
};
export default useHandleConnectionStatus;
