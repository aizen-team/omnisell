import { Metadata } from "next";
import { useTranslations } from "next-intl";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Trang không tồn tại",
};

export default function NotFound() {
    const t = useTranslations();
    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="text-center p-10">
                <p className="text-base font-semibold text-indigo-600">404</p>
                <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
                    {t("app.systemPages.notFound.title")}
                </h1>
                <p className="mt-6 text-lg text-pretty text-gray-500 sm:text-xl/8">
                    Rất tiếc, chúng tôi không tìm thấy trang bạn đang tìm kiếm.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link
                        href="/"
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Về trang chủ
                    </Link>
                </div>
            </div>
        </div>
    );
}
