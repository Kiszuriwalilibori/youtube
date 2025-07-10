import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";

import Icons from "icons";

import { useErrorMessageService } from "hooks";
import { IconButton } from "@mui/material";

interface Props {
    message: string;
    handleClear?: () => void;

    onRetry?: () => void;
    rawError?: boolean;
}

const Message = (props: Props): JSX.Element => {
    const { message, handleClear, onRetry, rawError = false } = props;
    const { t } = useTranslation();
    const errorService = useErrorMessageService(t);

    const errorInfo = rawError ? null : errorService.categorizeError(message);
    const displayTitle = errorInfo?.title || t("errors.general.title");
    const displayMessage = errorInfo?.message || message || t("errors.general.unknown");
    const canRetry = errorInfo?.canRetry ?? true;
    const recoveryActions = errorInfo ? errorService.getRecoveryActions(errorInfo.type) : [];

    return ReactDOM.createPortal(
        <article className={`error error--${errorInfo?.severity || "error"}`}>
            <div className="message" role="alert" aria-live="assertive">
                <p className="message__title">{displayTitle}</p>
                <hr />
                <div className="message__content">{displayMessage}</div>

                {errorInfo?.severity === "critical" && (
                    <div className="message__contact">
                        <small>{t("errors.general.contact")}</small>
                    </div>
                )}
                <div className="message__actions">
                    {canRetry && onRetry && (
                        <Button variant="contained" color="warning" startIcon={<Icons.Refresh />} onClick={onRetry}>
                            {t("actions.retry")}
                        </Button>
                    )}

                    {recoveryActions.includes("actions.refresh") && (
                        <Button
                            variant="contained"
                            color="warning"
                            onClick={() => window.location.reload()}
                            startIcon={<Icons.Refresh />}
                        >
                            {t("actions.refresh")}
                        </Button>
                    )}

                    {recoveryActions.includes("actions.goBack") && (
                        <Button variant="contained" color="warning" onClick={() => window.history.back()}>
                            {t("actions.goBack")}
                        </Button>
                    )}

                    {handleClear && (
                        <IconButton onClick={handleClear} aria-label={t("actions.dismiss")}>
                            <Icons.Clear />
                        </IconButton>
                    )}
                </div>
            </div>
        </article>,
        document.body
    );
};

export default Message;
