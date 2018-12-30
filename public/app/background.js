var baseUrl = 'http://k8s-1-prod-us-east-1.internal.logz.io:30004';
var triggeredAlertsUrl = `${baseUrl}/alerts/triggered-alerts`;

var requestData = JSON.stringify({
    "from": 0,
    "size": 1,
    "severities": [
        "HIGH"
    ],
    "sortBy": "DATE",
    "sortOrder": "DESC"
});

function updateBadge(triggeredAlertsResponse) {
    triggeredAlertsResponse.mish = Date.now();
    chrome.storage.sync.set({'triggeredAlerts': triggeredAlertsResponse});
    chrome.browserAction.setBadgeText({"text": String(triggeredAlertsResponse.results.length)});
    chrome.browserAction.setBadgeBackgroundColor({color: 'red'});
}

function handleTriggeredAlerts() {
    if (this.readyState === XMLHttpRequest.DONE) {
        if(this.status === 200) {
            var response = JSON.parse(this.response);
            updateBadge(response);
        }
        setTimeout(() => getLatestTriggeredAlerts(), 5000);
    }
}

function getLatestTriggeredAlerts() {
    console.log('fetch triggered alerts');
    var xhr = new XMLHttpRequest();
    xhr.open('POST', triggeredAlertsUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-API-TOKEN', 'b5c906c8-7c72-4364-b5a1-0ed5c74ce185');
    xhr.onreadystatechange = handleTriggeredAlerts;
    xhr.send(requestData);
}

getLatestTriggeredAlerts();
