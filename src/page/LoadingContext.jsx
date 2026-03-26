// LoadingContext.jsx
import { createContext, useContext, useState } from "react";
import LoadingModal from "./Loading";
const LoadingContext = createContext();
export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState({ show: false, message: "Loading..." });
    const showLoading = (message = "Loading...") => setLoading({ show: true, message });
    const hideLoading = () => setLoading({ show: false, message: "Loading..." });//關閉的部分有問題吧?
    return (
        <LoadingContext.Provider value={{ loading, showLoading, hideLoading }}>
            {children}
            <LoadingModal show={loading.show} message={loading.message} />
        </LoadingContext.Provider>
    );
};
export const useLoading = () => useContext(LoadingContext);