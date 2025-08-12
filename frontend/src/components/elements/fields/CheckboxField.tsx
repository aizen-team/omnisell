import { useField } from "formik";
import classNames from "classnames";
import { Renderif } from "@/components/conditions";
import { InputHTMLAttributes } from "react";
import { ErrorMessage } from "@/components/shared";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    name: string;
    containerClassName?: string;
}

export default function CheckboxField(props: Props) {
    const { name, label, containerClassName, className, ...rest } = props;

    const [field, meta] = useField({
        name,
        type: "checkbox",
    });

    return (
        <div>
            <label
                className={classNames(
                    "checkbox-container flex items-center gap-2 text-sm text-gray-700",
                    containerClassName
                )}
            >
                <input
                    type="checkbox"
                    {...rest}
                    {...field}
                    className={classNames(
                        "form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500",
                        className,
                        {
                            "border-red-500 bg-red-50":
                                meta.touched && meta.error,
                        }
                    )}
                />
                <span className="checkbox-label">{label}</span>
            </label>

            <Renderif condition={!!meta.touched && !!meta.error}>
                <ErrorMessage message={meta.error} />
            </Renderif>
        </div>
    );
}
