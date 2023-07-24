import { IconButton, Stack, useMediaQuery } from "@mui/material";
import Icons from "icons";

const End = () => {
    return (
        <div className="TopBar__end">
            <Stack direction="row" spacing={useMediaQuery("(min-width:750px)") ? 2.5 : 0}>
                <IconButton aria-label="Create a content" title="camera">
                    <Icons.CameraPlus />
                </IconButton>
                <IconButton
                    className="hiddenxsmall"
                    aria-label="Turn on notifications for the channel"
                    title="notifications"
                >
                    <Icons.Bell />
                </IconButton>
            </Stack>
        </div>
    );
};
export default End;
