export class CookieService{

    public static addCookie(key:string, value:string){
        document.cookie = key+"="+value;
    }

    public static getCookie(key:string):string{
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