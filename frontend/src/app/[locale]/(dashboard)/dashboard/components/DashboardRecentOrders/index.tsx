import { FC } from "react";
import RecentOrderCard, { Order } from "./RecentOrderCard";

interface Props {
    items: Order[];
}

const DashboardRecentOrders: FC<Props> = ({ items }) => {
    return (
        <div className="">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                    Đơn hàng gần đây
                </h2>
                <a
                    href="#"
                    className="text-sm text-blue-600 hover:text-blue-700"
                >
                    Xem tất cả
                </a>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
                {items.map((item, idx) => (
                    <RecentOrderCard key={idx} item={item} />
                ))}
            </div>
        </div>
    );
};

export default DashboardRecentOrders;
