import { useCallback } from "react";
import { useSpeechRecognition } from "react-speech-kit";

export const useVoice = (handleResult: (text: string) => void) => {
    const { listen, listening, stop, supported } = useSpeechRecognition({
        onResult: (result: string) => {
            result && handleResult(result);
        },
    });

    const isMicrophoneDisabled = !supported;

    const handleClickMicrophone = useCallback(() => {
        listening ? stop() : listen();
    }, [listening, listen, stop]);

    return { handleClickMicrophone, isMicrophoneDisabled, listening };
};

export default useVoice;
