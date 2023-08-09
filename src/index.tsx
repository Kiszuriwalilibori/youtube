import { createRoot } from "react-dom/client";

import breakWhenInternetExplorer from "functions/breakWhenInternetExplorer";

import { App, AppProvider, TanstackQueryProvider } from "./components";

import "styles/index.css";

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
