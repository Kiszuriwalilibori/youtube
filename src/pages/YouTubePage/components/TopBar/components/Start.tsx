import IconButton from "@mui/material/IconButton";
import { BasicButton } from "components";
import Icons from "icons";
import { useTranslation } from "react-i18next";

const Start = () => {
    const { t } = useTranslation();
    return (
        <div className="TopBar__start visible">
            <IconButton aria-label={t("buttons.guide")}>
                <Icons.Hamburger />
            </IconButton>

            <BasicButton className="button--youtube" title={t("buttons.youtubeMain")}>
                <Icons.YouTube />
            </BasicButton>
        </div>
    );
};
export default Start;
