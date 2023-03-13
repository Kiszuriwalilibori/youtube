import { BasicButton } from "components";
import Icons from "icons";

const End = () => {
    return (
        <div className="TopBar__end">
            <div className="buttons">
                <BasicButton className="button--reverted">
                    <Icons.CameraPlus />
                </BasicButton>
                <BasicButton className="button--reverted hiddenxsmall">
                    <Icons.Bell />
                </BasicButton>
            </div>
        </div>
    );
};
export default End;
