import { CircularProgress, Modal } from "@mui/material";

export const Loader = () => {
    return (
        <Modal open={true} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <CircularProgress
                color="warning"
                sx={{ position: "absolute" as "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
            />
        </Modal>
    );
};
export default Loader;
