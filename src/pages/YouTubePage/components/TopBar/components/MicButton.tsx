import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";

export const MicrophoneButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: "#f8f8f8",
    marginLeft: theme.spacing(0.5),
    "@media(max-width: 430px)": { display: "none" },
}));

export default MicrophoneButton;
