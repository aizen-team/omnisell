import { IconProps } from "@/types/app";
import classNames from "classnames";
import * as React from "react";

interface Props extends IconProps {}

export default function MonitorIcon(props: Props) {
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
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
        </svg>
    );
}
