import { QueryClient } from "@tanstack/react-query";
import { ApiError } from "types/ApiError";
import useDispatchAction from "./useDispatchAction";

const useQueryClient = () => {
    const { showError, completeLoading } = useDispatchAction();

    const queryErrorHandler = (err: unknown): void => {
        const error = err as Error;
        completeLoading();
        showError({ isError: true, errorMessage: error.message });
    };

    const defaultQueryClientOptions = {
        queries: {
            onError: queryErrorHandler,
            retry: false,
            cacheTime: 1.1 * (60 * 1000),
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            staleTime: 1 * (60 * 1000),
            refetchInterval: 1 * (60 * 1000),
        },
    };

    return new QueryClient({
        defaultOptions: defaultQueryClientOptions,
    });
};

export default useQueryClient;
