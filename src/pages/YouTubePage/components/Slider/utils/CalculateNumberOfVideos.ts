import { SliderOrientation } from "types/index";
import getRoundedNumber from "./getRoundedNumber";
import { thumbnailSize } from "../constans/constans";

export function calculateNumberOfVideos(orientation: SliderOrientation, width: number, height: number) {
    switch (orientation) {
        case "horizontal":
            if (width) return getRoundedNumber(width - 40, thumbnailSize.width);
            break;
        case "vertical":
            if (height) return getRoundedNumber(height as number, thumbnailSize.height);
            break;
        default:
            break;
    }
}
export default calculateNumberOfVideos;
