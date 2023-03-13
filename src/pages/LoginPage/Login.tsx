import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterOptions, useForm } from "react-hook-form";

import paths from "routing";
import useDispatchAction from "hooks/useDispatchAction";

import { useBoolean } from "hooks";
import { BasicButton } from "components";

type Messages = { [key in keyof RegisterOptions]?: string };

const messages: Messages = {
    minLength: "Minimal length not reached, should be at least ",
    maxLength: "Max length exceeded ",
    required: "This field is required ",
    pattern: "Not a valid e-mail",
};

type Fields = "firstName" | "surName" | "password" | "email" | "dob" | "address" | "city" | "state" | "zip";

type Validator = { [key in keyof RegisterOptions]?: any };
type Validators = {
    [key in Fields]?: Validator;
};
const crits = {
    password: {
        required: true,
    },
    email: {
        required: true,
        pattern:
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
    },
};
const validators: Validators = {
    password: { ...crits.password },
    email: { ...crits.email },
};

const Login = () => {
    const { logUser, logOutUser, clearMovies } = useDispatchAction();
    const refPassword = useRef<HTMLInputElement | null>(null);
    const [isError, setError, clearError] = useBoolean(false);
    const history = useNavigate();

    const onFormSubmit = useCallback(() => {
        const password = refPassword.current!.value;
        if (password === process.env.REACT_APP_PASSWORD) {
            logUser();
            clearMovies();
            history(paths.youtube);
        } else {
            setError();
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
    } = useForm();

    const { ref, ...rest } = register("password", validators.password);

    const clearAll = useCallback(() => {
        clearErrors();
        clearError();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        logOutUser();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className="login-page">
            <div className="login">
                <p className={isError ? "invalid-credentials visible" : "invalid-credentials"}>
                    - - - Invalid credentials - - -
                </p>
                <h1>Witamy w YouTube</h1>
                <h2>Please log in</h2>

                <form className="form" onSubmit={handleSubmit(onFormSubmit)}>
                    <label className="search">
                        <p className="search__label">email</p>
                        <input
                            className="search__input"
                            type="text"
                            tabIndex={0}
                            placeholder="Type your e-mail here..."
                            {...register("email", validators.email)}
                        />
                        {errors.email && errors.email.type === "required" && (
                            <span className="search__hint">
                                {messages.required}
                                {crits.email.required}
                            </span>
                        )}
                        {errors.email && errors.email.type === "pattern" && (
                            <span className="search__hint">{messages.pattern}</span>
                        )}
                    </label>

                    <label className="search">
                        <p className="search__label">Password</p>
                        <input
                            className="search__input"
                            tabIndex={0}
                            ref={e => {
                                ref(e);
                                refPassword.current = e;
                            }}
                            placeholder="Type your password here..."
                            type="password"
                            {...rest}
                        />
                        {errors.password && errors.password.type === "required" && (
                            <span className="search__hint">
                                {messages.required}
                                {crits.password.required}
                            </span>
                        )}
                    </label>
                    <BasicButton className="button--login" type="submit">
                        Submit
                    </BasicButton>
                    <BasicButton className="button--login" type="reset" onClick={clearAll}>
                        Reset
                    </BasicButton>
                </form>
            </div>
        </section>
    );
};
//export default withRouter(Login);
export default Login;
