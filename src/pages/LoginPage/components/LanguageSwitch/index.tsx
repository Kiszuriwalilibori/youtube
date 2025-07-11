import moment from "moment";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import "moment/locale/pl";
import Stack from "@mui/material/Stack";

import Switch from "./switch";

const stackSx = { margin: "0 auto", width: "150px", alignItems: "center" };

export default function LanguageSwitch() {
    const [language, setLanguage] = useState("pl");
    const { i18n } = useTranslation();

    const changeLanguage = useCallback(
        () => {
            if (language === "en") {
                setLanguage("pl");
                moment.locale("pl");
                i18n.changeLanguage("pl");
            } else {
                setLanguage("en");
                moment.locale("en");
                i18n.changeLanguage("en");
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [language]
    );

    return (
        <Stack onClick={e => e.stopPropagation()} direction="row" spacing={2} sx={stackSx}>
            <img /*className="country-image switch-image"*/ alt="country flag" src="https://flagcdn.com/28x21/pl.png" />
            <Switch onChangeHandler={changeLanguage} optionClassName="option option--desktop-visible" />
            <img /*className="country-image switch-image"*/ alt="country flag" src="https://flagcdn.com/28x21/gb.png" />
        </Stack>
    );
}
