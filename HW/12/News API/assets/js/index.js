//API key 77a6e3588ad046b08e4f436d6ab65a83
var url = 'https://newsapi.org/v2/everything?' +
    'q=Apple&' +
    'from=2022-05-22&' +
    'sortBy=popularity&' +
    'apiKey=77a6e3588ad046b08e4f436d6ab65a83';

var req = new Request(url);

fetch(req)
    .then(function(response) {
        console.log(response.json());
    })