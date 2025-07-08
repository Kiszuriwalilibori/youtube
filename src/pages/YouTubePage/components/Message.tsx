import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";
import Icons from "icons";
import { BasicButton } from "components";
import { useErrorMessageService } from "functions/errorMessageService";

interface Props {
    message: string;
    handleClear?: () => void;
    errorType?: ErrorType;
    onRetry?: () => void;
    rawError?: boolean; // Flag to show raw message without processing
}

const Message = (props: Props): JSX.Element => {
    const { message, handleClear, errorType, onRetry, rawError = false } = props;
    const { t } = useTranslation();
    const errorService = useErrorMessageService(t);

    // Process error or use raw message
    const errorInfo = rawError ? null : errorService.categorizeError(message);
    const displayTitle = errorInfo?.title || t("errors.general.title");
    const displayMessage = errorInfo?.message || message || t("errors.general.unknown");
    const canRetry = errorInfo?.canRetry ?? true;
    const recoveryActions = errorInfo ? errorService.getRecoveryActions(errorInfo.type) : [];

    return ReactDOM.createPortal(
        <article className={`error error--${errorInfo?.severity || "error"}`}>
            <div className="message">
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
                        <BasicButton className="message__retry-button button--primary" onClick={onRetry}>
                            <Icons.Refresh />
                            {t("actions.retry")}
                        </BasicButton>
                    )}

                    {recoveryActions.includes("actions.refresh") && (
                        <BasicButton
                            className="message__refresh-button button--secondary"
                            onClick={() => window.location.reload()}
                        >
                            <Icons.Refresh />
                            {t("actions.refresh")}
                        </BasicButton>
                    )}

                    {recoveryActions.includes("actions.goBack") && (
                        <BasicButton
                            className="message__back-button button--secondary"
                            onClick={() => window.history.back()}
                        >
                            <Icons.ArrowLeft />
                            {t("actions.goBack")}
                        </BasicButton>
                    )}

                    {handleClear && (
                        <BasicButton
                            className="message__dismiss-button button--tertiary"
                            onClick={handleClear}
                            aria-label={t("actions.dismiss")}
                        >
                            <Icons.Clear />
                        </BasicButton>
                    )}
                </div>
            </div>
        </article>,
        document.body
    );
};

export default Message;
