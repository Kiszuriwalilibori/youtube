import { memo } from "react";
import { CircularProgress, Modal } from "@mui/material";

export const Loader = () => {
    return (
        <Modal open={true} aria-label="Loading">
            <CircularProgress
                color="warning"
                sx={{ position: "absolute" as "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
            />
        </Modal>
    );
};
export default memo(Loader);
