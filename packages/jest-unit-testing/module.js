// // module.js
// function sum(a, b) {
//     return a + b;
// }

// function div (a, b){
//     return a / b;
// }

// function containsNumbers(text){
//     for (let i = 0; i < text.length; i++) {
//         if (!isNaN(text.charAt(i)))
//         return true;
//     }
//     return false;
// }

// export default { sum, div, containsNumbers };

class Portfolio {
  constructor() {
    this.stocks = {};
  }
  
  addStock(symbol, shares) {
    if (shares <= 0) {
      throw new Error('Invalid number of shares.');
    }

    if (!this.stocks[symbol]) {
      this.stocks[symbol] = 0;
    }

    this.stocks[symbol] += shares;
  }
  isEmpty() {
    return 0;
  }

  countUniqueTickerSymbols() {
    return Object.keys(this.stocks).length;
  }

  purchase(symbol, shares) {
    if (shares <= 0) {
      throw new Error('Invalid number of shares to purchase.');
    }
    
    // Include any additional purchase-related logic here.
    // For example, checking if the user has sufficient funds.

    this.addStock(symbol, shares);
  }

  sell(symbol, shares) {
    if (shares <= 0) {
      throw new Error('Invalid number of shares to sell.');
    }

    if (!this.stocks[symbol]) {
      throw new Error('No shares of the specified stock to sell.');
    }

    if (this.stocks[symbol] < shares) {
      throw new ShareSaleException(symbol, shares, this.stocks[symbol]);
    }

    // Update the number of shares correctly
    this.stocks[symbol] -= shares;
}

getShares(symbol) {
    if (!this.stocks[symbol]) {
      return 0; // The symbol doesn't exist in the portfolio
    }
    return this.stocks[symbol];
  }

cleanPortfolio() {
    for (const symbol in this.stocks) {
      if (this.stocks[symbol] === 0) {
        delete this.stocks[symbol];
      }
    }
  }
}
export {Portfolio};