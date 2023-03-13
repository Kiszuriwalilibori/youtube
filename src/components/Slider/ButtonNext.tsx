import { BasicButton } from "components";
import Icons from "icons";
import { SliderOrientation } from "types";

interface Props {
    disabled: boolean | undefined;
    clickHandler: React.MouseEventHandler<HTMLButtonElement> | undefined;
    sliderOrientation: SliderOrientation | undefined;
}

const ButtonPrevious = (props: Props) => {
    const { clickHandler, disabled, sliderOrientation } = props;

    return (
        <BasicButton
            id="next"
            className={
                sliderOrientation === "horizontal" ? "button--sidebar button--right" : "button--sidebar button--upwards"
            }
            onClick={clickHandler}
            disabled={disabled}
        >
            <Icons.Right />
        </BasicButton>
    );
};

export default ButtonPrevious;
