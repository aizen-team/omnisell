import { IconProps } from "@/types/app";
import classNames from "classnames";
import * as React from "react";

interface Props extends IconProps {}

export default function AnalyticsIcon(props: Props) {
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
        </svg>
    );
}
