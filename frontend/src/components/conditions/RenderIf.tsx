import { FC, ReactNode } from "react";

interface Props {
    condition: boolean;
    children: ReactNode;
    fallback?: ReactNode;
}

const RenderIf: FC<Props> = ({
    condition,
    children,
    fallback = null,
}) => (condition ? children : fallback);

export default RenderIf;
