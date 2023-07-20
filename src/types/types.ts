import { RootStateType } from "components/AppProvider/AppProvider";

export type PathKeys = "youtube" | "landing" | "nopage";

interface Video {
    id: { videoId: string };
    snippet: { title: string; description: string; thumbnails: { medium: { url: string } } };
}

type Videos = Video[];

type SliderOrientation = "vertical" | "horizontal";

interface PageToken {
    next: string | undefined;
    prev: string | undefined;
}

export type { RootStateType, Video, SliderOrientation, Videos, PageToken };
