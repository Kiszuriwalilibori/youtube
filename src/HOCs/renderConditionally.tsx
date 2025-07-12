interface Props {
    renderCondition?: boolean;
}

function renderConditionally<T>(Component: React.ComponentType<T | Omit<T & Props, keyof Props>>) {
    return function (props: T & Props) {
        let { renderCondition, ...newProps } = props;
        return renderCondition ? <Component {...newProps} /> : null;
    };
}

export default renderConditionally;
