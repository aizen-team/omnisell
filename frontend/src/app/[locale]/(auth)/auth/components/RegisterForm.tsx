import { Button } from "@/components/elements";
import { TextField } from "@/components/elements/fields";
import { Divider } from "@/components/shared";
import { EyeIcon, EyeSlashIcon, GoogleIcon } from "@/components/shared/icons";
import { User } from "@/types/auth";
import { Form, Formik, FormikHelpers } from "formik";
import { useTranslations } from "next-intl";
import { useState } from "react";
import * as Yup from "yup";

interface Props {
    onChangeView: () => void;
}

interface FormValues
    extends Pick<User, "email" | "password" | "first_name" | "last_name"> {}

export default function RegisterForm({ onChangeView }: Props) {
    const t = useTranslations();
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    const initialRegisterValues: FormValues = {
        email: "",
        password: "",
        first_name: "",
        last_name: "",
    };

    const validated = Yup.object().shape({
        email: Yup.string()
            .email(t("validate.fields.email.invalid"))
            .required(t("validate.fields.email.required")),
        password: Yup.string()
            .min(6, t("validate.common.min", { min: 6 }))
            .required(t("validate.fields.password.required")),
        first_name: Yup.string().nullable(),
        last_name: Yup.string().nullable(),
    });

    const handleSubmit = (
        values: FormValues,
        { setErrors }: FormikHelpers<FormValues>
    ) => {};

    return (
        <div className="register-container">
            <div className="mb-5">
                <h1 className="form-title text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                    {t("auth.register.title")}
                </h1>
                <p className="form-subtitle text-gray-600 text-sm sm:text-base">
                    {t("auth.register.description")}
                </p>
            </div>
            <Formik
                initialValues={initialRegisterValues}
                validationSchema={validated}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-2 sm:gap-3">
                        <TextField
                            name="first_name"
                            label={t("form.fields.first_name.label")}
                            placeholder={t(
                                "form.fields.first_name.placeholder"
                            )}
                        />
                        <TextField
                            name="last_name"
                            label={t("form.fields.last_name.label")}
                            placeholder={t("form.fields.last_name.placeholder")}
                        />
                    </div>
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
                    <Button
                        label={t("auth.register.button")}
                        className="w-full"
                        type="submit"
                    />
                </Form>
            </Formik>
            <Divider label={t("auth.register.or")} />
            <Button
                label={t("auth.register.socialRegister.google")}
                icon={GoogleIcon}
                variant="outline"
                className="w-full"
            />
            <p className="text-center text-xs sm:text-sm text-gray-600 mt-3">
                {t("auth.register.alreadyHaveAccount.text")}
                <span
                    className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer ml-1"
                    onClick={onChangeView}
                >
                    {t("auth.register.alreadyHaveAccount.action")}
                </span>
            </p>
        </div>
    );
}
