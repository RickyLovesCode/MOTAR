var selectSupportedCurrencyEl = document.getElementById("supported-currency")
var supportedCurrencyOptionEl = document.createElement("option");
var selectCryptoIdEl = document.getElementById("crypto-id")
var pEl = document.getElementById("conversion-rate")
var submitButtonEl = document.querySelector("button")
var choosenCurrency
var choosenID

function getSupportedCurrency() {
    var supportedCurrencyUrl = "https://api.coingecko.com/api/v3/simple/supported_vs_currencies";
    fetch(supportedCurrencyUrl).then((response) => {
        response.json().then((data) => {
            for (let i = 0; i < data.length; i++) {
                selectSupportedCurrencyEl.innerHTML += "<option value=" + data[i] + ">" + data[i];
            }
        })
    })
}
getSupportedCurrency();

function getCoinList() {
    var coinListUrl = "https://api.coingecko.com/api/v3/coins/list";
    fetch(coinListUrl).then((response) => {
        response.json().then((data) => {
            for (let i = 0; i < data.length; i++) {
                selectCryptoIdEl.innerHTML += "<option value=" + data[i].id + ">" + data[i].id;
            }
        })
    })
}
// getCoinList();

function getBitExchangeRate() {
    setConversitonParamaters()
    var exchangeRateUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${choosenID}&vs_currencies=${choosenCurrency}`
    fetch(exchangeRateUrl).then((response) => {
        response.json().then((data) => {
            console.log(data)
            pEl.innerHTML = data[choosenID][choosenCurrency]
        })
    })
}

function setConversitonParamaters() {
    choosenCurrency = selectSupportedCurrencyEl.options[selectSupportedCurrencyEl.selectedIndex].text;
    console.log(choosenCurrency)
    choosenID = selectCryptoIdEl.options[selectCryptoIdEl.selectedIndex].text;
    console.log(choosenID)
}


submitButtonEl.addEventListener("click", getBitExchangeRate)
