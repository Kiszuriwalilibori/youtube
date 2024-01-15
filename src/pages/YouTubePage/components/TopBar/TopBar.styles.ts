import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

const HIDDEN_BTN_HOVER_COLOR = "#e5e5e5";

const COLOR_SUNNY_DARK = "#ffb800";
const COLOR_SUNNY_HOVER = "#ffe37e";
const INITIAL_BTN_MIC_COLOR = "#eeeeee";

export const ShowHiddenButton = styled(IconButton)(({ theme }) => ({
    "&.Mui-disabled": {
        opacity: 0.3,
    },
    height: "40px",
    width: "40px",
    transition: "backgroundColor 0.3s",
    "&:hover": { backgroundColor: HIDDEN_BTN_HOVER_COLOR },
    padding: theme.spacing(0.5),
}));

export const MicrophoneButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: INITIAL_BTN_MIC_COLOR,
    marginLeft: theme.spacing(0.5),
    padding: "10px",
    "@media(max-width: 430px)": { display: "none" },
    "&.Mui-disabled": {
        opacity: 0.3,
    },
}));

export const listeningMicrophoneSx = (listening: boolean) => {
    if (listening) {
        return {
            backgroundColor: COLOR_SUNNY_DARK,
            animation: "bgr 1s infinite",
            "&:hover": {
                backgroundColor: COLOR_SUNNY_HOVER,
            },

            "@keyframes bgr": {
                "0%": {
                    backgroundColor: COLOR_SUNNY_DARK,
                },
                "50%": {
                    backgroundColor: COLOR_SUNNY_HOVER,
                },
                "100%": {
                    backgroundColor: COLOR_SUNNY_DARK,
                },
            },
        };
    } else {
        return {
            backgroundColor: INITIAL_BTN_MIC_COLOR,
            "&:hover": {
                backgroundColor: "lightgrey",
            },
        };
    }
};
