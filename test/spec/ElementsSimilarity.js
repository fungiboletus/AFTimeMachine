'use scrict';

describe("Elements similarity specifications", function() {

	var c = HTML2DOM,
		s = ElementsSimilarity;

	var div = c("<div></div>"),
		p = c("<p>Canard</p>"),
		p2 = c("<p>Lapin</p>"),
		p3 = c("<p class=\"cretin\">Lapin</p>"),
		pid = c("<p id=\"cretin\">Lapin</p>"),
		text123 = c("<input type=\"text\" name=\"canard\" value=\"123\"/>"),
		textABC = c("<input type=\"text\" name=\"canard\" value=\"abc\"/>"),
		text2ABC = c("<input type=\"text\" name=\"canard2\" value=\"abc\"/>"),
		li = c("<ul><li>test</li><li>abc</li><li>123</li></ul>"),
		li2 = c("<ul><li>test2</li><li>abc</li><li>123</li></ul>"),
		li3 = c("<ul><li>test</li><li>test2</li><li>abc</li><li>123</li></ul>"),
		liWeird = c("<ul><canard>bonok</canard></ul>"),
		liWeird2 = c("<ul><li>test</li><li>abc</li><canard>bonok</canard></ul>");

	describe("Check Equalities", function() {

		it("Equalities", function() {
			expect(s.equal(div, div)).to.be.true;
			expect(s.equal(div, p)).to.be.false;
		});

		it("Small changes", function() {
			expect(s.equal(p, p2)).to.be.true;
			expect(s.equal(p, p3)).to.be.true;
			expect(s.equal(p, pid)).to.be.false;
		});

		it("Inputs", function() {
			expect(s.equal(text123, textABC)).to.be.true;
			expect(s.equal(textABC, text2ABC)).to.be.false;
		});

		it("Lists", function() {
			expect(s.equal(li, li2)).to.be.true;
			expect(s.equal(li, li3)).to.be.true;

			expect(s.equal(li, div)).to.be.false;
		});

		it("Weirds comparaisons", function() {
			expect(s.equal(div, null)).to.be.false;
			expect(s.equal(null, "abc")).to.be.true;
		});

		it("Check children", function() {
			expect(s.equal(li, liWeird)).to.be.false;
			expect(s.equal(li, liWeird2)).to.be.true;
			expect(s.equal(liWeird, liWeird2)).to.be.false;
		});
	});

	describe("Check identities", function() {
		it("Just a div", function() {
			expect(s.identity(div)).to.contain("DIV");
		});

		it("Check the ID", function() {
			expect(s.identity(pid)).to.contain("CRETIN");
		});


		it("Check the name", function() {
			expect(s.identity(text123)).to.contain("CANARD");
		});

		it("Check children", function() {
			expect(s.identity(liWeird)).to.contain("CANARD");
			expect(s.identity(liWeird2)).to.contain("LI");
		});
	});
});