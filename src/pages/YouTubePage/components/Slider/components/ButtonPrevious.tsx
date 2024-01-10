import Icons from "icons";

import { BasicButton } from "components";
import { SliderOrientation } from "types";

interface Props {
    disabled: boolean | undefined;
    handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
    sliderOrientation: SliderOrientation | undefined;
}

const ButtonPrevious = (props: Props) => {
    const { handleClick, disabled, sliderOrientation } = props;

    return (
        <BasicButton
            id="previous"
            aria-label="show previous thumb"
            className={
                sliderOrientation === "horizontal" ? "button--slider button--left" : "button--slider button--downwards"
            }
            onClick={handleClick}
            disabled={disabled}
        >
            <Icons.Left />
        </BasicButton>
    );
};

export default ButtonPrevious;
