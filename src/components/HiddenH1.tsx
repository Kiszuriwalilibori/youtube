import React from "react";

interface Props {
    text: string;
}

const Header = (props: Props) => {
    const { text } = props;
    return (
        <header>
            <h1 className="sr-only">{text}</h1>
        </header>
    );
};

export default React.memo(Header);
