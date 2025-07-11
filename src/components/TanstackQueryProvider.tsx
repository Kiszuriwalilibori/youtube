import React, { ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useDispatchAction } from "hooks";

import { ApiError } from "types/ApiError";

export const TanstackQueryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { showError, completeLoading } = useDispatchAction();

    const queryErrorHandler = (err: unknown): void => {
        const error = err as Error;
        completeLoading();
        showError({ isError: true, errorMessage: error.message });
    };
    console.log("TanstackQueryProvider");
    const defaultQueryClientOptions = {
        queries: {
            onError: queryErrorHandler,
            retry: false,
            cacheTime: 10 * (60 * 1000),
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            staleTime: 5 * (60 * 1000),
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
