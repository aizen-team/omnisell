import RootLayout from "@/layouts/RootLayout/RootLayout";
import { LayoutProps } from "@/types/app";

interface Props extends LayoutProps {}

export default function AppLayout({ children }: Props) {
    return <RootLayout>{children}</RootLayout>;
}
