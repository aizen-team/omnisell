"use client";

import React, { FC } from "react";
import classNames from "classnames";
import { LoaderProps } from "@/types/loader";

interface Props extends LoaderProps {}

const FadingDotLoader: FC<Props> = ({
    fullScreen = false,
    inline = false,
    centered = false,
    className = "",
}) => {
    const dots = Array.from({ length: 3 });

    return (
        <div
            className={classNames(
                "fading-dot-loader-container",
                {
                    "full-screen": fullScreen,
                    inline: inline,
                    centered: centered,
                },
                className
            )}
        >
            <div className="dot-loader">
                {dots.map((_, index) => (
                    <span
                        key={index}
                        className="dot"
                        style={{ ["--i" as any]: index }}
                    />
                ))}
            </div>
        </div>
    );
};

export default FadingDotLoader;
