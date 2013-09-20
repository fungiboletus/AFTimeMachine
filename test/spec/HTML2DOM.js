'use strict';

describe('HTML2DOM specifications', function() {
	// shortcut
	var c = HTML2DOM;

	it("Create a node", function() {
		expect(c("<div></div>")).to.be.an.instanceof(Element);
		expect(c("<div></div>").tagName).to.equal("DIV");
	});

	it("Create a small node", function() {
		expect(c("<br />")).to.be.an.instanceof(Element);
		expect(c("<br />").tagName).to.equal("BR");
	});

	it("Check argument", function() {
		expect(c("<div data-toto=\"canard\"/>").
			getAttribute("data-toto")).to.equal("canard");
		expect(c("<div style=\"color:blue;\"/>").
			style.color).to.equal("blue");
	});

	it("Hello world", function() {
		expect(c("<div id=\"test\"> hello <br/> world</div>").firstChild.data).to.contain("hello");
	});

	it("Children length", function() {
		expect(c("<ul><li>1</li><li>2</li><li>3</li></ul>").childNodes.length).to.equal(3);
	});

	it("Multiple nodes (use a DIV as parent node)", function() {
		var n = c("<div>canard</div><div>lapin</div>");
		expect(n.tagName).to.equal("DIV");
		expect(n.childNodes).to.have.length(2);
	});

	it("Simple text", function() {
		expect(c(" canard")).to.have.property("data");
		expect(c(" canard").data).to.contain("canard");

		expect(c({toString:function(){return "canard";}}).data).to.contain("canard");
	});

	it("Check weird error", function() {
		expect(function(){c({toString:function(){throw new Error("oops");}})}).to.throw(Error);
	});
});