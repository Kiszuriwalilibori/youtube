import { useEffect } from "react";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { useBoolean, useDispatchAction, useMessage } from "hooks";

import { isOnlineSelector } from "reduxware/reducers/onlineReducer";

import { InvalidCredentialsMessage, LanguageSwitch, LoginForm, LoginPrompt, Welcome } from "./components";
const Login = () => {
    const isOnline = useSelector(isOnlineSelector);
    const showMessage = useMessage();
    const { logOutUser } = useDispatchAction();
    const [isError, setError, clearError] = useBoolean(false);
    const { t } = useTranslation();

    useEffect(() => {
        logOutUser();
    }, [logOutUser]);

    !isOnline && showMessage.warning(t("errors.network.noConnectionDescription"));

    return (
        <section className="page--login">
            <div className="login">
                <InvalidCredentialsMessage isError={isError} />
                <Welcome />
                {isOnline && <LoginPrompt />}
                {isOnline && <LoginForm setError={setError} clearError={clearError} />}
                <LanguageSwitch />
            </div>
        </section>
    );
};

export default Login;
