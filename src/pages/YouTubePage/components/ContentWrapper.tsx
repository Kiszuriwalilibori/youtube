import * as React from "react";

interface Props {
    children: React.ReactNode;
}
export const ContentWrapper = (props: Readonly<Props>) => {
    return <div className="main">{props.children}</div>;
};

export default ContentWrapper;
