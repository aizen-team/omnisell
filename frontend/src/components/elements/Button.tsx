import classNames from "classnames";
import React, {
    ButtonHTMLAttributes,
    ReactNode,
} from "react";
import RenderIf from "../conditions/RenderIf";
import { DotWaveLoader } from "./loaders";

type Variant =
    | "primary"
    | "secondary"
    | "outline"
    | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
    loading?: boolean;
    className?: string;
    label?: string;
    icon?: React.ReactNode;
    iconPosition?: "start" | "end";
}

export default function Button(props: ButtonProps) {
    const {
        label,
        variant = "primary",
        size = "md",
        loading = false,
        disabled,
        className,
        icon,
        iconPosition,
        ...rest
    } = props;

    return (
        <button
            className={classNames(
                "button",
                `button-${variant}`,
                `button-${size}`,
                {
                    "button-disabled": disabled || loading,
                },
                className
            )}
            disabled={disabled || loading}
            {...rest}
        >
            <RenderIf condition={loading}>
                <DotWaveLoader inline />
            </RenderIf>
            <RenderIf condition={!loading}>
                <RenderIf
                    condition={
                        !!icon && iconPosition === "start"
                    }
                >
                    {icon}
                </RenderIf>
                <span className="label">{label}</span>
                <RenderIf
                    condition={
                        !!icon && iconPosition === "end"
                    }
                >
                    {icon}
                </RenderIf>
            </RenderIf>
        </button>
    );
}
