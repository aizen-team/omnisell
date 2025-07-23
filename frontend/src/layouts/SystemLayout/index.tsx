import { LayoutProps } from "@/types/app";

interface Props extends LayoutProps {}

export default function SystemLayout({ children }: Props) {
    return (
        <div
            id="system-layout"
            className="flex flex-col items-center justify-center h-screen bg-gray-100"
        >
            <h1>System layout</h1>
            <main>{children}</main>
        </div>
    );
}
