"use client";

import { Button } from "@/components/elements";
import { CheckboxField, TextField } from "@/components/elements/fields";
import { Divider } from "@/components/shared";
import {
    EyeIcon,
    EyeSlashIcon,
    FacebookIcon,
    GoogleIcon,
    ShopeeIcon,
    TiktokIcon,
} from "@/components/shared/icons";
import { ROUTES } from "@/constants/routes";
import { useLocalizedHref } from "@/hooks";
import { User } from "@/types/auth";
import { Form, Formik, FormikHelpers } from "formik";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";

interface Props {
    onChangeView: () => void;
}

interface FormValues extends Pick<User, "email" | "password" | "remember"> {}

export function LoginForm({ onChangeView }: Props) {
    const t = useTranslations();
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const router = useRouter();
    const { getHref } = useLocalizedHref();
    const [submitting, setSubmitting] = useState<boolean>(false);

    const initialValues: FormValues = {
        email: "",
        password: "",
        remember: false,
    };

    const validated = Yup.object().shape({
        email: Yup.string()
            .email(t("validate.fields.email.invalid"))
            .required(t("validate.fields.email.required")),
        password: Yup.string()
            .min(6, t("validate.common.min", { min: 6 }))
            .required(t("validate.fields.password.required")),
    });

    const handleSubmit = (
        values: FormValues,
        { setErrors }: FormikHelpers<FormValues>
    ) => {
        setSubmitting(true);
        setTimeout(() => {
            router.push(getHref(ROUTES.DASHBOARD));
        }, 3000);
    };

    return (
        <div className="login-container">
            <div className="mb-5">
                <h1 className="form-title text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                    {t("auth.login.welcomeBack")}
                </h1>
                <p className="form-subtitle text-gray-600 text-sm sm:text-base">
                    {t("auth.login.description")}
                </p>
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={validated}
                onSubmit={handleSubmit}
            >
                <Form className="login-form mb-5">
                    <TextField
                        name="email"
                        label={t("form.fields.email.label")}
                        placeholder={t("form.fields.email.placeholder")}
                    />
                    <TextField
                        name="password"
                        label={t("form.fields.password.label")}
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder={t("form.fields.password.placeholder")}
                        icon={isPasswordVisible ? EyeSlashIcon : EyeIcon}
                        iconPlacement="suffix"
                        iconProps={{
                            size: 18,
                        }}
                        onIconClick={() =>
                            setIsPasswordVisible(!isPasswordVisible)
                        }
                    />
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <CheckboxField
                            name="remember"
                            label={t("auth.login.rememberMe")}
                        />
                        <Link
                            href={"#"}
                            className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                            {t("auth.login.forgotPassword")}
                        </Link>
                    </div>
                    <div className="mt-4">
                        <Button
                            label={t("auth.login.button")}
                            variant="primary"
                            className="w-full"
                            type="submit"
                            isLoading={submitting}
                        />
                    </div>
                </Form>
            </Formik>
            <Divider label={t("auth.login.or")} />
            <div className="grid grid-cols-1 gap-2">
                <Button
                    label={t("auth.login.socialLogin.google")}
                    variant="outline"
                    icon={GoogleIcon}
                    className=""
                />
                <Button
                    label={t("auth.login.socialLogin.facebook")}
                    variant="outline"
                    icon={FacebookIcon}
                    iconProps={{
                        size: 20,
                        className: "text-blue-600",
                    }}
                />
            </div>
            <p className="text-center text-xs sm:text-sm text-gray-600 mt-5">
                {t("auth.login.noAccount.text")}
                <span
                    className="text-blue-600 hover:text-blue-700 font-medium ml-1 cursor-pointer"
                    onClick={onChangeView}
                >
                    {t("auth.login.noAccount.action")}
                </span>
            </p>
            <div className="mt-4 sm:mt-6 text-center text-xs text-gray-500 lg:block">
                <p> {t("auth.login.footerNote")}</p>
            </div>
        </div>
    );
}
