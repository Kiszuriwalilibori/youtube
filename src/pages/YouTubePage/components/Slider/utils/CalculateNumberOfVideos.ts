import { SliderOrientation } from "types/index";
import calculateMoviesNumber from "./CalculateMoviesNumber";
import { movieWidth, movieHeight } from "../constans/constans";

export function calculateNumberOfVideos(orientation: SliderOrientation, width: number, height: number) {
    let count = 0;

    switch (orientation) {
        case "horizontal":
            if (width) count = calculateMoviesNumber(width - 40, movieWidth);
            break;
        case "vertical":
            if (height) count = calculateMoviesNumber(height as number, movieHeight);
            break;
        default:
            break;
    }

    return count;
}

export default calculateNumberOfVideos;
