import IconButton from "@mui/material/IconButton";
import Icons from "icons";
import { SliderOrientation } from "types";
import { styles } from "./ButtonPrevious.styles";

interface Props {
    disabled: boolean | undefined;
    handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
    sliderOrientation: SliderOrientation | undefined;
}

const ButtonPrevious = (props: Props) => {
    const { handleClick, disabled, sliderOrientation } = props;

    const isHorizontal = sliderOrientation === "horizontal";

    return (
        <IconButton
            id="previous"
            aria-label="Show previous thumb"
            onClick={handleClick}
            disabled={disabled}
            disableRipple
            sx={styles(sliderOrientation)}
            // sx={{
            //     position: "absolute",
            //     top: isHorizontal ? "40px" : "50px",
            //     left: 0,
            //     border: "none",
            //     borderRadius: "var(--ytd-search-height)",
            //     padding: 0,
            //     margin: "5px",
            //     height: "44px",
            //     width: "44px",
            //     backgroundColor: "var(--ytd-alarm-color)",
            //     zIndex: 10,
            //     transform: isHorizontal ? "none" : "rotateZ(-90deg)",
            //     "&:disabled": {
            //         backgroundColor: "var(--yt-spec-touch-response)",
            //     },
            //     "& svg": {
            //         pointerEvents: "none",
            //     },
            //     "@media (min-width: 751px)": {
            //         top: isHorizontal ? "auto" : "50px",
            //         left: "120px",
            //         bottom: isHorizontal ? 0 : "auto",
            //     },
            // }}
        >
            <Icons.Left />
        </IconButton>
    );
};

export default ButtonPrevious;
