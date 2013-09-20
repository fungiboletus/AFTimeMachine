
describe("Matrix", function() {
	'use scrict';

	var c = HTML2DOM;

	describe("Small matrice", function() {
		var m = new Matrix(c("<div><p>salut</p></div>"), c("<div><p>hello</p></div>"));
		it("Matrice size", function() {
			expect(m.mat.length).to.equal(2);
			expect(m.mat[0].length).to.equal(2);
		});

		it("Identity", function() {
			expect(m.listH[0]).to.contain("P");
			expect(m.listV[0]).to.contain("P");
		});
	});
});
