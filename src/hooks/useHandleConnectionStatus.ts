import { useEffect } from "react";
import useMessage from "./useMessage";

export const useHandleConnectionStatus = () => {
  const showMessage = useMessage();
  useEffect(() => {
    const handleStatusChange = () => {
      navigator.onLine && showMessage.success("Restored connection");
      !navigator.onLine && showMessage.error("Lost connection");
    };
    window.addEventListener("online", handleStatusChange);
    window.addEventListener("offline", handleStatusChange);

    return () => {
      window.removeEventListener("offline", handleStatusChange);
      window.removeEventListener("online", handleStatusChange);
    };
  }, []);
};
export default useHandleConnectionStatus;
