import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { actionCreators } from "reduxware";

const useDispatchAction = () => {
    const dispatch = useDispatch();

    return bindActionCreators(actionCreators, dispatch);
};

export default useDispatchAction;
