import { TFunction } from "i18next";

export type ErrorType = "general" | "network" | "video" | "page" | "auth" | "search" | "api";

export interface ErrorInfo {
    type: ErrorType;
    title: string;
    message: string;
    canRetry: boolean;
    severity: "warning" | "error" | "critical";
}

export class ErrorMessageService {
    private t: TFunction;

    constructor(t: TFunction) {
        this.t = t;
    }

    categorizeError(error: string | Error | unknown): ErrorInfo {
        const errorMessage = this.extractErrorMessage(error);
        const lowerError = errorMessage.toLowerCase();

        // Network errors
        if (lowerError.includes("network") || lowerError.includes("internet") || lowerError.includes("connection")) {
            return {
                type: "network",
                title: this.t("errors.network.noConnection"),
                message: this.t("errors.network.noConnectionDescription"),
                canRetry: true,
                severity: "error",
            };
        }

        // Video errors
        if (lowerError.includes("video") || lowerError.includes("unavailable") || lowerError.includes("youtube")) {
            return {
                type: "video",
                title: this.t("errors.video.unavailable"),
                message: this.t("errors.video.unavailableDescription"),
                canRetry: true,
                severity: "warning",
            };
        }

        // API errors
        if (lowerError.includes("api") || lowerError.includes("key") || lowerError.includes("quota")) {
            return {
                type: "api",
                title: this.t("errors.api.keyMissing"),
                message: this.t("errors.api.keyMissingDescription"),
                canRetry: false,
                severity: "critical",
            };
        }

        // Authentication errors
        if (lowerError.includes("auth") || lowerError.includes("login") || lowerError.includes("credential")) {
            return {
                type: "auth",
                title: this.t("errors.auth.invalidCredentials"),
                message: this.t("errors.auth.loginRequired"),
                canRetry: true,
                severity: "error",
            };
        }

        // Search errors
        if (lowerError.includes("search") || lowerError.includes("query")) {
            return {
                type: "search",
                title: this.t("errors.search.searchError"),
                message: this.t("errors.search.searchErrorDescription"),
                canRetry: true,
                severity: "warning",
            };
        }

        // Default to general error
        return {
            type: "general",
            title: this.t("errors.general.title"),
            message: errorMessage || this.t("errors.general.unknown"),
            canRetry: true,
            severity: "error",
        };
    }

    private extractErrorMessage(error: unknown): string {
        if (typeof error === "string") {
            return error;
        }

        if (error instanceof Error) {
            return error.message;
        }

        if (error && typeof error === "object" && "message" in error) {
            return String((error as { message: unknown }).message);
        }

        return this.t("errors.general.unknown");
    }

    getErrorMessage(type: ErrorType, specificKey?: string): string {
        const baseKey = `errors.${type}`;

        if (specificKey) {
            return this.t(`${baseKey}.${specificKey}`);
        }

        const descriptions: Record<ErrorType, string> = {
            general: "unknown",
            network: "noConnectionDescription",
            video: "unavailableDescription",
            page: "notFoundDescription",
            auth: "loginRequired",
            search: "searchErrorDescription",
            api: "keyMissingDescription",
        };

        return this.t(`${baseKey}.${descriptions[type]}`);
    }

    getRecoveryActions(type: ErrorType): string[] {
        const actionMap: Record<ErrorType, string[]> = {
            general: ["actions.retry", "actions.refresh"],
            network: ["actions.retry"],
            video: ["actions.refresh", "actions.goBack"],
            page: ["actions.goBack"],
            auth: ["actions.retry"],
            search: ["actions.retry"],
            api: ["actions.refresh"],
        };

        return actionMap[type] || ["actions.retry"];
    }
}

export const useErrorMessageService = (t: TFunction) => {
    return new ErrorMessageService(t);
};
