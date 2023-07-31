import YouTube from "react-youtube";

import { useCallback } from "react";
import { useSelector } from "react-redux";

import useDispatchAction from "hooks/useDispatchAction";

import { selectVideo } from "reduxware/selectors";
import { options } from "./config";

export const Player = () => {
    const { videoId, title, description } = useSelector(selectVideo);
    const { showError, clearSelectedVideo } = useDispatchAction();
    const dispatchError = useCallback(() => {
        showError({
            isError: true,
            errorMessage: "Requested video caused error and can not be displayed",
        });
        clearSelectedVideo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!videoId) return null; // lepsza jakaś grafika z przekreślonym ekranem albo cokolwiek podobnego

    return (
        <section className="player" id="player-id">
            <YouTube videoId={videoId} opts={options} className={"youtube"} onError={dispatchError}></YouTube>
            <p className="title">{title}</p>
            <p className="description">{description}</p>
        </section>
    );
};
export default Player;
