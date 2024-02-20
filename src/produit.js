class Produit {
  constructor(id, label, stock, montant) {
    this.id = id;
    this.label = label;
    this.stock = stock;
    this.montant = montant;
    this.remiseUsed = [];
  }

  getStock() {
    return this.stock;
  }

  addStock(nb) {
    this.stock += nb;
  }

  removeStock(nb) {
    if(this.stock >= nb) {
      this.stock -= nb;
    } else if (this.stock < nb) {
      this.stock = 0;
    }
  }
}

module.exports = {
  Produit: Produit,
};
