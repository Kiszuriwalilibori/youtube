import { QueryClientProvider } from "@tanstack/react-query";
import { useQueryClient } from "hooks";

export const TanstackQueryProvider = ({ children }: any) => {
    const queryClient = useQueryClient();

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default TanstackQueryProvider;
