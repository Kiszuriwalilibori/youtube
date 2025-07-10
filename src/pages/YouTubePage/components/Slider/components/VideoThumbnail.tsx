import { useCallback } from "react";
import { Video } from "types";
interface Props {
    clickHandler: (video: Video) => void;
    video: Video;
    isSelected: boolean;
}

const VideoThumbnail = (props: Props) => {
    const { clickHandler, video, isSelected } = props;

    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation();
            clickHandler(video);
        },
        [video, clickHandler]
    );

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            console.log("key pressed", e.key);
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                clickHandler(video);
            }
        },
        [video, clickHandler]
    );

    if (!Boolean(video?.snippet?.title && video.id.videoId)) return null;
    const src = video?.snippet?.thumbnails?.medium?.url;
    const alt = video?.snippet?.title || "video";

    return (
        <div
            className={isSelected ? "movie selected" : "movie"}
            role="button"
            tabIndex={0}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            aria-pressed={isSelected}
        >
            <div className="movie__picture">
                <img src={src} alt={alt} />
            </div>
            <div className="movie__title title">{video.snippet.title}</div>
        </div>
    );
};

export default VideoThumbnail;
