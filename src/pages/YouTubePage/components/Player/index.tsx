import YouTube from "react-youtube";
import { useCallback } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { useDispatchAction } from "hooks";
import { PLAYER_OPTIONS } from "./config";
import { getPlayerFeed } from "reduxware/reducers/moviesReducer";

export const Player = () => {
    const { videoId, title, description } = useSelector(getPlayerFeed, shallowEqual);
    const { showError, clearPlayerFeed } = useDispatchAction();
    const { t } = useTranslation();

    const dispatchError = useCallback(() => {
        showError({
            isError: true,
            errorMessage: t("errors.video.unavailableDescription"),
        });

        clearPlayerFeed();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [t]);

    if (!videoId) return <section className="player player--empty"></section>;

    return (
        <section className="player" id="player-id">
            <YouTube
                videoId={videoId}
                opts={PLAYER_OPTIONS}
                className={"youtube"}
                id={"youtube-container"}
                onError={dispatchError}
            />
            <p className="title">{title}</p>
            <p className="description">{description}</p>
        </section>
    );
};

export default Player;
