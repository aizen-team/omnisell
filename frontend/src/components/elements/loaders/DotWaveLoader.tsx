"use client";

import React, { FC } from "react";
import classNames from "classnames";
import { LoaderProps } from "@/types/loader";

interface Props extends LoaderProps {}

const DotWaveLoader: FC<Props> = ({
    fullScreen = false,
    inline = false,
    centered = false,
    className = "",
}) => {
    const dots = Array.from({ length: 5 });

    return (
        <div
            className={classNames(
                "dot-wave-loader",
                {
                    "full-screen": fullScreen,
                    inline: inline,
                    centered: centered,
                },
                className
            )}
        >
            <div className="dot-wave">
                {dots.map((_, index) => (
                    <span key={index} />
                ))}
            </div>
        </div>
    );
};

export default DotWaveLoader;
