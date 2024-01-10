import { BasicButton } from "components";
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
        <BasicButton
            id="next"
            aria-label="Show previous thumb"
            className={
                sliderOrientation === "horizontal" ? "button--slider button--right" : "button--slider button--upwards"
            }
            onClick={handleClick}
            disabled={disabled}
        >
            <Icons.Right />
        </BasicButton>
    );
};

export default ButtonNext;
