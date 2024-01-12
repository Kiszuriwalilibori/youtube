import { useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import Icons from "icons";
import paths from "routing";

import { useDispatchAction, useManageEye } from "hooks";
import { BasicButton } from "components";
import { validators } from "./utils";

interface Props {
    setError: () => void;
    clearError: () => void;
}

export const LogInForm = (props: Props) => {
    const refPassword = useRef<HTMLInputElement | null>(null);
    const { toggleInputType } = useManageEye(refPassword);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { setError, clearError } = props;
    const { logUser, clearVideos } = useDispatchAction();

    const onFormSubmit = useCallback(() => {
        const password = refPassword.current!.value;
        if (password === process.env.REACT_APP_PASSWORD) {
            logUser();
            clearVideos();
            navigate(paths.youtube);
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

    const handleClickReset = useCallback(() => {
        clearErrors();
        clearError();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <form className="login__form" onSubmit={handleSubmit(onFormSubmit)}>
            <label className="field">
                <p className="field__label">{t("login.email")}</p>
                <input
                    className="field__input"
                    autoComplete="email"
                    autoCorrect="off"
                    autoFocus
                    type="text"
                    tabIndex={0}
                    placeholder={t("login.email_prompt")}
                    {...register("email", validators.email)}
                />
                {errors.email && errors.email.type === "required" && (
                    <span className="field__hint">{t("warnings.required")}</span>
                )}
                {errors.email && errors.email.type === "pattern" && (
                    <span className="field__hint">{t("warnings.pattern")}</span>
                )}
            </label>

            <label className="field">
                <p className="field__label">{t("login.password")}</p>
                <input
                    className="field__input"
                    autoComplete="current-password"
                    tabIndex={0}
                    ref={e => {
                        ref(e);
                        refPassword.current = e;
                    }}
                    placeholder={t("login.password_prompt")}
                    type="password"
                    {...rest}
                />
                <Icons.Eye className="password-toggle-icon" onClick={toggleInputType} />
                {errors.password && errors.password.type === "required" && (
                    <span className="field__hint">{t("warnings.required")}</span>
                )}
            </label>

            <BasicButton className="button--login" type="submit" aria-label="submit" children={t("buttons.submit")} />

            <BasicButton
                className="button--login"
                type="reset"
                aria-label="reset"
                onClick={handleClickReset}
                children={t("buttons.reset")}
            />
        </form>
    );
};

export default LogInForm;
