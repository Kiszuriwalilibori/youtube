import { connect } from "react-redux";
import { RootStateType } from "types";

import YouTubePage from "./YouTubePage";

const mapStateToProps = (state: RootStateType) => ({
    isLogged: state.log.isLogged,
    isLoading: state.fetch.isLoading,
    isError: state.fetch.isError,
    errorMessage: state.fetch.errorMessage,
});

export default connect(mapStateToProps, {})(YouTubePage);
