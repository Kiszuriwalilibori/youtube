const FALLBACK_URL = "https://kiszuriwalilibori.github.io/IE/";

function breakWhenInternetExplorer(): void {
    const ua = window.navigator.userAgent;
    const isIE = /MSIE|Trident/.test(ua);

    if (isIE) {
        window.location.href = FALLBACK_URL;
    }
}
export default breakWhenInternetExplorer;
