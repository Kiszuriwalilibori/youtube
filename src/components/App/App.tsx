import loadable from "@loadable/component";

import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";

import Paths from "routing";
import ProtectedRoute from "components/ProtectedRoute";

import { LoginPage } from "pages/index";
import useHandleConnectionStatus from "hooks/useHandleConnectionStatus";
import useSetInitialConnectionStatus from "hooks/useSetInitialConnectionStatus";

const YouTubePage = loadable(() => import("pages/YouTubePage"));
const NoPage = loadable(() => import("pages/NoPage"));

const App = () => {
    useHandleConnectionStatus();
    useSetInitialConnectionStatus();
    return (
        <main>
            <Routes>
                <Route path={Paths.landing} element={<LoginPage />} />
                <Route
                    path={Paths.youtube}
                    element={
                        <ProtectedRoute>
                            <YouTubePage />
                        </ProtectedRoute>
                    }
                />
                <Route path={Paths.nopage} element={<NoPage message="Page not found" />} />
            </Routes>
        </main>
    );
};

export default App;
