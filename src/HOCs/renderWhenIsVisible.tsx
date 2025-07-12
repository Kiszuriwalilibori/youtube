import * as React from "react";
interface Props {
    isVisible?: boolean;
}
function renderWhenIsVisible<T>(Component: React.ComponentType<T | Omit<T & Props, keyof Props>>) {
    return function (props: T & Props) {
        const { isVisible = true, ...newProps } = props;
        return isVisible ? <Component {...newProps} /> : null;
    };
}

export default renderWhenIsVisible;
