var UTIL_KEYS = {};


UTIL_KEYS.REQUEST_FILTER = {
	urls: ["<all_urls>"],
	types: ["script", "stylesheet", "image"]
};
UTIL_KEYS.REQUEST_OPTIONS = ["blocking", "responseHeaders"];
UTIL_KEYS.SAVED_URLS = "SAVED_URLS";
UTIL_KEYS.EXCLUDED_URLS = ["chrome://", "chrome-devtools://"];


UTIL_KEYS.CACHECONTROL_TYPE = {
	CACHE: "cache",
	NOSTORE: "nostore",
	IGNORE: "default"

};



var chromeGetCurrentTab = function(callback) {
	chrome.tabs.query({
		active: true,
		url: "*://*/*"
	}, function(tabs) {
		callback(tabs[0]);
	});
};