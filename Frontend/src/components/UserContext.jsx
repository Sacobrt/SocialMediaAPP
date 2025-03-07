import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { parseJwt } from "../hooks/parseJwt";
import { APP_URL } from "../constants";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { authToken } = useContext(AuthContext);
    const [userImage, setUserImage] = useState(null);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if (authToken) {
            const token = parseJwt(authToken);
            setUserData(token);

            if (token.Image) {
                setUserImage(APP_URL + token.Image + `?${Date.now()}`);
            } else {
                setUserImage(null);
            }
        }
    }, [authToken]);

    return <UserContext.Provider value={{ userImage, setUserImage, userData, setUserData }}>{children}</UserContext.Provider>;
};
