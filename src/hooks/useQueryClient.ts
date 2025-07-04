import { QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useDispatchAction from "./useDispatchAction";

const useQueryClient = () => {
    const { showError, completeLoading } = useDispatchAction();

    const queryErrorHandler = (err: unknown): void => {
        const axiosError = err as AxiosError;
        completeLoading();
        showError({ isError: true, errorMessage: axiosError.message });
    };

    const defaultQueryClientOptions = {
        queries: {
            onError: queryErrorHandler,
            retry: false,
            // cacheTime: 1.1 * (60 * 1000),
            cacheTime: 10 * (60 * 1000), // 10 minut
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            // staleTime: 1 * (60 * 1000),
            // refetchInterval: 1 * (60 * 1000),
            staleTime: 5 * (60 * 1000), // 5 minut
            refetchInterval: undefined,
        },
    };

    return new QueryClient({
        defaultOptions: defaultQueryClientOptions,
    });
};

export default useQueryClient;
