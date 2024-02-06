import { memo } from "react";
import { CircularProgress, Modal } from "@mui/material";

import useDelayedCondition from "hooks/useDelayedCondition";

const circularProgressSx = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
};

interface Props {
    isLoading: boolean;
}
export const Loader = (props: Props) => {
    const { isLoading } = props;
    const shouldRender = useDelayedCondition(isLoading);
    return (
        <Modal open={shouldRender} aria-label="Loading">
            <CircularProgress color="warning" sx={circularProgressSx} />
        </Modal>
    );
};
export default Loader;
