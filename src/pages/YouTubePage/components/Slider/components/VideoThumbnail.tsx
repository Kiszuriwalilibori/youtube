import { Video } from "types";
interface Props {
    clickHandler: (video: Video) => void;
    video: Video;
    isSelected: boolean;
}

const VideoThumbnail = (props: Props) => {
    const { clickHandler, video, isSelected } = props;

    if (!Boolean(video?.snippet?.title && video.id.videoId)) return null;
    const src = video?.snippet?.thumbnails?.medium?.url;
    const alt = "Image of " + video.snippet.title;

    return (
        <div
            className={isSelected ? "movie selected" : "movie"}
            onClick={e => {
                e.stopPropagation();
                clickHandler(video);
            }}
        >
            <div className="movie__picture">
                <img src={src} alt={alt} />
            </div>
            <div className="movie__title title">{video.snippet.title}</div>
        </div>
    );
};

export default VideoThumbnail;
