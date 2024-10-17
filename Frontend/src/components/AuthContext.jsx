import { createContext, useEffect, useState } from "react";
import { logInService } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { RoutesNames } from "../constants";
import useError from "../hooks/useError";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authToken, setAuthToken] = useState("");
    const { prikaziError } = useError();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("Bearer");
        if (token) {
            setAuthToken(token);
            setIsLoggedIn(true);
        } else {
            navigate(RoutesNames.HOME);
        }
    }, []);

    async function login(data) {
        const response = await logInService(data);
        if (!response.error) {
            localStorage.setItem("Bearer", response.token);
            setAuthToken(response.token);
            setIsLoggedIn(true);
            navigate(RoutesNames.HOME);
        } else {
            prikaziError(response.message);
            localStorage.setItem("Bearer", "");
            setAuthToken("");
            setIsLoggedIn(false);
        }
    }

    function logout() {
        localStorage.setItem("Bearer", "");
        setAuthToken("");
        setIsLoggedIn(false);
        navigate(RoutesNames.HOME);
    }

    const updateAuthToken = (newToken) => {
        setAuthToken(newToken);
        localStorage.setItem("Bearer", newToken);
    };

    const value = {
        isLoggedIn,
        authToken,
        login,
        logout,
        updateAuthToken,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
