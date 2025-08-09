"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import AppProvider from "@/context/AppContext";
import { LayoutProps } from "@/types/app";

interface Props extends LayoutProps {}

export default function AppProviders({ children }: Props) {
    return (
        <AppProvider>
            <Provider store={store}>{children}</Provider>
        </AppProvider>
    );
}
