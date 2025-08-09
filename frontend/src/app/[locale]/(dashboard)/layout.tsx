import DashboardLayout from "@/layouts/DashboardLayout";
import { LayoutProps } from "@/types/app";

interface Props extends LayoutProps {}

export default function AuthLayoutWrapper({
    children,
}: Props) {
    return <DashboardLayout>{children}</DashboardLayout>;
}
