import { Slider, Player, LoadingIndicator, Message } from "components";
import { useDispatchAction, useCheckApiKey } from "hooks";
import TopBar from "./components/TopBar";

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

    if (isLoading) return <LoadingIndicator />;
    if (!isAPIKeyAvailable) return <Message message={errorMessage ? errorMessage : ""} />;
    if (isError) return <Message message={errorMessage ? errorMessage : ""} handleClear={() => clearError()} />;

    return (
        <div>
            <TopBar />
            <main className="main">
                <Slider />
                <Player />
            </main>
        </div>
    );
};

export default YouTubePage;
