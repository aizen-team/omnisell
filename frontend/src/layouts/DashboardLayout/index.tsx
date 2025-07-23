import { LayoutProps } from "@/types/app";

interface Props extends LayoutProps {}

export default function DashboardLayout({
    children,
}: Props) {
    return (
        <div
            id="dashboard-layout"
            className="flex flex-col items-center justify-center h-screen bg-gray-100"
        >
            <div className="">
                <h1>Dashboard layout</h1>
                <main className="dashboard-container">{children}</main>
            </div>
        </div>
    );
}
