import { useCallback, useEffect, useState } from "react";
import { Video } from "types";
import useDispatchAction from "./useDispatchAction";

const initialSelectedVideo = {} as Video;

const useSelectVideo = () => {
    const [selectedVideo, setSelected] = useState<Video>(initialSelectedVideo);
    const { setSelectedVideo } = useDispatchAction();

    const selectVideo = useCallback((video: Video) => {
        setSelected(video);
    }, []);
    useEffect(() => {
        selectedVideo && selectedVideo !== initialSelectedVideo && setSelectedVideo(selectedVideo); // todo czy tozawsze uzywa właściwego initial?
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedVideo]);
    return { selectedVideo, selectVideo };
};

export default useSelectVideo;

// todo lepiej jak thumb aktywny będzie miał czerwoną obwódkę. rozważyć komponent card
