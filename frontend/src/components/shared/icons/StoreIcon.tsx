import { IconProps } from "@/types/app";
import classNames from "classnames";
import * as React from "react";

interface Props extends IconProps {}

export default function StoreIcon(props: Props) {
    const { size = 24, strokeWidth = 2, className, ...rest } = props;
    return (
        <svg
            width={size}
            height={size}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            className={classNames(className)}
            {...rest}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
        </svg>
    );
}
