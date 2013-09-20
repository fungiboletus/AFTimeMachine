function HTML2DOM(html) {
	'use strict';
	
	var namelessDiv = document.createElement("div");

	namelessDiv.innerHTML = html;

	if (namelessDiv.hasChildNodes()) {
		if (namelessDiv.childNodes.length > 1) {
			return namelessDiv;
		}
		else {
			return namelessDiv.firstChild;
		}
	}
}