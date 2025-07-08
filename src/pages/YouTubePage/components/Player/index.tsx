import YouTube from "react-youtube";

import { useCallback } from "react";
import { shallowEqual, useSelector } from "react-redux";

import { useDispatchAction } from "hooks";
import { PLAYER_OPTIONS } from "./config";
import { getPlayerFeed } from "reduxware/reducers/moviesReducer";

export const Player = () => {
    const { videoId, title, description } = useSelector(getPlayerFeed, shallowEqual);
    const { showError, clearPlayerFeed } = useDispatchAction();
    const dispatchError = useCallback(() => {
        showError({
            isError: true,
            errorMessage: "This video is unavailable. Try selecting another video or refresh the page.",
        });

        clearPlayerFeed();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!videoId) return <section className="player player--empty"></section>;
    return (
        <section className="player" id="player-id">
            <YouTube
                videoId={videoId}
                opts={PLAYER_OPTIONS}
                className={"youtube"}
                id={"youtube-container"} // jest używane
                onError={dispatchError}
            ></YouTube>
            <p className="title">{title}</p>
            <p className="description">{description}</p>
        </section>
    );
};
export default Player;
