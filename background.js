chrome.browserAction.onClicked.addListener(
    function() {
	chrome.storage.local.get("isEnabled", function(buttonStatus) {
	    if (buttonStatus.isEnabled === true) {
		chrome.storage.local.set({"isEnabled": false}, function() {
		});
	    }
	    else {
		chrome.storage.local.set({"isEnabled": true}, function() {
		});
	    }
	});
	chrome.tabs.reload();
    }
);

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
