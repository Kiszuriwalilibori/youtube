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

    return (
        <IconButton
            id="next"
            aria-label="Show next thumb"
            className={
                sliderOrientation === "horizontal" ? "button--slider button--right" : "button--slider button--upwards"
            }
            onClick={handleClick}
            disabled={disabled}
            disableRipple
        >
            <Icons.Right />
        </IconButton>
    );
};

export default ButtonNext;
