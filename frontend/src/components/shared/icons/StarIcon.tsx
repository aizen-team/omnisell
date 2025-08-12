import { IconProps } from "@/types/app";
import classNames from "classnames";
import * as React from "react";

interface Props extends IconProps {}

export default function StarIcon(props: Props) {
    const { size = 24, strokeWidth = 2, className, ...rest } = props;
    return (
        <svg
            width={size}
            height={size}
            fill="currentColor"
            viewBox="0 0 24 24"
            className={classNames(className)}
            {...rest}
        >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
    );
}
