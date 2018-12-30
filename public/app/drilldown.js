/* global chrome */

const contextMenuId = "scrapeIps";
const drilldownUrlTemplate = (ip) => `https://app.logz.io/#/dashboard/kibana/dashboard/2e831c30-0c42-11e9-9294-97c78f8e487b?_g=()&switchToAccountId=16987&drilldown=${ip}`;

const contextMenuItem = {
    "id": contextMenuId,
    "title": "Open in Logz.io dashboard",
    "contexts": ["selection"]
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener((data) => {
    if (data.menuItemId === contextMenuId && data.selectionText) {
        if (IsIPaddress(data.selectionText)) {
            drilldown(data.selectionText);
        }
    }
});

const drilldown = (address) => {
    const drilldownUrl = drilldownUrlTemplate(address);
    chrome.tabs.create({url: drilldownUrl});
};

const IsIPaddress = (address) => {
    return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(address);
};
