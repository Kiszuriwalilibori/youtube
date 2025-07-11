import { createRoot } from "react-dom/client";
import { App, AppProvider, TanstackQueryProvider } from "./components";
import "styles/index.css";

const breakWhenInternetExplorer = (): void => {
    const FALLBACK_URL = "https://kiszuriwalilibori.github.io/IE/";
    const ua = window.navigator.userAgent;
    const isIE = /MSIE|Trident/.test(ua);

    if (isIE) {
        window.location.href = FALLBACK_URL;
    }
};

breakWhenInternetExplorer();

const container = document.getElementById("root");
const root = createRoot(container as Element);
root.render(
    <AppProvider>
        <TanstackQueryProvider>
            <App />
        </TanstackQueryProvider>
    </AppProvider>
);
