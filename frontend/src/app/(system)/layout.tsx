import SystemLayout from "@/layouts/SystemLayout";
import { LayoutProps } from "@/types/app";

interface Props extends LayoutProps {}

export default function AuthLayoutWrapper({
    children,
}: Props) {
    return <SystemLayout>{children}</SystemLayout>;
}
