"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { motion } from "framer-motion";

export type DashboardStatsCardProps = {
    icon: IconDefinition;
    iconBg: string;
    iconColor?: string;
    value: string | number;
    label: string;
    trend?: string;
    trendColor?: string;
    trendIcon?: IconDefinition;
    delay?: number;
};

const DashboardStatsCard: React.FC<DashboardStatsCardProps> = ({
    icon,
    iconBg,
    iconColor = "text-white",
    value,
    label,
    trend,
    trendColor = "text-gray-600",
    trendIcon,
    delay = 0,
}) => {
    return (
        <motion.div
            className="stat-card bg-white rounded-xl p-4 lg:p-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: delay,
            }}
        >
            <div className="flex items-center justify-between mb-4">
                <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconBg}`}
                >
                    <FontAwesomeIcon
                        icon={icon}
                        className={`${iconColor} text-xl`}
                    />
                </div>
                {trend && trendIcon && (
                    <span className={`text-sm font-medium ${trendColor}`}>
                        <FontAwesomeIcon icon={trendIcon} className="mr-1" />
                        {trend}
                    </span>
                )}
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                {value}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{label}</p>
        </motion.div>
    );
};

export default DashboardStatsCard;
