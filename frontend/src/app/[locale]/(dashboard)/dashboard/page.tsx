import { faShopify } from "@fortawesome/free-brands-svg-icons";
import {
    faArrowUp,
    faDollarSign,
    faExclamationTriangle,
    faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FC } from "react";
import RevenueChart from "./components/RevenueChart";
import AnnotatedChart from "./components/AnnotatedChart";
import DashboardStats from "./components/DashboardStats";
import DashboardRecentOrders from "./components/DashboardRecentOrders";
import { Order } from "./components/DashboardRecentOrders/RecentOrderCard";

const DashboardPage: FC = () => {
    const stats = [
        {
            icon: faShoppingCart,
            iconBg: "bg-gradient-to-br from-blue-300 to-blue-600",
            value: 156,
            label: "Đơn hôm nay",
            trend: "12%",
            trendColor: "text-green-600",
            trendIcon: faArrowUp,
        },
        {
            icon: faDollarSign,
            iconBg: "bg-gradient-to-br from-green-300 to-green-600",
            value: "23.5M",
            label: "Doanh thu hôm nay",
            trend: "8%",
            trendColor: "text-green-600",
            trendIcon: faArrowUp,
        },
        {
            icon: faExclamationTriangle,
            iconBg: "bg-gradient-to-br from-yellow-300 to-yellow-600",
            value: 12,
            label: "Sản phẩm tồn kho thấp",
            trend: "5",
            trendColor: "text-red-600",
            trendIcon: faArrowUp,
        },
        {
            icon: faShopify,
            iconBg: "bg-gradient-to-br from-orange-300 to-orange-600",
            value: "Shopee",
            label: "Kênh nhiều đơn nhất",
            trend: "42%",
            trendColor: "text-gray-600",
        },
    ];

    const orders: Order[] = [
        {
            id: "#SP12345",
            name: "Nguyễn Thị B",
            amount: "520k",
            time: "2 phút trước",
            commercePlatform: "facebook",
        },
        {
            id: "#TT98765",
            name: "Trần Văn C",
            amount: "1.2M",
            time: "2 phút",
            commercePlatform: "facebook",
        },
        {
            id: "#FB54321",
            name: "Lê Thị D",
            amount: "850k",
            time: "30 phút trước",
            commercePlatform: "tiktok",
        },
        {
            id: "#SP11111",
            name: "Phạm Văn E",
            amount: "320k",
            time: "1 giờ trước",
            commercePlatform: "shopee",
        },
    ];

    return (
        <div id="dashboard-page" className="">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <DashboardStats items={stats} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
                    <RevenueChart />
                </div>
                <div className="p-4 bg-white rounded-xl lg:p-6 shadow-sm">
                    <DashboardRecentOrders items={orders} />
                </div>
            </div>
            <AnnotatedChart />
        </div>
    );
};

export default DashboardPage;
