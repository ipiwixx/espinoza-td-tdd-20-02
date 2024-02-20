const Produit = require("../src/produit").Produit;
const Panier = require("../src/panier").Panier;
const Remise = require("../src/remise").Remise;
const expect = require("chai").expect;

describe("Testing the Panier Functions", function () {
  it("1. Ajouter des articles au panier", function (done) {
    let pr1 = new Produit(1 ,'chaussure', 18, 120);
    let pr2 = new Produit(2, 'veste', 23, 110);
    let p1 = new Panier();
    p1.addArticle(pr1, 8);
    p1.addArticle(pr2, 2);
    expect(p1.getNbArticle()).to.equal(10);
    done();
  });

  it("2. Calcul du montant du panier", function (done) {
    let pr1 = new Produit(1 ,'chaussure', 18, 120);
    let pr2 = new Produit(2, 'veste', 23, 110);
    let p2 = new Panier();
    p2.addArticle(pr1, 1);
    p2.addArticle(pr2, 2);
    expect(p2.getMontantTotal()).to.equal(340);
    done();
  });

  it("3. Retirer des articles du panier", function (done) {
    let pr1 = new Produit(1 ,'chaussure', 18, 120);
    let pr2 = new Produit(2, 'veste', 23, 110);
    let p3 = new Panier();
    p3.addArticle(pr1, 1);
    p3.addArticle(pr2, 2);
    p3.removeArticle(pr2, 2);
    expect(p3.getNbArticle()).to.equal(1);
    done();
  });

  it("4. Vider le panier", function (done) {
    let pr1 = new Produit(1 ,'chaussure', 18, 120);
    let pr2 = new Produit(2, 'veste', 23, 110);
    let p4 = new Panier();
    p4.addArticle(pr1, 1);
    p4.addArticle(pr2, 2);
    p4.clearPanier();
    expect(p4.getNbArticle()).to.equal(0);
    done();
  });

  it("5. Vider panier, puis ajouter puis retirer des articles du panier", function (done) {
    let pr1 = new Produit(1 ,'chaussure', 18, 120);
    let pr2 = new Produit(2, 'veste', 23, 110);
    let p5 = new Panier();
    p5.addArticle(pr1, 1);
    p5.addArticle(pr2, 2);
    p5.clearPanier();
    p5.addArticle(pr2, 2);
    p5.removeArticle(pr2, 1);
    expect(p5.getNbArticle()).to.equal(1);
    done();
  });

  it("6. Vider panier et tenter de retirer des articles", function (done) {
    let pr1 = new Produit(1 ,'chaussure', 18, 120);
    let pr2 = new Produit(2, 'veste', 23, 110);
    let p6 = new Panier();
    p6.clearPanier();
    p6.removeArticle(pr2, 2);
    expect(p6.getNbArticle()).to.equal(0);
    done();
  });

  it("7. Retirer articles supérieurs au nombre d'article du panier", function (done) {
    let pr1 = new Produit(1 ,'chaussure', 18, 120);
    let pr2 = new Produit(2, 'veste', 23, 110);
    let p7 = new Panier();
    p7.addArticle(pr2, 2);
    p7.removeArticle(pr2, 4);
    expect(p7.getNbArticle()).to.equal(0);
    done();
  });

  it("8. Vider panier avec nombre d'article de 0", function (done) {
    let p8 = new Panier();
    p8.clearPanier();
    expect(p8.getNbArticle()).to.equal(0);
    done();
  });

  it("9. Ajouter des articles au panier, vider panier et réajouter au panier des articles", function (done) {
    let pr1 = new Produit(1 ,'chaussure', 18, 120);
    let pr2 = new Produit(2, 'veste', 23, 110);
    let p9 = new Panier();
    p9.addArticle(pr1, 2);
    p9.clearPanier();
    p9.addArticle(pr2, 5)
    expect(p9.getNbArticle()).to.equal(5);
    done();
  });

  it("10. Ajouter une remise", function (done) {
    let pr1 = new Produit(1 ,'chaussure', 18, 120);
    let pr2 = new Produit(2, 'veste', 23, 110);
    let p10 = new Panier();
    let r1 = new Remise('Nike20', 50);
    p10.addArticle(pr1, 2);
    p10.addArticle(pr2, 1);
    p10.applyRemise(r1);
    expect(p10.montantTotal).to.equal(175);
    done();
  });

  it("11. Ajouter 2 fois la même remise", function (done) {
    let pr1 = new Produit(1 ,'chaussure', 18, 120);
    let pr2 = new Produit(2, 'veste', 23, 110);
    let p11 = new Panier();
    p11.addArticle(pr1, 2);
    p11.addArticle(pr2, 1);
    let r2 = new Remise('Nike20', 50);
    p11.applyRemise(r2);
    p11.applyRemise(r2);
    expect(p11.montantTotal).to.equal(175);
    done();
  });

  it("12. Remise < 0", function (done) {
    let pr1 = new Produit(1 ,'chaussure', 18, 120);
    let pr2 = new Produit(2, 'veste', 23, 110);
    let p12 = new Panier();
    p12.addArticle(pr1, 2);
    p12.addArticle(pr2, 1);
    let r1 = new Remise('Nike20', -10);
    p12.applyRemise(r1);
    expect(p12.montantTotal).to.equal(350);
    done();
  });

  it("13. Remise = 0", function (done) {
    let pr1 = new Produit(1 ,'chaussure', 18, 120);
    let pr2 = new Produit(2, 'veste', 23, 110);
    let p13 = new Panier();
    p13.addArticle(pr1, 2);
    p13.addArticle(pr2, 1);
    let r1 = new Remise('Nike20', 0);
    p13.applyRemise(r1);
    expect(p13.montantTotal).to.equal(350);
    done();
  });

  it("14. Remise > 100", function (done) {
    let pr1 = new Produit(1 ,'chaussure', 18, 120);
    let pr2 = new Produit(2, 'veste', 23, 110);
    let p14 = new Panier();
    p14.addArticle(pr1, 2);
    p14.addArticle(pr2, 1);
    let r1 = new Remise('Nike20', 120);
    p14.applyRemise(r1);
    expect(p14.montantTotal).to.equal(350);
    done();
  });

  it("15. Remise sur panier vide", function (done) {
    let p15 = new Panier();
    let r1 = new Remise('Nike20', 50);
    p15.applyRemise(r1);
    expect(p15.montantTotal).to.equal(0);
    done();
  });

  it("16. Ajout produit stock", function (done) {
    let pr1 = new Produit(1 ,'chaussure', 18, 120);
    pr1.addStock(4);
    expect(pr1.getStock()).to.equal(22);
    done();
  });

  it("17. Enlever produit stock", function (done) {
    let pr1 = new Produit(1 ,'chaussure', 18, 120);
    pr1.removeStock(4);
    expect(pr1.getStock()).to.equal(14);
    done();
  });

  it("18. Stock à jour quand ajout produit panier", function (done) {
    let pr1 = new Produit(1 ,'chaussure', 18, 120);
    let p14 = new Panier();
    p14.addArticle(pr1, 2);
    expect(pr1.getStock()).to.equal(16);
    done();
  });

  it("19. Stock à jour quand remove panier", function (done) {
    let pr1 = new Produit(1 ,'chaussure', 18, 120);
    let p19 = new Panier();
    p19.addArticle(pr1, 2);
    p19.removeArticle(pr1, 1);
    expect(pr1.getStock()).to.equal(17);
    done();
  });

  it("20. Stock non négatif", function (done) {
    let pr1 = new Produit(1 ,'chaussure', 18, 120);
    let p20 = new Panier();
    p20.addArticle(pr1, 22);
    expect(pr1.getStock()).to.equal(0);
    done();
  });

  it("21. Ajouter une remise produit", function (done) {
    let pr1 = new Produit(1 ,'chaussure', 18, 120);
    let pr2 = new Produit(2, 'veste', 23, 110);
    let r1 = new Remise('Nike20', 50);
    let p21 = new Panier();
    remises = [
      r1,
      new Remise('RemiseSpeciale', 15),
      new Remise('Promo', 30),
    ];
    p21.addArticle(pr1, 1);
    p21.addArticle(pr2, 1);
    p21.applyRemiseProduct(r1, pr1, remises);
    expect(p21.montantTotal).to.equal(170);
    done();
  });

  it("22. Prix article remisé n'est pas négatif", function (done) {
    let pr1 = new Produit(1 ,'chaussure', 18, 120);
    let pr2 = new Produit(2, 'veste', 23, 110);
    let p22 = new Panier();
    let r1 = new Remise('Nike20', 150);
    remises = [
      r1,
      new Remise('RemiseSpeciale', 15),
      new Remise('Promo', 30),
    ];
    p22.addArticle(pr1, 1);
    p22.addArticle(pr2, 1);
    p22.applyRemiseProduct(r1, pr1, remises);
    expect(p22.montantTotal).to.equal(230);
    done();
  });

  it("23. Appliquer remise inexistante", function (done) {
    let pr1 = new Produit(1 ,'chaussure', 18, 120);
    let pr2 = new Produit(2, 'veste', 23, 110);
    let p23 = new Panier();
    remises = [
      new Remise('Nike20', 50),
      new Remise('RemiseSpeciale', 15),
      new Remise('Promo', 30),
    ];
    let r1 = new Remise('adidas40', 20);
    p23.addArticle(pr1, 1);
    p23.addArticle(pr2, 1);
    p23.applyRemiseProduct(r1, pr1, remises);
    expect(p23.montantTotal).to.equal(230);
    done();
  });
});
