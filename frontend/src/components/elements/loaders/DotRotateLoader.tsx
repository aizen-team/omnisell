"use client";

import React, { FC } from "react";
import classNames from "classnames";
import { LoaderProps } from "@/types/loader";

interface Props extends LoaderProps {}

const DotRotateLoader: FC<Props> = ({
    fullScreen = false,
    inline = false,
    centered = false,
    className = "",
}) => {
    const dots = Array.from({ length: 7 });

    return (
        <div
            className={classNames(
                "dot-rotate-loader",
                {
                    "full-screen": fullScreen,
                    inline: inline,
                    centered: centered,
                },
                className
            )}
        >
            <div className="loader">
                {dots.map((_, i) => (
                    <div
                        className="dot-container"
                        style={{ ["--i" as any]: i } as React.CSSProperties}
                        key={i}
                    >
                        <span className="dot" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DotRotateLoader;
