import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

const Notifications: FC = () => {
    return (
        <div className="notifictions-container w-8 h-8 flex items-center justify-center">
            <div className="relative">
                <FontAwesomeIcon
                    icon={faBell}
                    size="xl"
                    className="text-gray-700"
                />
                <span className="absolute top-0 right-0 text-white bg-red-500 w-4 h-4 flex items-center justify-center text-xs rounded-full translate-x-1/2 -translate-y-1/2">
                    1
                </span>
            </div>
        </div>
    );
};

export default Notifications;
