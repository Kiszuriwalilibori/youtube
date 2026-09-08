import { useEffect } from "react";

import { useSelector } from "react-redux";

import { useBoolean, useDispatchAction } from "hooks";

import { isOnlineSelector } from "reduxware/reducers/onlineReducer";

import { InvalidCredentialsMessage, LanguageSwitch, LoginForm, LoginPrompt, Welcome } from "./components";
const Login = () => {
    const isOnline = useSelector(isOnlineSelector);
    const { logOutUser } = useDispatchAction();
    const [isError, setError, clearError] = useBoolean(false);

    useEffect(() => {
        logOutUser();
    }, [logOutUser]);

    return (
        <section className="page--login">
            <div className="login">
                <InvalidCredentialsMessage isError={isError} />
                <Welcome />
                {isOnline && <LoginPrompt />}
                <LoginForm setError={setError} clearError={clearError} isOnline={isOnline} />
                <LanguageSwitch />
            </div>
        </section>
    );
};

export default Login;
