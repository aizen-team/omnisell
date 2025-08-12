import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { loadLocales } from "@/i18n/loadLocales";

export default getRequestConfig(async ({ requestLocale }) => {
    console.log({
        message: "getRequestConfig",
    });
    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested)
        ? requested
        : routing.defaultLocale;
    const locales = await loadLocales(locale);

    return {
        locale,
        messages: locales,
    };
});
