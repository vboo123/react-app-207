
import { Portfolio} from "./module";
import {ShareSaleException} from "./module_two";


test("A portfolio is created with an empty number of shares and no ticker symbols", () => {
  const portfolio = new Portfolio();
  expect(portfolio.stocks).toEqual({});
});

test("Stock Portfolio shall answer if empty or not", () => {
  let stockPortfolio = new Portfolio();
  expect(stockPortfolio.isEmpty()).toBe(0);
});

test("Count unique ticker symbols in the portfolio", () => {
  const portfolio = new Portfolio();
  portfolio.addStock("GME", 5);
  portfolio.addStock("RBLX", 10);
  portfolio.addStock("GME", 2); // Adding more shares of the same stock

  expect(portfolio.countUniqueTickerSymbols()).toBe(2); // Should have 2 unique ticker symbols
});

test("Purchase stocks and add them to the portfolio", () => {
  const portfolio = new Portfolio();
  portfolio.purchase("AAPL", 10);
  portfolio.purchase("GOOG", 5);

  expect(portfolio.stocks).toEqual({ AAPL: 10, GOOG: 5 });
});

test("Sell stocks and subtract them from the portfolio", () => {
    const portfolio = new Portfolio();
    portfolio.purchase("AAPL", 10); // Purchase 10 shares of AAPL
    portfolio.purchase("GOOG", 5);
  
    portfolio.sell("AAPL", 5); // Sell 5 shares of AAPL
  
    expect(portfolio.stocks).toEqual({ AAPL: 10, GOOG: 5 }); // Expect 10 shares of AAPL remaining
  });
  


test("Get the number of shares for a given symbol", () => {
    const portfolio = new Portfolio();
    portfolio.purchase("AAPL", 10);
    portfolio.purchase("GOOG", 5);
  
    const sharesOfAAPL = portfolio.getShares("AAPL");
    const sharesOfGOOG = portfolio.getShares("GOOG");
  
    expect(sharesOfAAPL).toBe(10);
    expect(sharesOfGOOG).toBe(5);
  });


  test("Portfolio keeps only owned symbols", () => {
    const portfolio = new Portfolio();
    portfolio.purchase("AAPL", 10);
    portfolio.purchase("GOOG", 5);
  
    // Perform the check to ensure only owned symbols are kept
    expect(portfolio.stocks).toEqual({ AAPL: 10, GOOG: 5 });
  });

  test("Attempting to sell more shares than owned should raise ShareSaleException", () => {
    const portfolio = new Portfolio();
    portfolio.purchase("AAPL", 10);
    
    expect(() => {
      portfolio.sell("AAPL", 15); // Attempting to sell 15 shares of AAPL while owning only 10
    }).toThrow(ShareSaleException);
  });
  