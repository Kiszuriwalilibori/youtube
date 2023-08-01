import { SliderOrientation, ViewportSize } from "types/index";
import getRoundedNumber from "./getRoundedNumber";
import { thumbnailSize } from "../constans/constans";

export function calculateSliderCapacity(orientation: SliderOrientation, viewportSize: ViewportSize) {
    let result = 0;
    switch (orientation) {
        case "horizontal":
            if (viewportSize.width) result = getRoundedNumber(viewportSize.width - 40, thumbnailSize.width);
            break;
        case "vertical":
            if (viewportSize.height) result = getRoundedNumber(viewportSize.height as number, thumbnailSize.height);
            break;
        default:
            return 0;
    }
    return result;
}
export default calculateSliderCapacity;
