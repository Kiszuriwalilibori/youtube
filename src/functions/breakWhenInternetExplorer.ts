function breakWhenInternetExplorer(): void {
  const ua = window.navigator.userAgent;
  const isIE = /MSIE|Trident/.test(ua);

  if (isIE) {
    window.location.href = "https://kiszuriwalilibori.github.io/IE/";
  }
}
export default breakWhenInternetExplorer;
