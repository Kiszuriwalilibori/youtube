import { useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import useDispatchAction from "hooks/useDispatchAction";
import paths from "routing";
import { ResetButton, SubmitButton } from "../components";

import { crits, messages, validators } from "../utils";

interface Props {
    setError: () => void;
    clearError: () => void;
}

export const LogInForm = (props: Props) => {
    const { setError, clearError } = props;
    const { logUser, clearVideos } = useDispatchAction();
    const refPassword = useRef<HTMLInputElement | null>(null);
    const history = useNavigate();

    const onFormSubmit = useCallback(() => {
        const password = refPassword.current!.value;
        if (password === process.env.REACT_APP_PASSWORD) {
            logUser();
            clearVideos();
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

    const clearAllErrors = useCallback(() => {
        clearErrors();
        clearError();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
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
                <p className="search__label">password</p>
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
            <SubmitButton />
            <ResetButton onClick={clearAllErrors} />
        </form>
    );
};

export default LogInForm;
