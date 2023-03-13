import { BasicButton } from "components";
import Icons from "icons";

const Start = () => {
    return (
        <div className="TopBar__start visible">
            <BasicButton className="button--reverted">
                <Icons.Hamburger />
            </BasicButton>
            <BasicButton className="button--youtube">
                <Icons.YouTube />
            </BasicButton>
        </div>
    );
};
export default Start;
