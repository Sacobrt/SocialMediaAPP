export const RoutesNames = {
    HOME: "/",

    LOGIN: "/login",

    USER_OVERVIEW: "/users",
    USER_NEW: "/users/add",
    USER_CHANGE: "/users/:id",

    FOLLOWER_OVERVIEW: "/followers",
    FOLLOWER_NEW: "/followers/add",
    FOLLOWER_CHANGE: "/followers/:id",

    POST_OVERVIEW: "/posts",
    POST_NEW: "/posts/add",
    POST_CHANGE: "/posts/:id",
    POST_VIEW: "/:username/status/:id",

    COMMENT_OVERVIEW: "/comments",
    COMMENT_NEW: "/comments/add",
    COMMENT_CHANGE: "/comments/:id",

    STATISTICS: "/statistics",

    // Extra tasks
    CYCLIC_OVERVIEW: "/cyclic",
};

const isProduction = false;
export const APP_URL = isProduction ? "https://sacobrt-001-site1.ctempurl.com" : "https://localhost:7256";
export const BACKEND_URL = APP_URL + "/api/v1";
