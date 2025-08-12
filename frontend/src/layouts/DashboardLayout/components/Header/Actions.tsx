import RenderIf from "@/components/conditions/RenderIf";
import { Button } from "@/components/elements";
import { PlusIcon } from "@/components/shared/icons";
import { ROUTES } from "@/constants/routes";
import { useLocalizedHref } from "@/hooks";
import usePath from "@/hooks/usePath";
import { FC } from "react";

const Actions: FC = () => {
    const { isPathActive } = usePath();
    const { getHref } = useLocalizedHref();

    return (
        <div className="actions-container">
            <RenderIf condition={isPathActive(getHref(ROUTES.DASHBOARD))}>
                <Button label="Kết nối kênh mới" icon={PlusIcon} />
            </RenderIf>
            <RenderIf condition={isPathActive(getHref(ROUTES.ORDERS))}>
                <Button label="Xuất file" variant="outline" />
            </RenderIf>
            <RenderIf condition={isPathActive(getHref(ROUTES.PRODUCTS))}>
                <Button label="Thêm sản phẩm" icon={PlusIcon} />
            </RenderIf>
        </div>
    );
};

export default Actions;
