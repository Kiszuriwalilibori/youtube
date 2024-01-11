import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

const ACTIVE_BUTTON_MIC_COLOR = "#48BF53";
const INITIAL_BTN_MIC_COLOR = "#f8f8f8";
const HIDDEN_BTN_HOVER_COLOR = "#e5e5e5";

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

export const getMicrophoneBackgroundColor = (listening: Boolean) => {
    return listening ? ACTIVE_BUTTON_MIC_COLOR : "initial";
};
export const getMicrophoneHoverColor = (listening: Boolean) => {
    return listening ? ACTIVE_BUTTON_MIC_COLOR : "lightgrey";
};
