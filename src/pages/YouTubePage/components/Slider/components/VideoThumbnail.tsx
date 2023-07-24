import { Video } from "types";
interface Props {
    clickHandler: (movie: Video) => void;
    movie: Video;
    isSelected: boolean;
}

const VideoThumbnail = (props: Props) => {
    const { clickHandler, movie, isSelected } = props;

    if (!Boolean(movie?.snippet?.title && movie.id.videoId)) return null;
    const src = movie?.snippet?.thumbnails?.medium?.url;
    const alt = "Image of " + movie.snippet.title;

    return (
        <div
            className={isSelected ? "movie selected" : "movie"}
            onClick={e => {
                e.stopPropagation();
                clickHandler(movie);
            }}
        >
            <div className="movie__picture">
                <img src={src} alt={alt} />
            </div>
            <div className="movie__title title">{movie.snippet.title}</div>
        </div>
    );
};

export default VideoThumbnail;
