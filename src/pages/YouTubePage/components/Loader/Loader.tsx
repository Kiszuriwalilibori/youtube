import { CircularProgress, Modal } from "@mui/material";

import useDelayedCondition from "hooks/useDelayedCondition";

import { circularProgressSx } from "./Loader.styles";
import { RootStateType } from "types/types";
import { useSelector } from "react-redux";

export const Loader = () => {
    const isLoading = useSelector((state: RootStateType) => state.fetch.isLoading);
    const shouldRender = useDelayedCondition(isLoading);
    return (
        <Modal open={shouldRender} aria-label="Loading">
            <CircularProgress color="warning" sx={circularProgressSx} />
        </Modal>
    );
};
export default Loader;
