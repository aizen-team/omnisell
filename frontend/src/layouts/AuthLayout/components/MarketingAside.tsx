"use client";

import {
    AnalyticsIcon,
    LightningIcon,
    MonitorIcon,
    RatingIcon,
    StarIcon,
} from "@/components/shared/icons";
import { useTranslations } from "next-intl";
import React from "react";

export default function MarketingAside() {
    const t = useTranslations();

    return (
        <div className="hero-section h-full gradient-bg relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-700">
            <div className="absolute inset-0 hero-pattern"></div>
            <div className="relative h-full flex flex-col items-center justify-center p-8 lg:p-12 xl:p-16 text-white">
                <div className="absolute top-10 left-10 opacity-10 float hidden xl:block">
                    <StarIcon size={106} />
                </div>
                <div
                    className="absolute bottom-10 right-10 opacity-10 float hidden xl:block"
                    style={{ animationDelay: "1.5s" }}
                >
                    <StarIcon size={128} />
                </div>

                <div className="max-w-lg text-center fade-in z-10">
                    <div className="mb-6 lg:mb-8">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                            <div className="flex justify-center space-x-3 mb-4">
                                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-lg flex items-center justify-center">
                                    <MonitorIcon className="w-5 h-5 lg:w-6 lg:h-6" />
                                </div>
                                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-lg flex items-center justify-center">
                                    <LightningIcon className="w-5 h-5 lg:w-6 lg:h-6" />
                                </div>
                                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-lg flex items-center justify-center">
                                    <AnalyticsIcon className="w-5 h-5 lg:w-6 lg:h-6" />
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">
                                {t("auth.marketing.box.title")}
                            </h3>
                            <p className="text-white/80 text-sm">
                                {t("auth.marketing.box.description")}
                            </p>
                        </div>
                    </div>

                    <h2 className="text-2xl lg:text-3xl font-bold mb-3 lg:mb-4">
                        {t("auth.marketing.title")}
                    </h2>
                    <p className="text-base lg:text-lg text-white/90 mb-6">
                        {t("auth.marketing.description")}
                    </p>

                    <div className="grid grid-cols-3 gap-4 text-center mb-6">
                        <div>
                            <div className="text-xl lg:text-2xl font-bold mb-1">
                                5K+
                            </div>
                            <div className="text-xs text-white/70">
                                {t("auth.marketing.metrics.sellers")}
                            </div>
                        </div>
                        <div>
                            <div className="text-xl lg:text-2xl font-bold mb-1">
                                1M+
                            </div>
                            <div className="text-xs text-white/70">
                                {t("auth.marketing.metrics.orders")}
                            </div>
                        </div>
                        <div>
                            <div className="text-xl lg:text-2xl font-bold mb-1">
                                AI
                            </div>
                            <div className="text-xs text-white/70">
                                {t("auth.marketing.metrics.integration")}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 lg:p-5">
                        <div className="flex items-center justify-center mb-2">
                            <RatingIcon size={16} className="text-yellow-400" />
                            <RatingIcon size={16} className="text-yellow-400" />
                            <RatingIcon size={16} className="text-yellow-400" />
                            <RatingIcon size={16} className="text-yellow-400" />
                            <RatingIcon size={16} className="text-yellow-400" />
                        </div>
                        <p className="text-white/90 italic mb-2 text-sm">
                            {t("auth.marketing.testimonial.quote")}
                        </p>
                        <p className="font-semibold text-sm">
                            {t("auth.marketing.testimonial.name")}
                        </p>
                        <p className="text-xs text-white/70">
                            {t("auth.marketing.testimonial.position")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
