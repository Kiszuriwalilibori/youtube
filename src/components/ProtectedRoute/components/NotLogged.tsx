import { NOT_LOGGED_DELAY } from "config";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Paths from "routing";

const NotLogged = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    useEffect(() => {
        setTimeout(() => {
            navigate(Paths.landing);
        }, NOT_LOGGED_DELAY);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <article className="not-logged">{t("navigation.notLogged")} &#128541; </article>;
};

export default NotLogged;
