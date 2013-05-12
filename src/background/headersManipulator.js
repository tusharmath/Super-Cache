var getCachingType = function(response) {
	var tab = chromeTabs.findById(response.tabId);
	if (tab !== undefined) {
		var savedHost = savedHosts.findUrlMatch(tab.url);
		if (savedHost !== null) {
			return savedHost.filter[response.type];

		}
	}
	return false;
};

var headerManipulator = function(responseHeaders) {


	var _update = function(key, valueArray) {
		valueArray = valueArray instanceof Array ? valueArray : [valueArray];

		var headers = responseHeaders;
		var value = valueArray.join(", ");
		var cacheControlHeader = headers.filter(function(p) {
			return p.name == key;
		})[0];

		if (cacheControlHeader !== undefined) {


			cacheControlHeader.value = value;
			console.log("#", cacheControlHeader);
		} else {
			var h = {
				name: key,
				value: value
			};
			console.log("+", h);
			headers.push(h);

		}

		return headers;


	};


	var _remove = function(key) {
		var headers = responseHeaders;
		return headers.filter(function(p) {

			if (p.name == key) {
				console.log("-", p);
				return false;
			}
			return true;
		});
	};

	var _getHeaders = function() {
		return responseHeaders;
	};

	return {
		updateHeader: function(key, valueArray) {

			var headers = _update(key, valueArray);
			return new headerManipulator(headers);
		},
		removeHeader: function(keys) {
			var headers = _remove(keys);
			return new headerManipulator(headers);
		},
		getHeaders: _getHeaders

	};

};



var HeaderKeys = {
	CACHE_CONTROL: "Cache-Control",
	EXPIRES: "Expires",
	PRAGMA: "Pragma",
	LASTMODIFIED: "Last-Modified",
	VARY: "Vary"
};

var HeaderValues = {

	PAST_DATE: "Sat, 01 Jan 2000 00:00:00 GMT",
	FUTURE_DATE: "Sat, 01 Jan 2100 00:00:00 GMT",

	HIGH_MAXAGE: "max-age=31492260",
	ZERO_MAXAGE: "max-age=0",

	NOSTORE: "no-store",
	NOCACHE: "no-cache",
	PRIVATE: "private",
	REVALIDATE: "must-revalidate"



};

var onHeadersReceived = function(response) {

	var cachingType = getCachingType(response);
	var responseHeaders = response.responseHeaders;
	var hm = new headerManipulator(responseHeaders);

	if (cachingType != UTIL_KEYS.CACHECONTROL_TYPE.IGNORE && cachingType !== false) {
		console.log("Caching Type:", cachingType);
		responseLog(response.type, response.url);
	}


	switch (cachingType) {
		case UTIL_KEYS.CACHECONTROL_TYPE.CACHE:

			responseHeaders = hm.updateHeader(HeaderKeys.CACHE_CONTROL, [HeaderValues.HIGH_MAXAGE])
				//.updateHeader(HeaderKeys.EXPIRES, HeaderValues.FUTURE_DATE)
				//.updateHeader("ETag", "tushar.html")
				.getHeaders();

			//responseHeaders = removeHeaders(responseHeaders, HeaderKeys.VARY);

			break;


		case UTIL_KEYS.CACHECONTROL_TYPE.NOSTORE:

			//HeaderValues.NOCACHE, HeaderValues.NOSTORE, HeaderValues.REVALIDATE]
			responseHeaders = hm.updateHeader(HeaderKeys.CACHE_CONTROL, HeaderValues.ZERO_MAXAGE)
			//.updateHeader(HeaderKeys.PRAGMA, [HeaderValues.NOCACHE])
			.getHeaders();

			break;

		default:
			break;


	}

	return {
		responseHeaders: responseHeaders
	};
};

var responseLog = function(type, url) {
	console.log(type, url);
};