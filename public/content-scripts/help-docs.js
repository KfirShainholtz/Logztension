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

setTimeout(() => {
    hashHandler();
}, 2000);

function hashHandler() {
    console.log('The hash has changed!', window.location);
    if(window.location.href.includes('live-tail')) {
        iframe.src = "https://docs.logz.io/user-guide/live-tail/";
    } else if(window.location.href.includes('kibana')) {
        iframe.src = "https://docs.logz.io/user-guide/kibana/";
    } else if(window.location.href.includes('alert-definitions')) {
        iframe.src = "https://docs.logz.io/user-guide/alerts/";
    } else if(window.location.href.includes('data-sources')) {
        iframe.src = "https://docs.logz.io/user-guide/log-shipping/";
    } else if(window.location.href.includes('insights')) {
        iframe.src = "https://docs.logz.io/user-guide/insights/";
    }
}

window.addEventListener('hashchange', hashHandler, false);

// if (message.data == "setAlarm") {
//     chrome.alarms.create({delayInMinutes: 5})
// }
// else if (message.data == “runLogic”) {
//     chrome.tabs.executeScript({file: 'logic.js'});
// } else if (message.data == “changeColor”) {
//     chrome.tabs.executeScript(
//         {code: 'document.body.style.backgroundColor="orange"'});
// };
