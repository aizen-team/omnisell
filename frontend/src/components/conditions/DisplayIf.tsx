import classNames from "classnames";
import React from "react";

const DisplayIf: React.FC<{
    condition: boolean;
    children: React.ReactNode;
    force?: boolean;
    className?: string;
}> = ({ condition, children, force, className }) => {
    if (force) {
        return (
            <div
                className={classNames(
                    "display-if-component",
                    className,
                    {
                        "hidden": !condition,
                    }
                )}
            >
                {children}
            </div>
        );
    }
    return condition ? children : null;
};

export default DisplayIf;
