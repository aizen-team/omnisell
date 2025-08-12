import RenderIf from "@/components/conditions/RenderIf";
import { ROUTES } from "@/constants/routes";
import { useLocalizedHref } from "@/hooks";
import usePath from "@/hooks/usePath";
import { FC } from "react";

const PageHeader: FC = () => {
    const { isPathActive } = usePath();
    const { getHref } = useLocalizedHref();

    return (
        <div className="page-header">
            <RenderIf condition={isPathActive(getHref(ROUTES.DASHBOARD))}>
                <div className="flex items-end">
                    <h2 className="text-2xl font-semibold text-gray-900">
                        Tổng quan
                    </h2>
                    <span className="text-gray-500 ml-4">
                        Thứ 3, 17 tháng 6, 2025
                    </span>
                </div>
            </RenderIf>
            <RenderIf condition={isPathActive(getHref(ROUTES.ORDERS))}>
                <div className="flex items-end">
                    <h2 className="text-2xl font-semibold text-gray-900">
                        Quản lý đơn hàng
                    </h2>
                    <span className="text-gray-500 ml-4">Tổng: 1,234 đơn</span>
                </div>
            </RenderIf>
            <RenderIf condition={isPathActive(getHref(ROUTES.PRODUCTS))}>
                <div className="flex items-end">
                    <h2 className="text-2xl font-semibold text-gray-900">
                        Quản lý sản phẩm
                    </h2>
                    <span className="text-gray-500 ml-4">234 sản phẩm</span>
                </div>
            </RenderIf>
        </div>
    );
};

export default PageHeader;
