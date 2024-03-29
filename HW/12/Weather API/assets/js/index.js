//API key 1e7177a851febb02355b0bb2d20048db
//DOM
const modalBG = document.querySelector(".modal-bg");
const modal = document.querySelector(".modal");
const cityInput = document.getElementById("city-name");
const close = document.getElementById("close");
const geoInput = document.getElementById("geo-name-input")

let storeModal;//Stores Modal for when Errors happen

//Toggle Modal
function showModal() {
    modalBG.style.display = "flex";
    document.querySelector(".fa-arrow-left").addEventListener("click", () => {
        hideModal()
    });
}

function hideModal() {
    modalBG.style.display = "none";
    modal.innerHTML = storeModal;
}

async function fetchGeo(x, y) {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${x}&lon=${y}&appid=1e7177a851febb02355b0bb2d20048db`);
    const menu = await res.json();
    await inputValidator(menu);

}

async function fetchInput() {
    const city = cityInput.value;
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1e7177a851febb02355b0bb2d20048db`);
    const menu = await res.json();
    await inputValidator(menu);
}

function inputValidator(input) {
    if (typeof (input.name) === "string") {
        setData(input);
        console.log(input);
    } else {
        error()
    }
}

function setData(data) {
    //Main pic
    const icon = document.getElementById("photo");
    switch (data.weather[0].main) {
        case `Rain`:
            icon.src = "./assets/icons/rainy.png";
            icon.alt = "Rainy";
            break;
        case `Clouds`:
            icon.src = "./assets/icons/cloudy.png";
            icon.alt = "Clouds"
            break;
        case `Mist`:
            icon.src = "./assets/icons/cloud.png"
            icon.alt = "Mist"
            break;
        default:
            icon.src = "./assets/icons/sun.png"
            icon.alt = "Sunny"
    }
    //Temp
    document.getElementById("temp").innerText = parseInt(data.main.temp) - 273;

    //description
    document.getElementById("status").innerText = data.weather[0].description;

    //Location
    document.getElementById("location").innerText = data.sys.country + " ," + data.name;

    //Humidity
    document.getElementById("humidity").innerText = parseInt(data.main.humidity);

    //Feels like
    const cels = parseInt(data.main.feels_like) - 273;
    console.log(data.main.feels_like);
    console.log(cels);
    document.getElementById("celsius").innerText = cels;
    const dama = document.getElementById("dama");
    if (cels > 30) {
        dama.src = "./assets/icons/warm.png";
    } else if (cels < 20) {
        dama.src = "./assets/icons/cold.png";
    } else {
        dama.src = "./assets/icons/normal.png";
    }

    storeModal = modal.innerHTML;
    showModal();
}


function error() {
    storeModal = modal.innerHTML;
    modal.innerHTML = "<div class='error'><span>There seems to be a problem with your location pls try Again</span>" +
        "<span style='font-size: larger'>😥</span>" +
        "<button class='inputs' onclick='hideModal()'>close</button></div>";
    showModal();
}

//Get Geo location
function getGeo() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);

    } else {
        error();
    }
}

function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude + "  Longitude: " + position.coords.longitude)
    fetchGeo(position.coords.latitude, position.coords.longitude)
}


//Event listeners
cityInput.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
        fetchInput(e);
    }
});
geoInput.addEventListener("click", () => {
    getGeo()
})
close.addEventListener("click", () => {
    hideModal()
})

modalBG.addEventListener("click", () => {
    hideModal()
})
modal.addEventListener("click", (event) => {
    event.stopPropagation();
}, false);
