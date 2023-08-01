import { RootStateType } from "components/AppProvider/AppProvider";

export type PathKeys = "youtube" | "landing" | "nopage";

interface Video {
    id: { videoId: string };
    snippet: { title: string; description: string; thumbnails: { medium: { url: string } } };
}
interface PlayerFeed {
    title: string;
    description: string;
    videoId: string;
}
type Videos = Video[];

type SliderOrientation = "vertical" | "horizontal";

interface ViewportSize {
    width: number;
    height: number;
}

interface PageToken {
    next: string | undefined;
    prev: string | undefined;
}

type LastSize = "large" | "small" | undefined;

export type { LastSize, RootStateType, Video, SliderOrientation, Videos, PageToken, PlayerFeed, ViewportSize };
