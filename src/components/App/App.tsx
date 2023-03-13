import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import loadable from "@loadable/component";
import Paths from "routing";
import ProtectedRoute from "components/ProtectedRoute";
import { LoginPage } from "pages/index";

const YouTubePage = loadable(() => import("pages/YouTubePage"));
const NoPage = loadable(() => import("pages/NoPage"));

const App = () => {
    return (
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
    );
};

export default App;
