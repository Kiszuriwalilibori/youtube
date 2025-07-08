import { useDispatchAction, useCheckApiKey } from "hooks";
import { TopBar, Message, Loader, Player, Slider, ContentWrapper } from "./components";
import { HiddenH1 } from "components";
import { RootStateType } from "types";
import { useSelector } from "react-redux";

const YouTubePage = () => {
    const isError = useSelector((state: RootStateType) => state.fetch.isError);
    const errorMessage = useSelector((state: RootStateType) => state.fetch.errorMessage);

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
