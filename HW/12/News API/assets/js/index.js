//API key 77a6e3588ad046b08e4f436d6ab65a83
//DOM
const input = document.getElementById("search");
const submit = document.getElementById("submit");
const container = document.querySelector(".row");
class Main {
    constructor(){
    }
    fetchNews =  async() =>{
        const subject = input.value;
        input.value = "";
        this.res = await fetch(`https://newsapi.org/v2/everything?q=${subject}&from=2022-05-22&sortBy=popularity&apiKey=77a6e3588ad046b08e4f436d6ab65a83`);
        this.response = await this.res.json();
        this.news = this.response.articles;
        await this.validation();
    }
    validation=()=>{
        if(this.news.length > 0){
            container.innerHTML = '';
            this.articleAdder();
        }
        else {
        }
    }
    articleAdder=()=>{
        console.log(this.news)
        this.news.forEach(this.articleMaker)
    }
    articleMaker=(x)=>{
        container.innerHTML += `<div class="card p-3 col-xl-4 col-4 m-3" style="width: 20rem;">
            <img alt="${x.title}" src="${x.urlToImage}" class="card-img-top" alt="...">
            <hr>
            <div class="card-body">
                <h5 class="card-title">${x.title}</h5>
                <a href="${x.url}" class="card-text">${x.description}</a>
                <hr>
                <span class="btn btn-primary">${x.publishedAt.substring(0, 10)}</span>
            </div>
        </div>`
    }
}
const realMain = new Main();
submit.addEventListener("click", realMain.fetchNews);
input.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
        realMain.fetchNews();
    }
});