// Custom hook using native Web Speech API
import { useState, useCallback, useEffect, useRef } from "react";

export const useVoiceRecognition = (handleResult: (text: string) => void) => {
    const [listening, setListening] = useState(false);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const supported = "SpeechRecognition" in window || "webkitSpeechRecognition" in window;

    useEffect(() => {
        if (!supported) return;

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onstart = () => setListening(true);
        recognition.onend = () => setListening(false);
        recognition.onresult = event => {
            const transcript = event.results[0][0].transcript;
            handleResult(transcript);
        };

        recognitionRef.current = recognition;

        return () => {
            recognition.stop();
        };
    }, [handleResult, supported]);

    const listen = useCallback(() => {
        if (recognitionRef.current && !listening) {
            recognitionRef.current.start();
        }
    }, [listening]);

    const stop = useCallback(() => {
        if (recognitionRef.current && listening) {
            recognitionRef.current.stop();
        }
    }, [listening]);

    const handleClickMicrophone = useCallback(() => {
        listening ? stop() : listen();
    }, [listening, listen, stop]);

    return { handleClickMicrophone, isMicrophoneDisabled: !supported, listening };
};

export default useVoiceRecognition;
