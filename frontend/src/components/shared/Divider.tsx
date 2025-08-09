import classNames from "classnames";
import RenderIf from "../conditions/RenderIf";

interface Props {
    label?: string;
    labelContainer?: string;
    className?: string;
}

export default function Divider({ label, labelContainer, className }: Props) {
    return (
        <div
            className={classNames("divider-container relative my-4", className)}
        >
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
                <span
                    className={classNames(
                        "divider-label px-3 bg-gray-50 text-gray-500",
                        labelContainer
                    )}
                >
                    <RenderIf condition={!!label}>{label}</RenderIf>
                </span>
            </div>
        </div>
    );
}
