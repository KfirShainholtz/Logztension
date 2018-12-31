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
    iframe.setAttribute('id', 'help-docs');

    document.body.appendChild(iframe);
}

injectDocsIframe();

// function hashHandler() {
//     console.log('The hash has changed!', window.location);
// }
//
// window.addEventListener('hashchange', hashHandler, false);

// if (message.data == "setAlarm") {
//     chrome.alarms.create({delayInMinutes: 5})
// }
// else if (message.data == “runLogic”) {
//     chrome.tabs.executeScript({file: 'logic.js'});
// } else if (message.data == “changeColor”) {
//     chrome.tabs.executeScript(
//         {code: 'document.body.style.backgroundColor="orange"'});
// };
