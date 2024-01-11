import { memo } from "react";
import { useTranslation } from "react-i18next";

export const LogInPrompt = () => {
    const { t } = useTranslation();

    return <h2 className="login__prompt">{t("login.login_prompt")}</h2>;
};
export default memo(LogInPrompt);
