import YouTube from "react-youtube";
import { useCallback } from "react";
import { shallowEqual, useSelector } from "react-redux";

import { useDispatchAction } from "hooks";
import { options } from "./config";
import { getPlayerFeed } from "reduxware/reducers/playerReducer";

export const Player = () => {
    const { videoId, title, description } = useSelector(getPlayerFeed, shallowEqual);
    const { showError, clearPlayerFeed } = useDispatchAction();
    const dispatchError = useCallback(() => {
        showError({
            isError: true,
            errorMessage: "Requested video caused error and can not be displayed",
        });

        clearPlayerFeed();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!videoId) return null; // todo lepsza jakaś grafika z przekreślonym ekranem albo cokolwiek podobnego

    return (
        <section className="player" id="player-id">
            <YouTube videoId={videoId} opts={options} className={"youtube"} onError={dispatchError}></YouTube>
            <p className="title">{title}</p>
            <p className="description">{description}</p>
        </section>
    );
};
export default Player;
