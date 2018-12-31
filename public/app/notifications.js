/* global chrome */

const trigeredAlertDrillDown = "https://app.logz.io/#/dashboard/kibana/discover?_a=(columns:!(message),filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:%5Blogz-uxidmgzqmlkpusfvzsvaidonfurcwiyk-%5DYYMMDD,key:logLevel,negate:!f,type:phrase,value:ERROR),query:(match:(logLevel:(query:ERROR,type:phrase))))),query:(language:lucene,query:'%22Failed%20to%20create%20lead%20in%20marketo%20lead%20db%22%20AND%20-%22_mkto_trk%22'),sort:!('@timestamp',desc))&_g=(refreshInterval:(display:Off,section:0,value:0),time:(from:'2018-12-26T07:38:00.377Z',mode:absolute,to:'2018-12-31T07:38:00.377Z'))&accountIds=16987";

chrome.storage.onChanged.addListener(function({ triggeredAlerts }, namespace) {
    console.log('chrome.storage.onChanged: ', triggeredAlerts, namespace);

    if (triggeredAlerts && triggeredAlerts.newValue.results) {
        triggeredAlerts.newValue.results.map((triggeredAlert) => {
            notifyUser(triggeredAlert);
        });
    }
});

chrome.notifications.onClicked.addListener((notificationId) => {
    console.log('chrome.notifications.onClicked: ', notificationId);
    chrome.notifications.clear(notificationId || '', () => {
        console.log('chrome.notifications.clear: ', notificationId);
    });

    chrome.tabs.create({ url: trigeredAlertDrillDown });
});

function clearAll() {
    return new Promise((resolve) => {
        chrome.notifications.getAll((activeNotifications) => {
            console.log('chrome.notifications.getAll: ', activeNotifications);

            Promise.all( Object.keys(activeNotifications)
                .map((notificationId) => {
                    new Promise((resolveClear) => {
                        chrome.notifications.clear(notificationId || '', () => {
                            console.log('chrome.notifications.clear: ', notificationId);
                            resolveClear();
                        });
                    });
                })
            ).then(() => {
                resolve();
            });
        });
    });
}

async function notifyUser(triggeredAlert) {
    var opt = {
        type: "basic",
        title: `${triggeredAlert.severity} Severity Alert`,
        message: `${triggeredAlert.name}`,
        iconUrl: "alerts_events.png",
    }

    await clearAll();

    chrome.notifications.create(`triggeredAlerts${triggeredAlert.alertId}`, opt, (...args) => {
        console.log("notification call back:", ...args);
    });
}
