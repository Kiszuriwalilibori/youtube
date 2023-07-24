import ReactDOM from "react-dom";
import Icons from "icons";

import { BasicButton } from "components";

interface Props {
    message: string;
    handleClear?: () => void;
}

const Message = (props: Props): JSX.Element => {
    const { message, handleClear } = props;
    return ReactDOM.createPortal(
        <article className="error">
            <div className="message">
                <p className="message__general-message">Ojejku, coś poszło nie tak &#128549;</p>
                <hr />
                <div className="message__error-message">{message ? message : "Nieznany błąd"}</div>
                {handleClear && (
                    <BasicButton className="message__hide-message button--alarm" onClick={handleClear}>
                        <Icons.Clear />
                    </BasicButton>
                )}
            </div>
        </article>,
        document.body
    );
};

export default Message;
