import { useLocale } from "next-intl";

export const useLocalizedHref = () => {
    const locale = useLocale();

    const getHref = (href: string) => {
        return `/${locale}${href}`;
    };

    return { getHref };
};
