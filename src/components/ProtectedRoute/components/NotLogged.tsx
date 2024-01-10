import { NOT_LOGGED_DELAY } from "config";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Paths from "routing";

const NotLogged = () => {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate(Paths.landing);
        }, NOT_LOGGED_DELAY);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <article className="not-logged">You are not logged! &#128541; </article>;
};

export default NotLogged;
