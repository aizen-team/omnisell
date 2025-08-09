import React from "react";
import classNames from "classnames";

type BadgeVariant =
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "neutral";

type BadgeSize = "sm" | "md" | "lg";
type BadgeRounded = "full" | "md" | "none";

type BadgeProps = {
    children?: React.ReactNode;
    variant?: BadgeVariant;
    size?: BadgeSize;
    rounded?: BadgeRounded;
    bordered?: boolean;
    isDot?: boolean;
    className?: string;
};

const Badge: React.FC<BadgeProps> = ({
    children,
    variant = "primary",
    size = "md",
    rounded = "full",
    bordered = false,
    isDot = false,
    className,
}) => {
    const baseClass = "inline-flex items-center font-semibold";

    const sizeClassMap: Record<BadgeSize, string> = {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
    };

    const roundedClassMap: Record<BadgeRounded, string> = {
        full: "rounded-full",
        md: "rounded-md",
        none: "rounded-none",
    };

    const variantClassMap: Record<BadgeVariant, string> = {
        primary: "bg-blue-100 text-blue-800",
        secondary: "bg-gray-100 text-gray-800",
        success: "bg-green-100 text-green-800",
        danger: "bg-red-100 text-red-800",
        warning: "bg-yellow-100 text-yellow-800",
        info: "bg-cyan-100 text-cyan-800",
        neutral: "bg-gray-200 text-gray-900",
    };

    const borderClass = bordered ? "border border-current" : "";

    if (isDot) {
        return (
            <span
                className={classNames(
                    "flex items-center justify-center",
                    "w-2 h-2",
                    "rounded-full",
                    variantClassMap[variant],
                    className
                )}
            />
        );
    }

    return (
        <span
            className={classNames(
                baseClass,
                sizeClassMap[size],
                roundedClassMap[rounded],
                variantClassMap[variant],
                borderClass,
                className
            )}
        >
            {children}
        </span>
    );
};

export default Badge;
