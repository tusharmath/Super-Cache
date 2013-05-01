var chrome = chrome == null ? {} : chrome;

var savedHosts = new HostsDb();
savedHosts.reload();

var chromeTabs = new SuperCacheLiveTabs();
//chromeTabs.list() = {id:{}, url:{}}

chromeTabs.reload(setApplicationIcon);

chrome.tabs.onActivated.addListener(setApplicationIcon);

chrome.tabs.onUpdated.addListener(setApplicationIcon);

chrome.tabs.onRemoved.addListener(function() {
	chromeTabs.reload(null);
});

chrome.webRequest.onHeadersReceived.addListener(onHeadersReceived, UTIL_KEYS.REQUEST_FILTER, UTIL_KEYS.REQUEST_OPTIONS);
