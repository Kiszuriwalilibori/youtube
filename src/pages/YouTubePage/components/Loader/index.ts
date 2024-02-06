import { connect } from "react-redux";

import Loader from "./Loader";

import { RootStateType } from "types";

const mapStateToProps = (state: RootStateType) => ({
    isLoading: state.fetch.isLoading,
});

export default connect(mapStateToProps, {})(Loader);
