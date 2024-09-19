import NavBarEdunova from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import { RoutesNames } from "./constants";
import Home from "./pages/Home";
import UsersOverview from "./pages/users/UsersOverview";
import CyclicView from "./pages/cyclic/CyclicView";
import UsersAdd from "./pages/users/UsersAdd";
import UsersChange from "./pages/users/UsersChange";

function App() {
    return (
        <>
            <NavBarEdunova />
            <Routes>
                <Route path={RoutesNames.HOME} element={<Home />} />
                <Route path={RoutesNames.USER_OVERVIEW} element={<UsersOverview />} />
                <Route path={RoutesNames.USER_NEW} element={<UsersAdd />} />
                <Route path={RoutesNames.USER_CHANGE} element={<UsersChange />}></Route>

                {/* Extra tasks */}
                <Route path={RoutesNames.CYCLIC_OVERVIEW} element={<CyclicView />} />
            </Routes>
        </>
    );
}

export default App;
