import { FC } from "react";
import DashboardStatsCard, {
    DashboardStatsCardProps,
} from "./DashboardStatsCard";

interface Props {
    items: DashboardStatsCardProps[];
}

const DashboardStats: FC<Props> = ({ items }) => {
    return (
        <>
            {items.map((item, idx) => (
                <DashboardStatsCard key={idx} {...item} delay={idx * 0.15} />
            ))}
        </>
    );
};

export default DashboardStats;
