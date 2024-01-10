import Icons from "icons";

import { IconButton, Stack, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { isOfflineSelector } from "reduxware/reducers/onlineReducer";

const End = () => {
    const isOffline = useSelector(isOfflineSelector);
    return (
        <div className="TopBar__end">
            <Stack direction="row" spacing={useMediaQuery("(min-width:750px)") ? 2.5 : 0}>
                <IconButton
                    sx={{
                        marginLeft: "4px",
                        "&.Mui-disabled": {
                            opacity: 0.3,
                        },
                    }}
                    aria-label="Create a content"
                    title="camera"
                    disabled={isOffline}
                >
                    <Icons.CameraPlus />
                </IconButton>
                <IconButton
                    sx={{
                        marginLeft: "4px",
                        "&.Mui-disabled": {
                            opacity: 0.3,
                        },
                    }}
                    className="hiddenxsmall"
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
