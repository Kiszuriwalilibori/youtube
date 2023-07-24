import BasicButton from "components/BasicButton";

interface Props {
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export const ResetButton = (props: Props) => {
    const { onClick } = props;
    return (
        <BasicButton className="button--login" type="reset" aria-label="Reset form" onClick={onClick}>
            Reset
        </BasicButton>
    );
};

export default ResetButton;
