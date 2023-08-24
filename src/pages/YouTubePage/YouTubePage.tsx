import { useDispatchAction, useCheckApiKey } from "hooks";
import { TopBar, Message, Loader, Player, Slider, ContentWrapper } from "./components";

interface Props {
    isLogged: Boolean;
    isError: Boolean;
    errorMessage: string;
    isLoading: Boolean;
}
const YouTubePage = (props: Props) => {
    const { isError, isLoading, errorMessage } = props;
    const { clearError } = useDispatchAction();
    const isAPIKeyAvailable = useCheckApiKey();

    return (
        <div>
            <h1 className="invisible"> You tube</h1>
            <TopBar />
            <ContentWrapper>
                <Slider />
                <Player />
            </ContentWrapper>
            {isLoading && <Loader />}
            {isError && <Message message={errorMessage ? errorMessage : ""} handleClear={() => clearError()} />}
            {!isAPIKeyAvailable && <Message message={errorMessage ? errorMessage : ""} />}
        </div>
    );
};

export default YouTubePage;
