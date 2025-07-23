import MarketingAside from "./components/MarketingAside";
import { LayoutProps } from "@/types/app";

interface Props extends LayoutProps {}

export default function AuthLayout({ children }: Props) {
    return (
        <div
            id="auth-layout"
            className="h-screen overflow-hidden"
        >
            <main className="auth-container h-full flex">
                <div className="auth-content flex-1">
                    {children}
                </div>
                <div className="auth-aside hidden lg:block lg:w-1/2">
                    <MarketingAside />
                </div>
            </main>
        </div>
    );
}
