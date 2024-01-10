import { SliderOrientation, ViewportSize } from "types/index";
import getRoundedNumber from "./getRoundedNumber";
import { THUMBNAIL_SIZE, VIEWPORT_SIZE_OFFSET } from "../constans/constans";

export function getSliderCapacity(orientation: SliderOrientation, viewportSize: ViewportSize) {
    let result = 0;
    switch (orientation) {
        case "horizontal":
            if (viewportSize.width)
                result = getRoundedNumber(viewportSize.width - VIEWPORT_SIZE_OFFSET, THUMBNAIL_SIZE.width);
            break;
        case "vertical":
            if (viewportSize.height) result = getRoundedNumber(viewportSize.height, THUMBNAIL_SIZE.height);
            break;
        default:
            return 0;
    }
    return result;
}
export default getSliderCapacity;
