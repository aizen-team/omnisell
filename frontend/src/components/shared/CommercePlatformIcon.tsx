import { faFacebook, faShopify, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import RenderIf from "../conditions/RenderIf";

type Channel = "shopee" | "tiktok" | "facebook";

interface Props {
    channel: Channel;
    size?: number;
    className?: string;
}

const PLATFORM_STYLES: Record<
    Props["channel"],
    {
        icon: any;
        bgColor: string;
        iconColor?: string;
    }
> = {
    facebook: {
        icon: faFacebook,
        bgColor: "bg-blue-100",
        iconColor: "text-blue-600",
    },
    tiktok: {
        icon: faTiktok,
        bgColor: "bg-gray-100",
        iconColor: "text-black",
    },
    shopee: {
        icon: faShopify,
        bgColor: "bg-orange-50",
        iconColor: "text-orange-600",
    },
};

export default function CommercePlatformIcon({
    channel,
    className,
    size = 40,
}: Props) {
    const platform = PLATFORM_STYLES[channel];
    return (
        <div
            className={classNames(
                "flex items-center justify-center rounded-lg shrink-0",
                platform.bgColor,
                className
            )}
            style={{ width: size, height: size }}
        >
            <FontAwesomeIcon
                icon={platform.icon}
                className={classNames("w-4 h-4", platform.iconColor)}
            />
        </div>
    );
}
