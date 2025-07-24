import RenderIf from "../conditions/RenderIf";

type Props = {
    message?: string;
    showIcon?: boolean;
};

const ErrorMessage = ({
    message,
    showIcon = true,
}: Props) => {
    return (
        <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
            <RenderIf condition={showIcon}>
                <svg
                    className="w-3 h-3 sm:w-4 sm:h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                    ></path>
                </svg>
            </RenderIf>
            <span className="error-message">{message}</span>
        </div>
    );
};

export default ErrorMessage;
