function translate(inputText) {
    inputText = inputText.split(" ");
    for (i = 0; i < inputText.length; ++i) {
	inputText[i] = inputText[i].replace(/[a-z]+/, "chicken");
        if (/[A-Z]/.test(inputText[i].charAt(0))) {
	    inputText[i] = inputText[i].replace(/([A-Z)|[a-z])+/, "Chicken");
	}
    }
    inputText = inputText.join(" ");
    return inputText;
}


function chickenify(node) {
    var treeWalker = document.createTreeWalker(node,
					       NodeFilter.SHOW_TEXT,
					       null,
					       false);
    while(treeWalker.nextNode()) {
	var current = treeWalker.currentNode;
	current.textContent = translate(current.textContent);
    }
}

chrome.runtime.sendMessage({name: "isEnabled"}, function(response) {
    if (response.isEnabled === true) {
	chickenify(document.body);
	document.body.addEventListener('DOMNodeInserted', function(event) {
	    chickenify(event.target);
	});
    }
  });
