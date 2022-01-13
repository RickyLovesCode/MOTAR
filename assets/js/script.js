// this is the stock api variable that will use to fetch the data the symbol 
// will have to take in a few variables. one being the stock ticker and the orther being the date from
var stockTicker = "MSFT"
var dateFrom = "2022-01-10"
var stockApiUrl  = `http://api.marketstack.com/v1/eod?access_key=935893895f08ecf8ecfb02ad1b45bdc5&symbols=${stockTicker}&date_from=${dateFrom}`;

function getStockEod() {
    fetch(stockApiUrl).then((response) => {
        console.log(response);
        response.json().then((data) => {
            console.log(data)
        })
    })
}

// getStockEod();

var coinGeckoApiUrl = "https://api.coingecko.com/api/v3/exchanges"

function getBitExchange() {
    fetch(coinGeckoApiUrl).then((response) => {
        console.log(response);
        response.json().then((data) => {
            console.log(data);
        })
    })
}

getBitExchange(); 

