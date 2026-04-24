// LoadingContext.jsx
import { createContext, useContext, useState } from "react";
import LoadingModal from "./Loading";
const LoadingContext = createContext();
export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState({ show: false, message: "Loading..." });
    const showLoading = (message = "Loading...") =>
        setLoading({ show: true, message, type: "loading" });
    const hideLoading = () =>
        setLoading(prev =>
            prev.type === "loading"
                ? { show: false, message: "Loading...", type: "loading" }
                : prev
        );
    const notify = (message, duration = 500) => {
        setLoading({ show: true, message, type: "notify" });
        setTimeout(() => {
            setLoading(prev =>
                prev.type === "notify"
                    ? { show: false, message: "Loading...", type: "loading" }
                    : prev
            );
        }, duration);
    };
    return (
        <LoadingContext.Provider value={{ loading, showLoading, hideLoading, notify }}>
            {children}
            <LoadingModal show={loading.show} message={loading.message} />
        </LoadingContext.Provider>
    );
};
export const useLoading = () => useContext(LoadingContext);