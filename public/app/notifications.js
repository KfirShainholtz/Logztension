const trigeredAlertDrillDown = "https://app.logz.io/#/dashboard/kibana/discover?_a=(columns:!(message),filters:!(),query:(language:lucene,query:'type:%20auto-scaler%20AND%20%22error%20occurred%20while%20calculating%20execution%20for%20autoScalingGroup%22%20AND%20NOT%20%22io.logz.auto.scaler.exception.ServersRateNotFound%22'),sort:!('@timestamp',desc))&_g=(refreshInterval:(display:Off,section:0,value:0),time:(from:'2018-12-26T20:39:52.925Z',mode:absolute,to:'2018-12-29T20:39:52.925Z'))&accountIds=16987&accountIds=300";

chrome.storage.onChanged.addListener(function({ triggeredAlerts }, namespace) {
    console.log('chrome.storage.onChanged: ', triggeredAlerts, namespace);

    if (triggeredAlerts.newValue.results) {
        triggeredAlerts.newValue.results.map((triggeredAlert) => {
            notifyUser(triggeredAlert);
        });
    }
});

chrome.notifications.onClicked.addListener((notificationId) => {
    // TODO:: navigate to discover
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
        iconUrl: "logzio.logo.128.png",
    }

    await clearAll();

    chrome.notifications.create(`triggeredAlerts${triggeredAlert.alertId}`, opt, (...args) => {
        console.log("notification call back:", ...args);
    });
}
