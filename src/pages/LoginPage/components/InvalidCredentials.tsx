import Fade from "@mui/material/Fade";

interface Props {
    isError: boolean;
}
const text = "- - - Invalid credentials - - -";
export const InvalidCredentialsMessage = (props: Props) => {
    const { isError } = props;
    return (
        <Fade in={isError}>
            <p className="invalid-credentials visible">{text}</p>
        </Fade>
    );
};
export default InvalidCredentialsMessage;
