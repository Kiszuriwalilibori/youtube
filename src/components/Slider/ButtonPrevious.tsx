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
            id="previous"
            className={
                sliderOrientation === "horizontal"
                    ? "button--sidebar button--left"
                    : "button--sidebar button--downwards"
            }
            onClick={clickHandler}
            disabled={disabled}
        >
            <Icons.Left />
        </BasicButton>
    );
};

export default ButtonPrevious;
