var selectSupportedCurrencyEl = document.getElementById("supported-currency");
var supportedCurrencyOptionEl = document.createElement("option");
var selectCryptoIdEl = document.getElementById("crypto-id");
var pEl = document.getElementById("conversion-rate");
var submitButtonEl = document.querySelector("button");
var choosenCurrency;
var choosenID;
var cryptoId = [
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

function getSupportedCurrency() {
  var supportedCurrencyUrl =
    "https://api.coingecko.com/api/v3/simple/supported_vs_currencies";
  fetch(supportedCurrencyUrl).then((response) => {
    response.json().then((data) => {
      for (let i = 0; i < data.length; i++) {
        selectSupportedCurrencyEl.innerHTML +=
          "<option value=" + data[i] + ">" + data[i];
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

function getCoinList(array) {
  for (let i = 0; i < array.length; i++) {
    selectCryptoIdEl.innerHTML +=
      "<option value=" + array[i] + ">" + array[i];
  }
}
getCoinList(cryptoId);

function getBitExchangeRate() {
  setConversitonParamaters();
  var exchangeRateUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${choosenID}&vs_currencies=${choosenCurrency}`;
  fetch(exchangeRateUrl).then((response) => {
    response.json().then((data) => {
      console.log(data);
      pEl.innerHTML = data[choosenID][choosenCurrency];
    });
  });
}

function setConversitonParamaters() {
  choosenCurrency =
    selectSupportedCurrencyEl.options[selectSupportedCurrencyEl.selectedIndex]
      .text;
  console.log(choosenCurrency);
  choosenID = selectCryptoIdEl.options[selectCryptoIdEl.selectedIndex].text;
  console.log(choosenID);
}

submitButtonEl.addEventListener("click", getBitExchangeRate);



