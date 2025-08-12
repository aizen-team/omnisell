"use client";

import { usePathname } from "next/navigation";
import SidebarItem from "./SidebarItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faShoppingCart,
    faBox,
    faComments,
    faWarehouse,
    faRobot,
    faChartLine,
    faPlug,
    faCog,
    faStore,
} from "@fortawesome/free-solid-svg-icons";
import { useLocalizedHref } from "@/hooks";
import { useTranslations } from "next-intl";
import { ROUTES } from "@/constants/routes";

export default function Sidebar() {
    const t = useTranslations();
    const { getHref } = useLocalizedHref();

    return (
        <aside
            id="sidebar"
            className="hidden lg:block left-0 top-0 w-64 h-screen bg-white shadow-lg z-30"
        >
            <div className="p-6 h-full flex flex-col">
                <div className="flex items-center space-x-3 mb-8">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                        <FontAwesomeIcon
                            icon={faStore}
                            className=" text-xl text-white"
                        />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">
                        {t("app.name")}
                    </span>
                </div>

                <nav className="space-y-1">
                    <SidebarItem
                        href={getHref(ROUTES.DASHBOARD)}
                        icon={faHome}
                        label={t("app.navigation.dashboard")}
                    />
                    <SidebarItem
                        href={getHref(ROUTES.ORDERS)}
                        icon={faShoppingCart}
                        label={t("app.navigation.orders")}
                        badge="12"
                    />
                    <SidebarItem
                        href={getHref(ROUTES.PRODUCTS)}
                        icon={faBox}
                        label={t("app.navigation.products")}
                    />
                    <SidebarItem
                        href={getHref(ROUTES.CHATS)}
                        icon={faComments}
                        label={t("app.navigation.chats")}
                        badge="5"
                        badgeColor="blue"
                    />
                    <SidebarItem
                        href={getHref(ROUTES.WAREHOUSE)}
                        icon={faWarehouse}
                        label={t("app.navigation.warehouse")}
                    />
                    <SidebarItem
                        href={getHref(ROUTES.AIASSISTANT)}
                        icon={faRobot}
                        label={t("app.navigation.aiAssistant")}
                    />
                    <SidebarItem
                        href={getHref(ROUTES.REPORTS)}
                        icon={faChartLine}
                        label={t("app.navigation.reports")}
                    />
                </nav>

                <div className="mt-auto pt-8 border-t">
                    <SidebarItem
                        href={getHref(ROUTES.CONNECTIONS)}
                        icon={faPlug}
                        label={t("app.navigation.connections")}
                    />
                    <SidebarItem
                        href={getHref(ROUTES.SETTINGS)}
                        icon={faCog}
                        label={t("app.navigation.settings")}
                    />
                </div>
            </div>
        </aside>
    );
}
