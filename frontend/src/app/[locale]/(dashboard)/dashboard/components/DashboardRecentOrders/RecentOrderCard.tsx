"use client";

import React from "react";
import { CommercePlatformIcon } from "@/components/shared";

export type Order = {
    name: string;
    amount: string;
    time: string;
    commercePlatform: "shopee" | "tiktok" | "facebook";
    id: string;
};

interface Props {
    item: Order;
}

const RecentOrderCard: React.FC<Props> = ({ item }) => {
    const { amount, commercePlatform, name, time, id } = item;
    return (
        <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-all duration-200 ease-in-out">
            <CommercePlatformIcon channel={commercePlatform} />
            <div className="flex-1">
                <p className="font-medium text-gray-900">{id}</p>
                <p className="text-sm text-gray-600">{name}</p>
            </div>
            <div className="text-right">
                <p className="font-medium text-gray-900">{amount}</p>
                <p className="text-xs text-gray-500">{time}</p>
            </div>
        </div>
    );
};

export default RecentOrderCard;
