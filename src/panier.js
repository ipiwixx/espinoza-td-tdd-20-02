class Panier {
  constructor() {
    this.panier = [];
    this.remiseUsed = [];
    this.montantTotal = 0;
  }

  getMontantTotal() {
    var total = 0;
    this.panier.forEach((produit) => total += produit['quantite'] * produit['produit'].montant);
    return total;
  }

  getNbArticle() {
    var total = 0;
    this.panier.forEach((produit) => total += produit['quantite']);
    return total;
  }

  addArticle(produit, quantite) {
    this.panier.push({produit, quantite});
    produit.removeStock(quantite);
  }

  removeArticle(produit, quantite) {
    const index = this.panier.findIndex(item => item.produit === produit);
    if (index !== -1) {
        this.panier[index].quantite -= quantite;
        produit.addStock(quantite);
        if (this.panier[index].quantite <= 0) {
            this.panier.splice(index, 1);
            //produit.addStock(quantite);
        }
    }
  }

  clearPanier() {
    this.panier = [];
  }

  applyRemise(remise) {
    if(remise.pourcentage > 0 && remise.pourcentage < 100) {
      if (!this.remiseUsed.some(item => item === remise)) {
          this.remiseUsed.push(remise);
          const montantTotal = this.getMontantTotal(); // Obtenez le montant total actuel
          const montantRemise = montantTotal * (remise.pourcentage / 100); // Calculez le montant de la remise
          this.montantTotal = montantTotal - montantRemise; // Appliquez la remise au montant total
      }
    } else {
      this.montantTotal = this.getMontantTotal();
    }
  }

  applyRemiseProduct(remise, produit, listeRemise) {
    if(remise.pourcentage > 0 && remise.pourcentage < 100) {
      console.log('ahah');
      if (!produit.remiseUsed.some(item => item === remise)) {
        console.log('ça passe');
          produit.remiseUsed.push(remise);
          this.montantTotal = this.getMontantTotal() - (produit.montant * (remise.pourcentage / 100)); // Obtenez le montant total actuel
      }
    } else {
      this.montantTotal = this.getMontantTotal();
    }
  }
}

module.exports = {
  Panier: Panier,
};
