import { FC } from "react";

const AccountCenter: FC = () => {
    return (
        <div className="user-container flex items-center gap-4 ml-2">
            <div className="user-avatar w-10 h-10">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEcOYN57DOwU0mvfwhTxAQndvPHeKOnM67dg&s"
                    alt="Avatar"
                    className="w-full h-full object-cover rounded-full"
                />
            </div>
            <div className="user-info">
                <p className="font-medium text-gray-900">Nguyễn Văn A</p>
                <p className="text-xs text-gray-500">Admins</p>
            </div>
        </div>
    );
};

export default AccountCenter;
