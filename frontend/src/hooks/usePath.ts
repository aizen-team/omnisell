import { usePathname } from "next/navigation";

const usePath = () => {
    const pathname = usePathname();

    const isPathActive = (href: string) => {
        return pathname === href;
    };

    return { isPathActive };
};

export default usePath;
