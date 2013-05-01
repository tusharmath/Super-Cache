

var SuperCacheLiveTabs = function() {

	var _tabs;

	var reloadTabs = function(callback) {
		chrome.tabs.query({}, function(tabs) {
			_tabs = tabs;
			if (callback)
				callback();
		});
	};

	var findTabById = function(id) {
		return _tabs.filter(function (p) { return p.id == id; })[0];
	};

	return {
		reload : reloadTabs,
		findById : findTabById,
		list : function() {
			return _tabs;
		}
	};
};


