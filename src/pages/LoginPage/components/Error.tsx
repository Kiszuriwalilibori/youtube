interface Props {
    isError: boolean;
}
const text = "- - - Invalid credentials - - -";
export const Error = (props: Props) => {
    const { isError } = props;
    return <p className={isError ? "invalid-credentials visible" : "invalid-credentials"}>{text}</p>;
};
export default Error;
