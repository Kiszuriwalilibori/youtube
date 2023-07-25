import * as React from "react";

interface Props {
    children: React.ReactNode;
}
export const LoginPageWrapper = (props: Props) => {
    return (
        <section className="login-page">
            <div className="login">{props.children}</div>
        </section>
    );
};

export default LoginPageWrapper;
