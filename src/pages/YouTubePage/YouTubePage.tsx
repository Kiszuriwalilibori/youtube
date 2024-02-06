import { useDispatchAction, useCheckApiKey } from "hooks";
import { TopBar, Message, Loader, Player, Slider, ContentWrapper } from "./components";
import { HiddenH1 } from "components";
import { RootStateType } from "types";

interface Props {
    isLogged: RootStateType["log"]["isLogged"];
    isError: RootStateType["fetch"]["isError"];
    errorMessage: RootStateType["fetch"]["errorMessage"];
    isLoading: RootStateType["fetch"]["isLoading"];
}
const YouTubePage = (props: Props) => {
    const { isError, errorMessage } = props;
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
