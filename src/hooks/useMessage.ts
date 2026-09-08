import { useCallback, useMemo } from "react";
import { SnackbarOrigin, useSnackbar } from "notistack";

interface MessageOptions {
    autoHideDuration?: number;
    anchorOrigin?: SnackbarOrigin;
}

export interface MessageMethods {
    info: (message: string, options?: MessageOptions) => void;
    error: (message: string, options?: MessageOptions) => void;
    success: (message: string, options?: MessageOptions) => void;
    warning: (message: string, options?: MessageOptions) => void;
}

export const useMessage = (): MessageMethods => {
    const { enqueueSnackbar } = useSnackbar();

    const info = useCallback(
        (message: string, options?: MessageOptions) => {
            enqueueSnackbar(message, {
                variant: "info",
                ...options,
                SnackbarProps: {
                    role: "status",
                    "aria-live": "polite",
                },
            });
        },
        [enqueueSnackbar]
    );

    const error = useCallback(
        (message: string, options?: MessageOptions) => {
            enqueueSnackbar(message, {
                variant: "error",
                ...options,
                SnackbarProps: {
                    role: "alert",
                    "aria-live": "assertive",
                },
            });
        },
        [enqueueSnackbar]
    );

    const success = useCallback(
        (message: string, options?: MessageOptions) => {
            enqueueSnackbar(message, {
                variant: "success",
                ...options,
                SnackbarProps: {
                    role: "status",
                    "aria-live": "polite",
                },
            });
        },
        [enqueueSnackbar]
    );

    const warning = useCallback(
        (message: string, options?: MessageOptions) => {
            enqueueSnackbar(message, {
                variant: "warning",
                ...options,
                SnackbarProps: {
                    role: "status",
                    "aria-live": "polite",
                },
            });
        },
        [enqueueSnackbar]
    );

    return useMemo(
        () => ({
            info,
            error,
            success,
            warning,
        }),
        [info, error, success, warning]
    );
};

export default useMessage;
