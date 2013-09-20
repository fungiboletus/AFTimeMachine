var ElementsSimilarity = {

	equal: function(nodeA, nodeB) {
		return this.identity(nodeA) == this.identity(nodeB);
	},

	identity: function(node) {
		// The identity need a node
		if (!node || !node.tagName) {
			return undefined;
		}

		var generatedID = node.tagName;

		if (node.hasAttribute("id")) {
			generatedID += "-"+node.getAttribute("id");
		}

		if (node.hasAttribute("name")) {
			generatedID += "-"+node.getAttribute("name");
		}

		// className is ignored because it can change within the context
		// (I don't known if it's a good idea)

		// Get children tagnames
		var dicoChildren = {},
			maxNb = -1,
			maxKey = undefined;

		for (var i = 0, children = node.childNodes, l = children.length; i < l; ++i) {
			var child = children[i],
				tagName = child.tagName ? child.tagName : "TEXT",
				cpt = 1;

			if (dicoChildren.hasOwnProperty(tagName)) {
				cpt = ++dicoChildren[tagName];
			} else {
				dicoChildren[tagName] = cpt;
			}

			if (cpt > maxNb) {
				maxNb = cpt;
				maxKey = tagName;
			}
		}

		// Append the most frequent child if it exist
		if (maxKey) {
			generatedID += "-"+maxKey;
		}

		return generatedID.toUpperCase();
	}
};
