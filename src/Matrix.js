function Matrix(nodeA, nodeB) {

	this.listH = [];
	this.listV = [];

	for (var i = 0, children = nodeA.childNodes, l = children.length; i < l; ++i) {
		this.listH.push(ElementsSimilarity.identity(children[i]));
	}

	for (i = 0, children = nodeB.childNodes, l = children.length; i < l; ++i) {
		this.listV.push(ElementsSimilarity.identity(children[i]));
	}

	// Time to construct this big and wonderful matrice
	this.construct(this.listH.length + 1, this.listV.length + 1);
}

Matrix.prototype.construct = function(sizeH, sizeV) {

	this.mat = [];

	var v = [];
	for (var i = 0; i < sizeH; ++i) {
		v.push(0);
	} 

	for ( i = 0; i < sizeV; ++i) {
		this.mat.push(v.slice(0));
	}
};