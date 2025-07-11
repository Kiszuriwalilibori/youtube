import Fade from "@mui/material/Fade";
import { memo } from "react";
import { useTranslation } from "react-i18next";

interface Props {
    isError: boolean;
}

export const InvalidCredentialsMessage = (props: Props) => {
    const { isError } = props;
    const { t } = useTranslation();
    return (
        <Fade in={isError}>
            <p className="login__invalid-credentials">{t("warnings.credentials")}</p>
        </Fade>
    );
};
export default memo(InvalidCredentialsMessage);
