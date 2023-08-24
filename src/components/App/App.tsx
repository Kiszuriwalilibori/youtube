import loadable from "@loadable/component";

import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";

import Paths from "routing";
import ProtectedRoute from "components/ProtectedRoute";

import { LoginPage } from "pages/index";
import useHandleConnectionStatus from "hooks/useHandleConnectionStatus";

const YouTubePage = loadable(() => import("pages/YouTubePage"));
const NoPage = loadable(() => import("pages/NoPage"));

const App = () => {
    useHandleConnectionStatus();
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
                <Route path={Paths.nopage} element={<NoPage />} />
            </Routes>
        </main>
    );
};

export default App;
