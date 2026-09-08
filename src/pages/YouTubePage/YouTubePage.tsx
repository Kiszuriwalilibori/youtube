import { HiddenH1 } from "components";
import { useCheckApiKey, useDispatchAction } from "hooks";
import { useSelector } from "react-redux";
import { getErrorMessage, getErrorStatus } from "reduxware/reducers";

import { ContentWrapper, Loader, Message, Player, Slider, TopBar } from "./components";

const YouTubePage = () => {
    const isError = useSelector(getErrorStatus);
    const errorMessage = useSelector(getErrorMessage);
    const { clearError } = useDispatchAction();
    const isAPIKeyAvailable = useCheckApiKey();

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
            {!isAPIKeyAvailable && <Message message={errorMessage ? errorMessage : ""} />}
        </div>
    );
};

export default YouTubePage;
