import classNames from "classnames";
import { ComponentType, ButtonHTMLAttributes, SVGProps } from "react";
import { IconProps } from "@/types/app";
import { Renderif } from "@/components/conditions";
import { FadingDotLoader } from "@/components/elements/loaders";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    labelClassName?: string;
    icon?: ComponentType<SVGProps<SVGSVGElement>>;
    iconPlacement?: "start" | "end";
    iconProps?: IconProps;
    isLoading?: boolean;
    variant?: "primary" | "secondary" | "danger" | "ghost" | "outline" | "none";
    size?: "sm" | "md" | "lg";
}

export default function Button(props: Props) {
    const {
        label,
        labelClassName,
        icon: Icon,
        iconPlacement = "start",
        iconProps,
        isLoading = false,
        className,
        variant = "primary",
        size = "md",
        disabled,
        ...rest
    } = props;

    const isStart = !!Icon && iconPlacement === "start";
    const isEnd = !!Icon && iconPlacement === "end";

    return (
        <button
            className={classNames(
                "button",
                `button-${variant}`,
                `button-${size}`,
                {
                    "opacity-50 cursor-not-allowed": disabled || isLoading,
                },
                className
            )}
            disabled={disabled || isLoading}
            {...rest}
        >
            <Renderif condition={isLoading}>
                <div
                    className={classNames(
                        "absolute top-1/2 left-1/2 -translate-1/2"
                    )}
                >
                    <FadingDotLoader inline />
                </div>
            </Renderif>

            <div
                className={classNames(
                    "inline-flex items-center justify-center",
                    {
                        "opacity-0": isLoading,
                        "gap-2": Icon || isLoading,
                    }
                )}
            >
                <Renderif condition={isStart}>
                    {Icon ? (
                        <Icon {...iconProps} className="button-icon" />
                    ) : null}
                </Renderif>

                <span className={classNames("button-label", labelClassName)}>
                    {label}
                </span>

                <Renderif condition={isEnd}>
                    {Icon ? (
                        <Icon {...iconProps} className="button-icon" />
                    ) : null}
                </Renderif>
            </div>
        </button>
    );
}
