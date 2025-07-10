import { useCallback } from "react";

export const useYouTubeIdValidation = () => {
    const isValidVideoId = useCallback((id: string) => {
        if (!id || typeof id !== "string") return false;
        const videoIdRegex = /^[a-zA-Z0-9_-]{11}$/;
        return videoIdRegex.test(id);
    }, []);

    return { isValidVideoId };
};
export default useYouTubeIdValidation;
