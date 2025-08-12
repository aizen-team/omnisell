import { IconProps } from "@/types/app";
import classNames from "classnames";
import * as React from "react";

interface Props extends IconProps {}

export default function LightningIcon(props: Props) {
    const { size = 24, strokeWidth = 2, className, ...rest } = props;
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={classNames(className)}
            // className="w-5 h-5 lg:w-6 lg:h-6"
            fill="none"
            stroke="currentColor"
            {...rest}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
            />
        </svg>
    );
}
