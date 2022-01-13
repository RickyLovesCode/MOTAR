var apiUrl  = "http://api.marketstack.com/v1/eod?access_key=935893895f08ecf8ecfb02ad1b45bdc5&symbols=AAPL&date_from=2022-01-10";

function getStockEod() {
    fetch(apiUrl).then((response) => {
        console.log(response);
        response.json().then((data) => {
            console.log(data)
        })
    })
}

getStockEod();