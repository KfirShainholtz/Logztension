const contextMenuId = "scrapeIps";
const drilldownUrlTemplate = (apiToken, ip) => `https://app.logz.io/#/dashboard/security/research/dashboard/b0b999d0-6d8d-11e8-a6da-41e4bf1b98f8?drilldown=${ip}`

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
    chrome.tabs.create({ url: drilldownUrl });
};

const IsIPaddress = (address) => {
    return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(address);
};
