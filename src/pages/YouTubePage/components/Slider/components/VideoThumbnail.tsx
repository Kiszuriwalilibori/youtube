import { forwardRef, useCallback } from "react";
import { Box } from "@mui/material";
import { Video } from "types";

interface Props {
    clickHandler: (video: Video) => void;
    video: Video;
    isSelected: boolean;
}

const VideoThumbnail = forwardRef<HTMLButtonElement, Props>(function VideoThumbnail(
    { clickHandler, video, isSelected },
    ref
) {
    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation();
            clickHandler(video);
        },
        [video, clickHandler]
    );

    if (!Boolean(video?.snippet?.title && video.id.videoId)) return null;

    const src = video?.snippet?.thumbnails?.medium?.url;
    const alt = video?.snippet?.title || "video";

    return (
        <Box
            component="button"
            ref={ref}
            type="button"
            className={isSelected ? "movie selected" : "movie"}
            onClick={handleClick}
            aria-pressed={isSelected}
            sx={{
                appearance: "none",
                border: 0,
                padding: 0,
                margin: 0,
                font: "inherit",
                color: "inherit",
                background: "none",
                textAlign: "inherit",
                cursor: "pointer",
                borderRadius: "12px",
            }}
        >
            <div className="movie__picture">
                <img src={src} alt={alt} />
            </div>
            <div className="movie__title title">{video.snippet.title}</div>
        </Box>
    );
});

export default VideoThumbnail;
