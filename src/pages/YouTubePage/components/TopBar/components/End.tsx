import Icons from "icons";

import { IconButton, Stack, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { isOfflineSelector } from "reduxware/reducers/onlineReducer";

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
    const isOffline = useSelector(isOfflineSelector);
    return (
        <div className="TopBar__end">
            <Stack direction="row" spacing={useMediaQuery("(min-width:750px)") ? 2.5 : 0}>
                <IconButton
                    sx={cameraButtonSx}
                    aria-label="Create a content"
                    title="camera"
                    disabled={isOffline}
                    className="with-tooltip"
                    data-tooltip="Create a content"
                >
                    <Icons.CameraPlus />
                </IconButton>
                <IconButton
                    sx={bellButtonSx}
                    className="hiddenxsmall "
                    // className="hiddenxsmall with-tooltip"
                    // data-tooltip="Notifications"
                    aria-label="Turn on notifications for the channel"
                    title="notifications"
                    disabled={isOffline}
                >
                    <Icons.Bell />
                </IconButton>
            </Stack>
        </div>
    );
};
export default End;
