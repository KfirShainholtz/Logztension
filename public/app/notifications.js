chrome.storage.onChanged.addListener(function({ triggeredAlerts: { newValue: { results }} }, namespace) {
    console.log('chrome.storage.onChanged: ', results, namespace);

    if (results) {
        results.map((alert) => {
            notifyUser(alert);
        });
    }
});

chrome.notifications.onClicked.addListener((notificationId) => {
    // TODO:: navigate to discover
    console.log('chrome.notifications.onClicked: ', notificationId);
    chrome.notifications.clear(notificationId || '', () => {
        console.log('chrome.notifications.clear: ', notificationId);
    });
});

function genNotificationId() {
    return 'triggeredAlerts' + Date.now();
}

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

async function notifyUser(alert) {
    var opt = {
        type: "basic",
        title: `${alert.severity} Severity Alert`,
        message: `${alert.name}`,
        iconUrl: "logzio.logo.128.png",
    }

    // await clearAll();

    chrome.notifications.create(`triggeredAlerts${alert.alertId}`, opt, (...args) => {
        console.log("notification call back:", ...args);
    });
}
