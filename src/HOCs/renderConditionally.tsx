interface renderCondition {
    renderCondition?: boolean;
}

function renderConditionally<T>(Component: React.ComponentType<T | Omit<T & renderCondition, keyof renderCondition>>) {
    return function (props: T & renderCondition) {
        let { renderCondition, ...newProps } = props;
        return renderCondition ? <Component {...newProps} /> : null;
    };
}

export default renderConditionally;
