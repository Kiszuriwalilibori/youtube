import { useCallback, useRef } from "react";

interface UseSanitizedInputOptions {
    forbiddenChars?: string[];
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

interface UseSanitizedInputReturn {
    inputRef: React.RefObject<HTMLInputElement>;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    handleInputChange: (e: React.FormEvent<HTMLInputElement>) => void;
    handlePaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
    sanitizeInput: (value: string) => string;
}

const useSanitizedInput = (options: UseSanitizedInputOptions = {}): UseSanitizedInputReturn => {
    const { forbiddenChars = ["<", ">", '"', "'", "&"], onKeyDown } = options;
    const inputRef = useRef<HTMLInputElement>(null);

    const sanitizeInput = useCallback(
        (value: string): string => {
            const regex = new RegExp(`[${forbiddenChars.map(char => `\\${char}`).join("")}]`, "g");
            return value.replace(regex, "");
        },
        [forbiddenChars]
    );

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            // Prevent typing forbidden characters
            if (forbiddenChars.includes(e.key)) {
                e.preventDefault();
                return;
            }

            // Call the original keydown handler if provided
            if (onKeyDown) {
                onKeyDown(e);
            }
        },
        [forbiddenChars, onKeyDown]
    );

    const handleInputChange = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            const target = e.target as HTMLInputElement;
            // Sanitize pasted content and typed content
            const sanitized = sanitizeInput(target.value);
            if (target.value !== sanitized) {
                target.value = sanitized;
                // Trigger input event for React to detect the change
                target.dispatchEvent(new Event("input", { bubbles: true }));
            }
        },
        [sanitizeInput]
    );

    const handlePaste = useCallback(
        (e: React.ClipboardEvent<HTMLInputElement>) => {
            // Handle paste events
            e.preventDefault();
            const pastedText = e.clipboardData.getData("text");
            const sanitized = sanitizeInput(pastedText);

            if (inputRef.current) {
                const start = inputRef.current.selectionStart || 0;
                const end = inputRef.current.selectionEnd || 0;
                const currentValue = inputRef.current.value;

                const newValue = currentValue.slice(0, start) + sanitized + currentValue.slice(end);
                inputRef.current.value = newValue;

                // Set cursor position after pasted content
                const newCursorPos = start + sanitized.length;
                inputRef.current.setSelectionRange(newCursorPos, newCursorPos);

                // Trigger input event
                inputRef.current.dispatchEvent(new Event("input", { bubbles: true }));
            }
        },
        [sanitizeInput]
    );

    return {
        inputRef,
        handleKeyDown,
        handleInputChange,
        handlePaste,
        sanitizeInput,
    };
};

export default useSanitizedInput;
