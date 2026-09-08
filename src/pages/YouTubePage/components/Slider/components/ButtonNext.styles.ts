import { SxProps, Theme } from "@mui/material/styles";
import { SliderOrientation } from "types";

export const styles = (sliderOrientation: SliderOrientation | undefined): SxProps<Theme> => {
    const isHorizontal = sliderOrientation === "horizontal";

    return {
        position: "absolute",
        top: "40px",
        right: 0,
        border: "none",
        borderRadius: "var(--ytd-search-height)",
        padding: 0,
        margin: "5px",
        height: "44px",
        width: "44px",
        backgroundColor: "var(--ytd-alarm-color)",
        zIndex: 10,
        transform: isHorizontal ? "none" : "rotateZ(-90deg)",
        "&:disabled": {
            backgroundColor: "var(--yt-spec-touch-response)",
        },
        "& svg": {
            pointerEvents: "none",
        },
        "@media (min-width: 751px)": {
            top: isHorizontal ? "auto" : 0,
            right: isHorizontal ? "auto" : 0,
            left: "120px",
            bottom: isHorizontal ? 0 : "auto",
        },
    };
};
