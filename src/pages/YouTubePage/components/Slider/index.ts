import { connect } from "react-redux";
import { RootStateType } from "types";
import { renderConditionally } from "HOCs";

import Slider from "./Slider";

const mapStateToProps = (state: RootStateType) => ({
    renderCondition: Boolean(state.movies.movies.length),
});

export default connect(mapStateToProps, {})(renderConditionally(Slider));
// todo lepiej by wziąć przez selector
