import { LayoutProps } from "@/types/app";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Đăng nhập | Omnisel",
};

interface Props extends LayoutProps {}

export default function LoginLayout({ children }: Props) {
    return <>{children}</>;
}
