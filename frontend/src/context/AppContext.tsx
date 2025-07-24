"use client"

import React, { createContext, FC, useContext } from "react";

interface ContextProps {
}

const AppContext = createContext<ContextProps | undefined>(undefined);

interface Props {
    children: React.ReactNode;
}

const AppProvider: FC<Props> = ({ children }) => {
    return (
        <AppContext.Provider
            value={{}}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): ContextProps => {
    const context = useContext(AppContext)
    if(!context) {
        throw new Error("useAppContext must be used within AppProvider");
    }

    return context;
}

export default AppProvider;
