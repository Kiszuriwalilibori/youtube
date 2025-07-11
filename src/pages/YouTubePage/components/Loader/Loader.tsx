import { CircularProgress, Modal } from "@mui/material";
import useDelayedCondition from "hooks/useDelayedCondition";
import { useSelector } from "react-redux";
import { getLoadingStatus } from "reduxware/reducers";

import { circularProgressSx } from "./Loader.styles";
export const Loader = () => {
    const isLoading = useSelector(getLoadingStatus);
    const shouldRender = useDelayedCondition(isLoading);
    return (
        <Modal open={shouldRender} aria-label="Loading">
            <CircularProgress color="warning" sx={circularProgressSx} />
        </Modal>
    );
};
export default Loader;
