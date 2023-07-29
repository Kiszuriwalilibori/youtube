import { useEffect } from "react";

import useDispatchAction from "hooks/useDispatchAction";

import { useBoolean } from "hooks";
import { InvalidCredentialsMessage, LogInForm, LogInPrompt, LoginPageWrapper, Welcome } from "./components";

const Login = () => {
    const { logOutUser } = useDispatchAction();
    const [isError, setError, clearError] = useBoolean(false);

    useEffect(() => {
        logOutUser();
    }, [logOutUser]);

    return (
        <LoginPageWrapper>
            <InvalidCredentialsMessage isError={isError} />
            <Welcome />
            <LogInPrompt />
            <LogInForm setError={setError} clearError={clearError} />
        </LoginPageWrapper>
    );
};

export default Login;
