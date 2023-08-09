import { QueryClientProvider } from "@tanstack/react-query";
import { useQueryClient } from "hooks";
import { ReactNode } from "react";

export const TanstackQueryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const queryClient = useQueryClient();

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default TanstackQueryProvider;
