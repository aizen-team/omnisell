import { useField } from "formik";
import classNames from "classnames";
import { Renderif } from "../../conditions";
import { InputHTMLAttributes, ComponentType, SVGProps } from "react";
import { ErrorMessage } from "../../shared";
import { IconProps } from "@/types/app";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    name: string;
    containerClassName?: string;
    icon?: ComponentType<SVGProps<SVGSVGElement>>;
    iconPlacement?: "prefix" | "suffix";
    onIconClick?: () => void;
    iconProps?: IconProps;
}

export default function TextField(props: Props) {
    const {
        name,
        containerClassName,
        label,
        className,
        icon: Icon,
        iconPlacement = "prefix",
        onIconClick,
        iconProps,
        ...rest
    } = props;

    const [field, meta] = useField(name);
    const hasError = meta.touched && meta.error;

    const isPrefix = Icon && iconPlacement === "prefix";
    const isSuffix = Icon && iconPlacement === "suffix";

    return (
        <div className={classNames("text-field-container mb-4", containerClassName)}>
            <Renderif condition={!!label}>
                <label
                    htmlFor={name}
                    className="block mb-1 text-sm font-medium text-gray-700"
                >
                    {label}
                </label>
            </Renderif>

            <div className="relative">
                <Renderif condition={!!isPrefix}>
                    <div
                        className={classNames(
                            "absolute inset-y-0 left-0 pl-3 flex items-center",
                            {
                                "cursor-pointer": !!onIconClick,
                                "pointer-events-none": !onIconClick,
                            }
                        )}
                        onClick={onIconClick}
                    >
                        {Icon ? <Icon {...iconProps} /> : null}
                    </div>
                </Renderif>

                <input
                    {...rest}
                    id={name}
                    {...field}
                    className={classNames(
                        "w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition",
                        {
                            "pl-10": isPrefix,
                            "pr-10": isSuffix,
                            "border-red-500 bg-red-50": hasError,
                        },
                        className
                    )}
                />

                <Renderif condition={!!isSuffix}>
                    <div
                        className={classNames(
                            "absolute inset-y-0 right-0 pr-3 flex items-center",
                            {
                                "cursor-pointer": !!onIconClick,
                                "pointer-events-none": !onIconClick,
                            }
                        )}
                        onClick={onIconClick}
                    >
                        {Icon ? <Icon {...iconProps} /> : null}
                    </div>
                </Renderif>
            </div>

            <Renderif condition={!!hasError}>
                <ErrorMessage message={meta.error} />
            </Renderif>
        </div>
    );
}
