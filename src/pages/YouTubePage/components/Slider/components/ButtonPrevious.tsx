import IconButton from "@mui/material/IconButton";
import Icons from "icons";
import { SliderOrientation } from "types";

interface Props {
    disabled: boolean | undefined;
    handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
    sliderOrientation: SliderOrientation | undefined;
}

const ButtonPrevious = (props: Props) => {
    const { handleClick, disabled, sliderOrientation } = props;

    return (
        <IconButton
            id="previous"
            aria-label="Show previous thumb"
            className={
                sliderOrientation === "horizontal" ? "button--slider button--left" : "button--slider button--downwards"
            }
            onClick={handleClick}
            disabled={disabled}
            disableRipple
        >
            <Icons.Left />
        </IconButton>
    );
};

export default ButtonPrevious;
