import { HiddenH1 } from "components";
import { useCheckApiKey, useDispatchAction, useMessage } from "hooks";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getErrorMessage, getErrorStatus } from "reduxware/reducers";

import { ContentWrapper, Loader, Player, Slider, TopBar } from "./components";

const YouTubePage = () => {
    const isError = useSelector(getErrorStatus);
    const errorMessage = useSelector(getErrorMessage);
    const { clearError } = useDispatchAction();
    const isAPIKeyAvailable = useCheckApiKey();
    const { error } = useMessage();

    useEffect(() => {
        if (!isAPIKeyAvailable) {
            error(errorMessage || "No API key found");
        }
    }, [isAPIKeyAvailable, errorMessage, error]);

    return (
        <div>
            <HiddenH1 text="Videos" />
            <TopBar />
            <ContentWrapper>
                <Slider />
                <Player />
            </ContentWrapper>
            <Loader />
            {isError && <Message message={errorMessage ? errorMessage : ""} handleClear={() => clearError()} />}
        </div>
    );
};

export default YouTubePage;
