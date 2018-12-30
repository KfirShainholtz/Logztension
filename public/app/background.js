var baseUrl = 'http://k8s-1-prod-us-east-1.internal.logz.io:30004';
var triggeredAlertsUrl = `${baseUrl}/alerts/triggered-alerts`;

var requestData = JSON.stringify({
    "from": 0,
    "size": 5,
    "severities": [
        "HIGH"
    ],
    "sortBy": "DATE",
    "sortOrder": "ASC"
});

function handleTriggeredAlerts() {
    if (this.readyState === XMLHttpRequest.DONE) {
        if(this.status === 200) {
            var response = JSON.parse(this.response);
            chrome.storage.sync.set({'triggeredAlerts': response});
            chrome.browserAction.setBadgeText({"text": String(response.results.length)});
            chrome.browserAction.setBadgeBackgroundColor({color: 'red'});
        }
        setTimeout(() => getLatestTriggeredAlerts(), 2000);
    }
}

function getLatestTriggeredAlerts() {
    console.log('fetch triggered alerts');
    var xhr = new XMLHttpRequest();
    xhr.open('POST', triggeredAlertsUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-API-TOKEN', '8c76f241-84f0-4a82-b552-60a80ebb9a19');
    xhr.onreadystatechange = handleTriggeredAlerts;
    xhr.send(requestData);
}

getLatestTriggeredAlerts();
