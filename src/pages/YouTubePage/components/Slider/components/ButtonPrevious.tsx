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

    return (
        <IconButton
            id="previous"
            aria-label="Show previous thumb"
            onClick={handleClick}
            disabled={disabled}
            disableRipple
            sx={styles(sliderOrientation)}
        >
            <Icons.Left />
        </IconButton>
    );
};

export default ButtonPrevious;
