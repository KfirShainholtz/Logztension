function injectDocsIframe() {
    var iframe = document.createElement('iframe');
    iframe.style.background = "white";
    iframe.style.height = "100%";
    iframe.style.width = "320px";
    iframe.style.position = "fixed";
    iframe.style.top = "0px";
    iframe.style.right = "0px";
    iframe.style.zIndex = "9000000000000000000";
    iframe.frameBorder = "none";
    iframe.style.display = "none";
    iframe.src = "https://docs.logz.io/";

    document.body.appendChild(iframe);
}

injectDocsIframe();
