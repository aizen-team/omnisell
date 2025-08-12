import RootLayout from "@/layouts/RootLayout";
import { LayoutProps } from "@/types/app";
import { Metadata } from "next";

interface Props extends LayoutProps {
    params: { locale: string };
}

export const metadata: Metadata = {
    title: "Omnisel",
};

export default function AppLayout({ children, params }: Props) {
    return <RootLayout params={params}>{children}</RootLayout>;
}
