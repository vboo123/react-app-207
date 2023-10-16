class ShareSaleException extends Error {
    constructor(symbol, attemptedShares, ownedShares) {
      super(`Attempted to sell ${attemptedShares} shares of ${symbol} while owning only ${ownedShares} shares.`);
      this.name = "ShareSaleException";
    }
  }
  export {ShareSaleException};