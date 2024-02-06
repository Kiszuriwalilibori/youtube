import { CircularProgress, Modal } from "@mui/material";

import useDelayedCondition from "hooks/useDelayedCondition";

import { circularProgressSx } from "./Loader.styles";
import { RootStateType } from "types/types";

interface Props {
    isLoading: RootStateType["fetch"]["isLoading"];
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
