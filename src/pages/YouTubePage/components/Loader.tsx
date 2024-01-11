import { memo } from "react";
import { CircularProgress, Modal } from "@mui/material";

const circularProgressSx = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
};
export const Loader = () => {
    return (
        <Modal open={true} aria-label="Loading">
            <CircularProgress color="warning" sx={circularProgressSx} />
        </Modal>
    );
};
export default memo(Loader);
