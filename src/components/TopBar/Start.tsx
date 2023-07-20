import IconButton from "@mui/material/IconButton";
import { BasicButton } from "components";
import Icons from "icons";

const Start = () => {
    return (
        <div className="TopBar__start visible">
            <IconButton aria-label="Guide">
                <Icons.Hamburger />
            </IconButton>

            <BasicButton className="button--youtube" title=" YouTube main page">
                <Icons.YouTube />
            </BasicButton>
        </div>
    );
};
export default Start;
