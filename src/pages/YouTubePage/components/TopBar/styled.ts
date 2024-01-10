import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

export const ShowHiddenButton = styled(IconButton)(({ theme }) => ({
    "&.Mui-disabled": {
        opacity: 0.3,
    },
    height: "40px",
    width: "40px",
    transition: "backgroundColor 0.3s",
    "&:hover": { backgroundColor: "#e5e5e5" },
    padding: theme.spacing(0.5),
}));

export const MicrophoneButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: "#f8f8f8",
    marginLeft: theme.spacing(0.5),
    padding: "10px",
    "@media(max-width: 430px)": { display: "none" },
}));
