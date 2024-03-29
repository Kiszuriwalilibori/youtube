import { QueryClientProvider } from "@tanstack/react-query";
import { useDispatchAction, useQueryClient } from "hooks";
import { QueryClient } from "@tanstack/react-query";
import React from "react";
import { ReactNode } from "react";
import { AxiosError } from "axios";

export const TanstackQueryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // const queryClient = useQueryClient();

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
            cacheTime: 1.1 * (60 * 1000),
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            staleTime: 1 * (60 * 1000),
            refetchInterval: 1 * (60 * 1000),
        },
    };

    const [queryClient] = React.useState(
        () =>
            new QueryClient({
                defaultOptions: defaultQueryClientOptions,
            })
    );

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default TanstackQueryProvider;
