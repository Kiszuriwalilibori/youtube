import { connect } from "react-redux";

import thunkFetchVideos from "reduxware/thunks/fetchVideos_Thunk";

import TopBar from "./TopBar";

const mapDispatchToProps = (dispatch: Function) => ({
    thunkFetchVideos: (URL: string) => dispatch(thunkFetchVideos(URL)),
});
export default connect(null, mapDispatchToProps)(TopBar);
