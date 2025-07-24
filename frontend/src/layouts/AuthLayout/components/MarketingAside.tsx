"use client";

import React from "react";

export default function MarketingAside() {
    return (
        <div className="hero-section h-full gradient-bg relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-700">
            <div className="absolute inset-0 hero-pattern"></div>

            <div className="relative h-full flex flex-col items-center justify-center p-8 lg:p-12 xl:p-16 text-white">
                <div className="absolute top-10 left-10 opacity-10 float hidden xl:block">
                    <svg
                        className="w-24 h-24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                </div>
                <div
                    className="absolute bottom-10 right-10 opacity-10 float hidden xl:block"
                    style={{ animationDelay: "1.5s" }}
                >
                    <svg
                        className="w-32 h-32"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>

                <div className="max-w-lg text-center fade-in z-10">
                    <div className="mb-6 lg:mb-8">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                            <div className="flex justify-center space-x-3 mb-4">
                                {[
                                    "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                                    "M13 10V3L4 14h7v7l9-11h-7z",
                                    "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
                                ].map((d, i) => (
                                    <div
                                        key={i}
                                        className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-lg flex items-center justify-center"
                                    >
                                        <svg
                                            className="w-5 h-5 lg:w-6 lg:h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={
                                                    2
                                                }
                                                d={d}
                                            />
                                        </svg>
                                    </div>
                                ))}
                            </div>
                            <h3 className="text-lg font-semibold mb-2">
                                AI-Powered Multichannel
                            </h3>
                            <p className="text-white/80 text-sm">
                                Tự động hóa quy trình bán
                                hàng với AI thông minh
                            </p>
                        </div>
                    </div>

                    <h2 className="text-2xl lg:text-3xl font-bold mb-3 lg:mb-4">
                        Quản lý thông minh với AI
                    </h2>
                    <p className="text-base lg:text-lg text-white/90 mb-6">
                        Tích hợp AI chatbot, phân tích dữ
                        liệu tự động và gợi ý sản phẩm thông
                        minh. Tăng doanh thu 40% với công
                        nghệ AI tiên tiến.
                    </p>

                    <div className="grid grid-cols-3 gap-4 text-center mb-6">
                        <div>
                            <div className="text-xl lg:text-2xl font-bold mb-1">
                                5K+
                            </div>
                            <div className="text-xs text-white/70">
                                Người bán
                            </div>
                        </div>
                        <div>
                            <div className="text-xl lg:text-2xl font-bold mb-1">
                                1M+
                            </div>
                            <div className="text-xs text-white/70">
                                Đơn/tháng
                            </div>
                        </div>
                        <div>
                            <div className="text-xl lg:text-2xl font-bold mb-1">
                                AI
                            </div>
                            <div className="text-xs text-white/70">
                                Tích hợp
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 lg:p-5">
                        <div className="flex items-center justify-center mb-2">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    className="w-4 h-4 text-yellow-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <p className="text-white/90 italic mb-2 text-sm">
                            "AI chatbot của OmniSell giúp
                            tôi trả lời khách 24/7, tăng tỷ
                            lệ chuyển đổi lên 35%!"
                        </p>
                        <p className="font-semibold text-sm">
                            Trần Minh Tuấn
                        </p>
                        <p className="text-xs text-white/70">
                            CEO TechShop
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
