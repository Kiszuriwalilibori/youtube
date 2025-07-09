import YouTube from "react-youtube";
import { useCallback, useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import type { YouTubeEvent } from "react-youtube";

import { useDispatchAction } from "hooks";
import { getPlayerFeed } from "reduxware/reducers/moviesReducer";
import { PLAYER_OPTIONS } from "./config";

export const Player = () => {
    const { videoId, title, description } = useSelector(getPlayerFeed, shallowEqual);
    const { showError, clearPlayerFeed } = useDispatchAction();
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();
    // const videoId = "invalid-video-id";
    useEffect(() => {
        setHasError(false);
        setIsLoading(!!videoId);
    }, [videoId]);

    const dispatchError = useCallback(() => {
        setHasError(true);
        setIsLoading(false);
        showError({
            isError: true,
            errorMessage: t("errors.video.unavailableDescription"),
        });

        clearPlayerFeed();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [t]);

    useEffect(() => {
        const handleRejection = (event: PromiseRejectionEvent) => {
            const reason = event.reason?.message || event.reason || "";
            if (
                reason.includes("Invalid video id") ||
                reason.includes("Video unavailable") ||
                reason.includes("not found") ||
                reason.includes("private video") ||
                reason.includes("removed")
            ) {
                event.preventDefault();
                dispatchError();
            }
        };

        const handleError = (event: ErrorEvent) => {
            const message = event.message || "";
            if (
                message.includes("Invalid video id") ||
                message.includes("Video unavailable") ||
                message.includes("YouTube")
            ) {
                event.preventDefault();
                dispatchError();
            }
        };

        window.addEventListener("unhandledrejection", handleRejection);
        window.addEventListener("error", handleError);

        return () => {
            window.removeEventListener("unhandledrejection", handleRejection);
            window.removeEventListener("error", handleError);
        };
    }, [dispatchError]);

    const handleError = useCallback(
        (error: any) => {
            console.warn("YouTube player error:", error);
            dispatchError();
        },
        [dispatchError]
    );

    const handleReady = useCallback(
        (event: YouTubeEvent) => {
            try {
                const player = event.target;
                const videoData = player.getVideoData();

                if (!videoData || !videoData.video_id || videoData.video_id !== videoId) {
                    dispatchError();
                    return;
                }

                setIsLoading(false);
            } catch (error) {
                console.warn("Error checking video data:", error);
                dispatchError();
            }
        },
        [videoId, dispatchError]
    );

    const handleStateChange = useCallback(
        (event: YouTubeEvent) => {
            try {
                const player = event.target;

                if (event.data === 1) {
                    setIsLoading(false);
                }

                if (event.data === -1) {
                    const videoData = player.getVideoData();
                    if (!videoData || !videoData.video_id || videoData.video_id !== videoId) {
                        dispatchError();
                        return;
                    }
                }

                // Check for error state (YouTube doesn't have a specific error state number)
                // But we can detect issues through video data
                if (event.data === 5) {
                    // Video cued
                    const videoData = player.getVideoData();
                    if (!videoData || videoData.title === "") {
                        // Sometimes invalid videos get cued but have no title
                        setTimeout(() => {
                            const updatedData = player.getVideoData();
                            if (!updatedData || updatedData.title === "") {
                                dispatchError();
                            }
                        }, 1000);
                    }
                }
            } catch (error) {
                console.warn("Error in state change handler:", error);
                dispatchError();
            }
        },
        [videoId, dispatchError]
    );

    const isValidVideoId = useCallback((id: string) => {
        if (!id || typeof id !== "string") return false;

        const videoIdRegex = /^[a-zA-Z0-9_-]{11}$/;
        return videoIdRegex.test(id);
    }, []);

    useEffect(() => {
        if (videoId && !isValidVideoId(videoId)) {
            dispatchError();
        }
    }, [videoId, isValidVideoId, dispatchError]);

    if (!videoId && !hasError) {
        return (
            <p className="player--no-video" aria-live="polite">
                {t("video.noVideoSelected")}
            </p>
        );
    }

    if (hasError) {
        console.log("Player error: ", t("errors.video.unavailableDescription"));
        return (
            <section className="player player--empty" aria-live="polite">
                {/* <p>{t("errors.video.unavailableDescription")}</p> */}
            </section>
        );
    }

    return (
        <section className="player" id="player-id">
            <YouTube
                videoId={videoId}
                opts={PLAYER_OPTIONS}
                className={"youtube"}
                id={"youtube-container"}
                onError={handleError}
                onReady={handleReady}
                onStateChange={handleStateChange}
            />
            {isLoading && (
                <div className="player-loading" aria-live="polite">
                    {t("video.loading", "Loading video...")}
                </div>
            )}
            <p className="title">{title}</p>
            <p className="description">{description}</p>
        </section>
    );
};

export default Player;

//bols spisał się nieźle
