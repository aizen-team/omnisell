import AuthLayout from "@/layouts/AuthLayout";
import { LayoutProps } from "@/types/app";

interface Props extends LayoutProps {}

export default function AuthLayoutWrapper({
    children,
}: Props) {
    return <AuthLayout>{children}</AuthLayout>;
}
