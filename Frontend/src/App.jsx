import NavBarEdunova from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import { RoutesNames } from "./constants";
import Home from "./pages/Home";
import Footer from "./pages/Footer";

import UsersOverview from "./pages/users/UsersOverview";
import UsersAdd from "./pages/users/UsersAdd";
import UsersChange from "./pages/users/UsersChange";

import FollowersAdd from "./pages/followers/FollowersAdd";
import FollowersOverview from "./pages/followers/FollowersOverview";
import FollowersChange from "./pages/followers/FollowersChange";

import CommentsOverview from "./pages/comments/CommentsOverview";
import CommentsAdd from "./pages/comments/CommentsAdd";
import CommentsChange from "./pages/comments/CommentsChange";

import PostsOverview from "./pages/posts/PostsOverview";
import PostsAdd from "./pages/posts/PostsAdd";
import PostsChange from "./pages/posts/PostsChange";

import CyclicView from "./pages/cyclic/CyclicView";

function App() {
    return (
        <>
            <NavBarEdunova />
            <div className="flex flex-col min-h-screen">
                <main className="flex-grow">
                    <Routes>
                        <Route path={RoutesNames.HOME} element={<Home />} />
                        <Route path={RoutesNames.USER_OVERVIEW} element={<UsersOverview />} />
                        <Route path={RoutesNames.USER_NEW} element={<UsersAdd />} />
                        <Route path={RoutesNames.USER_CHANGE} element={<UsersChange />}></Route>

                        <Route path={RoutesNames.FOLLOWER_OVERVIEW} element={<FollowersOverview />} />
                        <Route path={RoutesNames.FOLLOWER_NEW} element={<FollowersAdd />} />
                        <Route path={RoutesNames.FOLLOWER_CHANGE} element={<FollowersChange />} />

                        <Route path={RoutesNames.COMMENT_OVERVIEW} element={<CommentsOverview />} />
                        <Route path={RoutesNames.COMMENT_NEW} element={<CommentsAdd />} />
                        <Route path={RoutesNames.COMMENT_CHANGE} element={<CommentsChange />} />

                        <Route path={RoutesNames.POST_OVERVIEW} element={<PostsOverview />} />
                        <Route path={RoutesNames.POST_NEW} element={<PostsAdd />} />
                        <Route path={RoutesNames.POST_CHANGE} element={<PostsChange />} />

                        {/* Extra tasks */}
                        <Route path={RoutesNames.CYCLIC_OVERVIEW} element={<CyclicView />} />
                    </Routes>
                </main>
            </div>
            <Footer />
        </>
    );
}

export default App;
