export class CookieHandler {

    public static addCookie(key: string, value: string) {
        document.cookie = key + "=" + value;
    }

    public static getCookie(key: string): string {
        let value = CookieHandler.readCookie(key);
        if (value) {
            return value;
        } else {
            throw new Error("Cookie for " + key + " was not set.");
        }
    }

    public static isCookiePresent(key: string): boolean {
        let value = CookieHandler.readCookie(key);
        return (value && value.length > 0);
    }

    private static readCookie(key: string): string {
        const keyLength = (key.length + 1);
        let value = document.cookie.split(";")
                .map(pair => pair.trim())
                .filter(cookie => {
                    return cookie.substring(0, keyLength) === `${key}=`;
                })
                .map(cookie => {
                    return decodeURIComponent(cookie.substring(keyLength));
                })[0] || null;
        return value;
    }
}