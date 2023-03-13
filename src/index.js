import { createRoot } from "react-dom/client";
import AppProvider from "components/AppProvider/AppProvider";
import App from "components/App/App";
import "styles/index.css";
import breakWhenInternetExplorer from "functions/breakWhenInternetExplorer";

breakWhenInternetExplorer();

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <AppProvider>
        <App />
    </AppProvider>
);
