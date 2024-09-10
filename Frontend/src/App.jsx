import NavBarEdunova from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import { RoutesNames } from "./constants";
import Home from "./pages/Home";
import UsersOverview from "./pages/users/UsersOverview";

function App() {
    return (
        <>
            <NavBarEdunova />
            <Routes>
                <Route path={RoutesNames.HOME} element={<Home />} />
                <Route path={RoutesNames.USER_OVERVIEW} element={<UsersOverview />} />
            </Routes>
        </>
    );
}

export default App;
