import { useCallback, useEffect, useState } from "react";
import { Video } from "types";
import useDispatchAction from "./useDispatchAction";

const initialSelectedVideo = {} as Video;

const useSelectVideo = () => {
    const [selectedVideo, setSelected] = useState<Video>(initialSelectedVideo);
    const { setPlayerFeed } = useDispatchAction();

    const selectVideo = useCallback((video: Video) => {
        setSelected(video);
    }, []);
    useEffect(() => {
        selectedVideo &&
            selectedVideo !== initialSelectedVideo &&
            setPlayerFeed({
                videoId: selectedVideo?.id.videoId,
                title: selectedVideo?.snippet.title,
                description: selectedVideo?.snippet.description,
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedVideo]);
    return { selectedVideo, selectVideo };
};

export default useSelectVideo;

// todo rozważyć komponent card
