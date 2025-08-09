"use client";

import React, {
    createContext,
    FC,
    useContext,
    useEffect,
    useState,
} from "react";

interface ContextProps {
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
}

const AppContext = createContext<ContextProps | undefined>(undefined);

interface Props {
    children: React.ReactNode;
}

const AppProvider: FC<Props> = ({ children }) => {
    const [isLoading, setLoading] = useState<boolean>(true);

    return (
        <AppContext.Provider value={{ isLoading, setLoading }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): ContextProps => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within AppProvider");
    }

    return context;
};

export default AppProvider;
