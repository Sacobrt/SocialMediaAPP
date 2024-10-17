import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ErrorProvider } from "./components/ErrorContext.jsx";
import { AuthProvider } from "./components/AuthContext.jsx";
import { UserProvider } from "./components/UserContext.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <ErrorProvider>
                <AuthProvider>
                    <UserProvider>
                        <App />
                    </UserProvider>
                </AuthProvider>
            </ErrorProvider>
        </BrowserRouter>
    </StrictMode>
);
