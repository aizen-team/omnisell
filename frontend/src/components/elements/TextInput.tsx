import { useField } from "formik";
import classNames from "classnames";
import { Renderif } from "../conditions";
import { InputHTMLAttributes } from "react";
import { ErrorMessage } from "../shared";

interface Props
    extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    name: string;
    containerClassName?: string;
}

export default function TextInput(props: Props) {
    const {
        name,
        containerClassName,
        label,
        className,
        ...rest
    } = props;
    const [field, meta] = useField(name);

    return (
        <div
            className={classNames(
                "mb-4",
                containerClassName
            )}
        >
            <Renderif condition={!!label}>
                <label
                    htmlFor={name}
                    className="block mb-1 text-sm font-medium text-gray-700"
                >
                    {label}
                </label>
            </Renderif>
            <input
                {...rest}
                id={name}
                {...field}
                className={classNames(
                    "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2",
                    "focus:ring-blue-500",
                    "transition",
                    className,
                    {
                        "border-red-500 bg-red-50":
                            meta.touched && meta.error,
                    }
                )}
            />
            <Renderif
                condition={!!meta.touched && !!meta.error}
            >
                <ErrorMessage message={meta.error} />
            </Renderif>
        </div>
    );
}
