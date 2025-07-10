import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";

export const PlayerLoader = () => {
    const { t } = useTranslation();
    return (
        <>
            <div className="player--loading" aria-live="polite">
                {t("video.loading", "Loading video...")}
                <CircularProgress />
            </div>
        </>
    );
};
export default PlayerLoader;
