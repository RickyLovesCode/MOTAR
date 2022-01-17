// JavaScript for the cryptocoin converter

var selectSupportedCurrencyEl = document.getElementById("supported-currency");
var supportedCurrencyOptionEl = document.createElement("option");
var selectCryptoIdEl = document.getElementById("crypto-id");
var pEl = document.getElementById("conversion-rate");
var submitButtonEl = document.getElementById("#");
var amountEl = document.getElementById("amount-input");
var valueEl = document.getElementById("base-input");
var choosenCurrency;
var choosenID;
var value = 0;
var cryptoIdArr = [
  "algorand",
  "ankr",
  "bancor",
  "basic-attention-token",
  "binance-usd",
  "bitcoin",
  "bitcoin-gold",
  "binancecoin",
  "bitcoin-cash",
  "cardano",
  "cdai",
  "celer-network",
  "chainlink",
  "chiliz",
  "cosmos",
  "dao",
  "decentraland",
  "decred",
  "dogecoin",
  "enjincoin",
  "eso",
  "etherum",
  "etherum-classic",
  "fantom",
  "filecoin",
  "flux",
  "ftx-token",
  "gnosis",
  "helium",
  "hive",
  "huobi-token",
  "icon",
  "iota",
  "iotex",
  "kadena",
  "kava",
  "kucoin-shares",
  "kusama",
  "leo-token",
  "livepeer",
  "loopring",
  "ring",
  "monero",
  "nem",
  "neo",
  "nervos-network",
  "nexo",
  "okb",
  "ontology",
  "qtum",
  "quant",
  "litecoin",
  "ravencoin",
  "siacoin",
  "solana",
  "stellar",
  "swissborg",
  "syscoin",
  "telcoin",
  "tether",
  "terracoin",
  "tezos",
  "thorchain",
  "tron",
  "true-usd",
  "uma",
  "usd-coin",
  "vechain",
  "wax",
  "waves",
  "wazirx",
  "zcash",
  "zilliqa",
];

var supportedCurrencyArr = [
  "Bitcoin",
  "Etherum",
  "Litecoin",
  "Bitcoin Cash",
  "Binance Coin",
  "EOS",
  "XRP",
  "Stellar",
  "Chainlink",
  "Polkadot",
  "Yearn Finance",
  "US Dollar",
  "United Arab Emirates Dirham",
  "Argentine Peso",
  "Australian Dollar",
  "Bandot",
  "Bitcoin HD",
  "Bermudian Dollar",
  "Borealis",
  "Candy Protocol",
  "Crypto Franc",
  "Scallop",
  "Renminbi",
  "Czech Koruny",
  "Danish Krone",
  "Euro",
  "Pound",
  "Hong Kong Dollar",
  "Hungarian Forint",
  "Indonesian Rupiah",
  "Israeli New Shekel",
  "Indian Rupee",
  "Japanese Yen",
  "South Korean Won",
  "Kuwaiti Dinar",
  "Sri Lankan Rupee",
  "Myanmar Kyat",
  "Mexican Peso",
  "Malaysian Ringgit",
  "Nigerian Naira",
  "Norwegian Krone",
  "New Zealand Dollar",
  "Philippine peso",
  "Pakistani Rupee",
  "Poland złoty",
  "Russian Ruble",
  "Saudi Riyal",
  "Swedish Krona",
  "Singapore Dollar",
  "Thai Baht",
  "Turkish lira",
  "New Taiwan dollar",
  "Ukrainian hryvnia",
  "Venezuelan Bolívar",
  "Vietnamese Dong",
  "South African Rand",
  "XDR",
  "Silver Ounce",
  "Gold Ounce",
  "Bitstar",
  "Satoshis",
];

// generate option list for supported currency
function getSupportedCurrency() {
  var supportedCurrencyUrl =
    "https://api.coingecko.com/api/v3/simple/supported_vs_currencies";
  fetch(supportedCurrencyUrl).then((response) => {
    response.json().then((data) => {
      for (let i = 0; i < data.length; i++) {
        selectSupportedCurrencyEl.innerHTML +=
          "<option value=" + data[i] + ">" + supportedCurrencyArr[i];
      }
    });
  });
}
getSupportedCurrency();

/* this function uses the coin gecko api that has a total of 12000 coin id. This is too much so an array with the top 100 coins was made and will be used instead. This function can be uses at a later date if needed.
function getCoinList() {
  var coinListUrl = "https://api.coingecko.com/api/v3/coins/list";
  fetch(coinListUrl).then((response) => {
    response.json().then((data) => {
      for (let i = 0; i < data.length; i++) {
        selectCryptoIdEl.innerHTML +=
          "<option value=" + data[i].id + ">" + data[i].id;
      }
    });
  });
} */

// generate option list for coin id
function getCoinList(array) {
  for (let i = 0; i < array.length; i++) {
    selectCryptoIdEl.innerHTML += "<option value=" + array[i] + ">" + array[i];
  }
}
getCoinList(cryptoIdArr);

function setConversitonParameters() {
  choosenCurrency =
    selectSupportedCurrencyEl.options[selectSupportedCurrencyEl.selectedIndex]
      .value;
  console.log(choosenCurrency);
  choosenID = selectCryptoIdEl.options[selectCryptoIdEl.selectedIndex].text;
  console.log(choosenID);
  value = +amountEl.value;
  console.log(value);
}

function getBitExchangeRate() {
  setConversitonParameters();
  var exchangeRateUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${choosenID}&vs_currencies=${choosenCurrency}`;
  fetch(exchangeRateUrl).then((response) => {
    response.json().then((data) => {
      console.log(data);
      if (data[choosenID][choosenCurrency] == undefined) {
        valueEl.value = "Conversion Unavailable";
      } else {
        if (value <= 1) {
          valueEl.value =
            data[choosenID][choosenCurrency] +
            " " +
            selectSupportedCurrencyEl.options[
              selectSupportedCurrencyEl.selectedIndex
            ].text;
        } else {
          valueEl.value =
            data[choosenID][choosenCurrency] * value +
            " " +
            selectSupportedCurrencyEl.options[
              selectSupportedCurrencyEl.selectedIndex
            ].text;
        }
      }
    });
  });
}

submitButtonEl.addEventListener("click", getBitExchangeRate);

// End of crypto converter javaScript code

// JavaScript for the stock end of day api

var stockTickerEl = document.getElementById("stock-symbol");
var stockBtnEl = document.getElementById("stock-button");
var ulEl = document.getElementById("symbol-list");
var stockSymbol = localStorage.getItem(stockSymbol)
var stockData;
var localStorageData

function saveStockData(stockSymbol, stockData) {
  localStorage.setItem(stockSymbol, JSON.stringify(stockData));
}

function retrieveStockData() {
   localStorageData = JSON.parse(localStorage.getItem(key))
   console.log(localStorageData)
}


function setStockParameters() {
  while (ulEl.firstChild) {
    ulEl.removeChild(ulEl.firstChild);
  }
  stockSymbol = stockTickerEl.value;
  stockSymbol = stockSymbol.trim().toUpperCase();
//   event.preventDefault();
}

function getStockEod() {
  setStockParameters();
  var stockApiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=2MTCI3582ZDMK6B2`;
  fetch(stockApiUrl).then((response) => {
    response.json().then((data) => {
      let key;
      stockData = data["Global Quote"];
      saveStockData(stockSymbol, stockData);
      for (key in data["Global Quote"]) {
        ulEl.innerHTML += "<li>" + key + ": " + data["Global Quote"][key];
      }
    });
  });
  retrieveStockData()
}

stockBtnEl.addEventListener("click", getStockEod);
