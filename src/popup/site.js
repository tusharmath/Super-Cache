var elements = document.getElementsByClassName("selectable");
var bg = chrome.extension.getBackgroundPage();

var getPopUpData = function() {
	var values = {};
	for (var i = 0; i < elements.length; i++) {
		var e = elements[i];
		var key = e.attributes["data-bind"].value;
		values[key] = e.value;
	}
	return values;
};

var setPopUpData = function() {
	bg.chromeGetCurrentTab(function(tab) {
		var item = bg.savedHosts.findUrlMatch(tab.url);

		for (var i = 0; i < elements.length; i++) {

			var e = elements[i];
			e.selectedIndex = 0;

			if (item != null) {
				var selectedValue = item.filter[e.attributes["data-bind"].nodeValue];
				for (var j in e.options) {
					if (e.options[j].value == selectedValue) {
						e.selectedIndex = j;
						break;
					}
				};

			}
		}

	});
};

setPopUpData();

var onSaveButtonClick = function() {
	var data = getPopUpData();
	bg.savedHosts.add(data, savedCallback);

};



var savedCallback = function() {

	//window.close();
	debugger

	window.close();
	bg.setApplicationIcon();

}
var saveButton = document.getElementById("saveButton");
saveButton.addEventListener("click", onSaveButtonClick);

chrome.tabs.onActivated.addListener(setPopUpData);

chrome.tabs.onUpdated.addListener(setPopUpData);