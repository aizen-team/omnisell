"use client";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useState } from "react";
import * as Yup from "yup";

export default function AuthPage() {
    const [mode, setMode] = useState<"login" | "register">(
        "login"
    );

    const validated = Yup.object().shape({
        email: Yup.string()
            .email("Email không hợp lệ")
            .required("Bắt buộc"),
        password: Yup.string()
            .min(6, "Ít nhất 6 ký tự")
            .required("Bắt buộc"),
    });

    return (
        <div id="login-page" className="h-full">
            <div className="login-container h-full flex flex-col p-6 sm:p-8 lg:p-12 xl:px-20">
                <Link
                    href={"/"}
                    className="flex items-center space-x-2 slide-in-left"
                >
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            ></path>
                        </svg>
                    </div>
                    <span className="text-xl sm:text-2xl font-bold gradient-text">
                        OmniSell
                    </span>
                </Link>
                <div className="flex-1 flex flex-col justify-center max-w-[20rem] mx-auto">
                    <div>
                        <div>
                            <h1 className="form-title text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                                Chào mừng trở lại!
                            </h1>
                            <p className="form-subtitle text-gray-600 text-sm sm:text-base">
                                Đăng nhập để quản lý cửa
                                hàng của bạn
                            </p>
                        </div>
                        <Formik
                            initialValues={{
                                email: "",
                                password: "",
                            }}
                            validationSchema={validated}
                            onSubmit={(values) => {
                                console.log(
                                    "Submit:",
                                    values
                                );
                            }}
                        >
                            <Form></Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
}
