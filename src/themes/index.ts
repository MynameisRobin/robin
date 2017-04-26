export async function getTheme(theme?: string) {
    return new Promise((resolve : (locale) => void, reject : (reason : any) => void) => {
        switch (theme) {
            case "green":
                require.ensure([], () => {
                    require("./green.less");
                }, "green.css");
                break;
            default:
            case "blue":
                require.ensure([], () => {
                    require("./default.less");
                }, "default.css");
                break;
        }
        resolve(true);
    });
}
