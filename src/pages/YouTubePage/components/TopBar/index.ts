import { connect } from "react-redux";

import thunkFetchMovies from "reduxware/thunks/fetchMovies_Thunk";

import TopBar from "./TopBar";

const mapDispatchToProps = (dispatch: Function) => ({
    thunkFetchMovies: (URL: string) => dispatch(thunkFetchMovies(URL)),
});
export default connect(null, mapDispatchToProps)(TopBar);
