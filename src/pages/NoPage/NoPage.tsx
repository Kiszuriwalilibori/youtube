import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";
import Icons from "icons";
import { BasicButton } from "components";

interface Props {
    message: string;
    handleClear?: () => void;
    errorType?: "general" | "network" | "video" | "page" | "auth" | "search" | "api";
    showRetry?: boolean;
    onRetry?: () => void;
}

const Message = (props: Props): JSX.Element => {
    const { message, handleClear, errorType = "general", showRetry = false, onRetry } = props;
    const { t } = useTranslation();

    // Try to match the message to a translation key, otherwise use the raw message
    const getTranslatedMessage = (msg: string) => {
        // Check if message matches known patterns
        if (msg.includes("video") && msg.includes("unavailable")) {
            return t("errors.video.unavailableDescription");
        }
        if (msg.includes("internet") || msg.includes("connection")) {
            return t("errors.network.noConnectionDescription");
        }
        if (msg.includes("API") || msg.includes("key")) {
            return t("errors.api.keyMissingDescription");
        }

        // Return the message as-is if no translation found, or "unknown error" if empty
        return msg || t("errors.general.unknown");
    };

    return ReactDOM.createPortal(
        <article className="error">
            <div className="message">
                <p className="message__general-message">{t("errors.general.title")}</p>
                <hr />
                <div className="message__error-message">{getTranslatedMessage(message)}</div>

                <div className="message__actions">
                    {showRetry && onRetry && (
                        <BasicButton className="message__retry-button button--primary" onClick={onRetry}>
                            {t("actions.retry")}
                        </BasicButton>
                    )}

                    {handleClear && (
                        <BasicButton className="message__hide-message button--alarm" onClick={handleClear}>
                            <Icons.Clear />
                            <span className="sr-only">{t("actions.dismiss")}</span>
                        </BasicButton>
                    )}
                </div>
            </div>
        </article>,
        document.body
    );
};

export default Message;
