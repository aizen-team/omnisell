"use client";

import { useEffect, useState } from "react";
import { LayoutProps } from "@/types/app";
import { Header, Sidebar } from "@/layouts/DashboardLayout/components";
import { DotRotateLoader, DotWaveLoader } from "@/components/elements/loaders";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setAppLoading } from "@/store/slices/appSlice";
import { selectAppLoading } from "@/store/slices/appSlice/selector";

interface Props extends LayoutProps {}

export default function DashboardLayout({ children }: Props) {
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const [isHydrated, setIsHydrated] = useState(false);
    const appLoading = useAppSelector(selectAppLoading);

    useEffect(() => {
        setIsHydrated(true);
        dispatch(setAppLoading(true));
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            dispatch(setAppLoading(false));
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [pathname]);

    if (!isHydrated) return null;

    return (
        <div id="dashboard-layout" className="h-screen overflow-hidden">
            <div className="dashboard-container h-full flex">
                <Sidebar />
                <div className="dashboard-main flex-1 flex flex-col">
                    <Header />
                    <main className="dashboard-content relative flex-1 p-4 md:p-7 overflow-auto">
                        {appLoading ? <DotRotateLoader centered /> : children}
                    </main>
                </div>
            </div>
        </div>
    );
}
