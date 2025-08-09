export async function loadLocales(locale: string) {
    const files = ["auth", "app", "form", "validate"];

    const messages = await Promise.all(
        files.map((name) =>
            import(`../app/locales/${locale}/${name}.json`).then(
                (mod) => mod.default
            )
        )
    );

    return files.reduce((acc, name, index) => {
        acc[name] = messages[index];
        return acc;
    }, {} as Record<string, any>);
}
