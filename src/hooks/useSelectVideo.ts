import { useCallback, useEffect, useState } from "react";
import { Video } from "types";
import useDispatchAction from "./useDispatchAction";

const initialSelectedVideo = {} as Video;

const useSelectMovie = () => {
    const [selectedVideo, setSelected] = useState<Video>(initialSelectedVideo);
    const { setSelectedMovie } = useDispatchAction();

    const selectVideo = useCallback((movie: Video) => {
        setSelected(movie);
    }, []);
    useEffect(() => {
        selectedVideo && selectedVideo !== initialSelectedVideo && setSelectedMovie(selectedVideo);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedVideo]);
    return { selectedVideo, selectVideo };
};

export default useSelectMovie;
