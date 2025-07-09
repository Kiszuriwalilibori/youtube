import Icons from "icons";

import { IconButton, Stack, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { isOfflineSelector } from "reduxware/reducers/onlineReducer";
import { useTranslation } from "react-i18next";

const cameraButtonSx = {
    marginLeft: "4px",
    "&.Mui-disabled": {
        opacity: 0.3,
    },
};

const bellButtonSx = {
    marginLeft: "4px",
    "&.Mui-disabled": {
        opacity: 0.3,
    },
};

const End = () => {
    const { t } = useTranslation();
    const isOffline = useSelector(isOfflineSelector);
    return (
        <div className="TopBar__end">
            <Stack direction="row" spacing={useMediaQuery("(min-width:750px)") ? 2.5 : 0}>
                <IconButton
                    sx={cameraButtonSx}
                    aria-label={t("topbar.createContent")}
                    title={t("buttons.camera")}
                    disabled={isOffline}
                    className="with-tooltip"
                    data-tooltip={t("buttons.camera")}
                >
                    <Icons.CameraPlus />
                </IconButton>
                <IconButton
                    sx={bellButtonSx}
                    className="hiddenxsmall"
                    data-tooltip-right-edge={t("buttons.bell")}
                    aria-label={t("topbar.notifications")}
                    title={t("buttons.bell")}
                    disabled={isOffline}
                >
                    <Icons.Bell />
                </IconButton>
            </Stack>
        </div>
    );
};
export default End;
