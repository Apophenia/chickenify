var toggleButtonStatus = function(cb) {
    chrome.storage.local.get("isEnabled", function(buttonStatus) {
	chrome.storage.local.set({"isEnabled": !buttonStatus.isEnabled}, cb);
	});
};

chrome.browserAction.onClicked.addListener(function () {
    toggleButtonStatus(chrome.tabs.reload);
});

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
	if (message.name === "isEnabled") {
	    chrome.storage.local.get(function(buttonStatus) {
		sendResponse(buttonStatus);
	    });
	}
	return true;
    }
);
