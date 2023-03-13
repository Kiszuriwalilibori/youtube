import YouTube from "react-youtube";

import { useCallback } from "react";
import { useSelector } from "react-redux";

import useDispatchAction from "hooks/useDispatchAction";

import { selectMovie } from "reduxware/selectors";

const options = {
    width: "100%",
    height: "100%",
    playerVars: {
        controls: 1,
        autoplay: 1,
        hl: "pl",
        modestbranding: 1,
    },
};

const error = {
    isError: true,
    errorMessage: "Video caused error",
};

export const Player = () => {
    const { videoId, title, description } = useSelector(selectMovie);
    const { showError } = useDispatchAction();
    const dispatchError = useCallback(() => {
        showError(error);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!videoId) return null;

    return (
        <section className="player" id="player-id">
            <YouTube videoId={videoId} opts={options} className={"youtube"} onError={dispatchError}></YouTube>
            <p className="title">{title}</p>
            <p className="description">{description}</p>
        </section>
    );
};
export default Player;
