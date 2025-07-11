import { shallowEqual, useSelector } from "react-redux";
import { getLoginStatus } from "reduxware/reducers/logReducer";

import NotLogged from "./components/NotLogged";

interface Props {
    children: JSX.Element;
}
export const ProtectedRoute = (props: Props) => {
    const isLogged = useSelector(getLoginStatus, shallowEqual);

    if (!isLogged) {
        return <NotLogged />;
    }

    return props.children;
};
export default ProtectedRoute;
