var HostsDb = function() {
	var _hosts;
	var stg = chrome.storage.sync;

	var findHostsWithUrl = function(url) {
		var host = _hosts.filter(function(p) {
			return url.indexOf(p.host) > -1;
		});

		return host.length == 0 ? null : host[0];
	};

	var commitData = function(data, callback) {
		var obj = {};
		obj[UTIL_KEYS.SAVED_URLS] = JSON.stringify(data);
		stg.set(obj, function() {
			getDataSet(callback);
		});
	};

	var getDataSet = function(callback) {
		stg.get(UTIL_KEYS.SAVED_URLS, function(data) {
			var savedHosts = JSON.parse(data[UTIL_KEYS.SAVED_URLS] == null ? "[]" : data[UTIL_KEYS.SAVED_URLS]);
			_hosts = savedHosts;
			if (callback) callback(savedHosts);
		});
	};

	var addHost = function(item, callback) {
		chromeGetCurrentTab(function(tab) {

			var shouldAdd = function(filter) {

				for (var i in filter) {
					if (filter[i] != UTIL_KEYS.CACHECONTROL_TYPE.IGNORE) {
						return true;
					}
				}

				return false;
			};

			var hostOnly = tab.url.replace(/(http|https)\:\/\//g, "").replace(/\/.*/g, "");

			if (shouldAdd(item)) {

				var obj = {
					host: hostOnly,
					filter: item
				};

				getDataSet(function(data) {
					//Check if url is already present
					if (data.filter(function(p) {
						return p.host == obj.host;
					}).length == 0) {
						data.push(obj);

					} else {
						data.filter(function(p) {
							return p.host == obj.host;
						})[0].filter = obj.filter;
					}
					commitData(data, callback);

				});

			} else {
				removeFromDataSet(hostOnly, callback);
			}
		});

	};

	var removeFromDataSet = function(host, callback) {
		getDataSet(function(data) {
			var filtered = data.filter(function(item) {
				return item.host != host;
			});
			commitData(filtered, callback);
		});
	};

	return {
		findUrlMatch: findHostsWithUrl,
		add: addHost,
		remove: removeFromDataSet,
		reload: getDataSet
	};
};

//savedHosts.list() = {host:{}, type:["stylesheet", "script", "image"], override:["no-cache", "max-age"]}