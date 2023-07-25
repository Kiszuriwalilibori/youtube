import { SliderOrientation } from "types/index";
import getRoundedNumber from "./getRoundedNumber";
import { thumbnailSize } from "../constans/constans";

export function calculateNumberOfVideos(orientation: SliderOrientation, width: number, height: number) {
    let count = 0;

    switch (orientation) {
        case "horizontal":
            if (width) count = getRoundedNumber(width - 40, thumbnailSize.width);
            break;
        case "vertical":
            if (height) count = getRoundedNumber(height as number, thumbnailSize.height);
            break;
        default:
            break;
    }

    return count;
}

export default calculateNumberOfVideos;

// todo a nie prościej return wsadzić do switcha i nie robić zmiennej count wogóle?
