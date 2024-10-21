import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
    const [errors, setErrors] = useState([]);
    const [showModalError, setShowModalError] = useState(false);

    function showError(message) {
        setErrors(message);
        setShowModalError(true);
    }

    function hideError() {
        setErrors([]);
        setShowModalError(false);
    }
    return <ErrorContext.Provider value={{ errors, showModalError, showError, hideError }}>{children}</ErrorContext.Provider>;
};

ErrorProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
