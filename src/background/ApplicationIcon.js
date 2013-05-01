var setApplicationIcon = function() {

	chromeTabs.reload(function() {

		for (var i = chromeTabs.list().length - 1; i >= 0; i--) {

			var tab = chromeTabs.list()[i];
			var tabId = tab.id;
			//var tab = chromeTabs.findById(tabId);

			if (UTIL_KEYS.EXCLUDED_URLS.filter(function(p) {
				return tab.url.indexOf(p) > -1;
			}).length == 0) {
				//console.log("Showing Icon", tab.id, tab.url);
				chrome.pageAction.show(tabId);
				//return;
				var enabled = isCachingEnabledOnTab(tabId);
				var iconPath = enabled == true ? "snapshots/cache_black.png" : "snapshots/cache_fade.png";
				chrome.pageAction.setIcon({
					tabId: tabId,
					path: iconPath
				});

			}
		};
	});
};

var isCachingEnabledOnTab = function(tabId) {
	var tab = chromeTabs.findById(tabId);
	if (tab != null) {
		var host = savedHosts.findUrlMatch(tab.url);
		if (host != null) {
			return true;
		}
	}
	return false;
};