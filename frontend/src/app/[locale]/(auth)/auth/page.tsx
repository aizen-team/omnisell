"use client";
import RenderIf from "@/components/conditions/RenderIf";
import { Button } from "@/components/elements";
import { StoreIcon } from "@/components/shared/icons";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { LoginForm } from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import classNames from "classnames";

type View = "login" | "register";

export default function AuthPage() {
    const t = useTranslations();
    const [authView, setAuthView] = useState<View>("login");

    const handleChangeMode = (view: View) => {
        setAuthView(view);
    };

    return (
        <div id="auth-page" className="h-full">
            <div className="auth-container h-full flex flex-col p-6 sm:p-8 lg:p-12 xl:px-20 overflow-y-auto">
                <Link
                    href={"/"}
                    className="flex items-center space-x-2 slide-in-left mb-8"
                >
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                        <StoreIcon className="text-white" size={24} />
                    </div>
                    <span className="text-xl sm:text-2xl font-bold gradient-text">
                        {t("app.name")}
                    </span>
                </Link>
                <div className="flex-1 flex flex-col justify-center max-w-[28rem] w-full mx-auto">
                    <div className="grid grid-cols-2 gap-1 p-1 bg-gray-200 rounded-lg mb-6">
                        <Button
                            label={t("auth.login.label")}
                            className=""
                            variant={authView === "login" ? "primary" : "none"}
                            size="lg"
                            onClick={() => handleChangeMode("login")}
                            labelClassName={classNames("text-sm", {
                                "text-gray-500": authView !== "login",
                            })}
                        />
                        <Button
                            label={t("auth.register.label")}
                            variant={
                                authView === "register" ? "primary" : "none"
                            }
                            size="lg"
                            onClick={() => handleChangeMode("register")}
                            labelClassName={classNames("text-sm", {
                                "text-gray-500": authView !== "register",
                            })}
                        />
                    </div>
                    <div>
                        <RenderIf condition={authView === "login"}>
                            <LoginForm
                                onChangeView={() =>
                                    handleChangeMode("register")
                                }
                            />
                        </RenderIf>
                        <RenderIf condition={authView === "register"}>
                            <RegisterForm
                                onChangeView={() => handleChangeMode("login")}
                            />
                        </RenderIf>
                    </div>
                </div>
            </div>
        </div>
    );
}
