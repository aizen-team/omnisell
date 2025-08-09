"use client";

import classNames from "classnames";
import Link from "next/link";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RenderIf from "@/components/conditions/RenderIf";
import { useAppContext } from "@/context/AppContext";
import { useMemo } from "react";
import usePath from "@/hooks/usePath";
import { useAppDispatch } from "@/store/hooks";
import { setAppLoading, setRouteLoading } from "@/store/slices/appSlice";
import { Badge } from "@/components/elements";

type Props = {
    href: string;
    icon: IconDefinition;
    label: string;
    active?: boolean;
    badge?: string;
    badgeColor?: string;
};

const SidebarItem = ({
    href,
    icon,
    label,
    badge,
    badgeColor = "bg-red-500",
}: Props) => {
    const dispatch = useAppDispatch();
    const { setLoading } = useAppContext();
    const { isPathActive } = usePath();

    const active = useMemo(() => {
        return isPathActive(href);
    }, [href, isPathActive]);

    const handleClick = () => {
        // if (!active) setLoading(true);
        if (!active) dispatch(setAppLoading(true));
    };

    return (
        <Link
            href={href}
            className={classNames(
                "sidebar-item flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50",
                { "bg-blue-50": active }
            )}
            onClick={handleClick}
        >
            <FontAwesomeIcon
                icon={icon}
                className={classNames("item-icon text-lg transition-all", {
                    "text-blue-600": active,
                })}
            />
            <span
                className={classNames("item-label", {
                    "text-blue-600": active,
                })}
            >
                {label}
            </span>
            <RenderIf condition={!!badge}>
                <Badge
                    children={badge}
                    className="h-5 w-5 flex items-center justify-center"
                />
            </RenderIf>
        </Link>
    );
};

export default SidebarItem;
