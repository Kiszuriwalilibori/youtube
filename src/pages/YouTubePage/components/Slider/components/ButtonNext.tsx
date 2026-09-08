import IconButton from "@mui/material/IconButton";
import Icons from "icons";
import { SliderOrientation } from "types";

interface Props {
    disabled: boolean | undefined;
    handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
    sliderOrientation: SliderOrientation | undefined;
}

const ButtonNext = (props: Props) => {
    const { handleClick, disabled, sliderOrientation } = props;

    const isHorizontal = sliderOrientation === "horizontal";

    return (
        <IconButton
            id="next"
            aria-label="Show next thumb"
            onClick={handleClick}
            disabled={disabled}
            disableRipple
            sx={{
                position: "absolute",
                top: isHorizontal ? "40px" : 0,
                right: isHorizontal ? 0 : "auto",
                left: isHorizontal ? "auto" : "120px",
                bottom: isHorizontal ? "auto" : 0,
                border: "none",
                borderRadius: "var(--ytd-search-height)",
                padding: 0,
                margin: "5px",
                height: "44px",
                width: "44px",
                backgroundColor: "var(--ytd-alarm-color)",
                zIndex: 10,
                "&:disabled": {
                    backgroundColor: "var(--yt-spec-touch-response)",
                },
                "& svg": {
                    pointerEvents: "none",
                },
                ...(isHorizontal ? {} : { transform: "rotate(180deg)" }),
                "@media (min-width: 1200px)": isHorizontal
                    ? {
                          top: 0,
                          right: "auto",
                          left: "120px",
                          bottom: "auto",
                      }
                    : {},
            }}
        >
            <Icons.Right />
        </IconButton>
    );
};

export default ButtonNext;
