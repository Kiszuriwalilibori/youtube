import { useEffect, useState } from "react";

export const useVideoState = (videoId: string) => {
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setHasError(false);
        setIsLoading(!!videoId);
    }, [videoId]);

    return {
        hasError,
        setHasError,
        isLoading,
        setIsLoading,
    };
};

export default useVideoState;
