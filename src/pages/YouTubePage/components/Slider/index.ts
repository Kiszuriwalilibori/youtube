import { connect } from "react-redux";

import Slider from "./Slider";
import thunkFetchVideos from "reduxware/thunks/fetchVideos_Thunk";

const mapDispatchToProps = (dispatch: Function) => ({
    thunkFetchVideos: (URL: string) => dispatch(thunkFetchVideos(URL)),
});

export default connect(null, mapDispatchToProps)(Slider);
// todo lepiej by wziąć przez selector
