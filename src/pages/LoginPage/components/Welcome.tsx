import { memo } from "react";
import { useTranslation } from "react-i18next";

export const Welcome = () => {
    const { t } = useTranslation();
    return <h1 className="login__welcome">{t("login.welcome")}</h1>;
};
export default memo(Welcome);
