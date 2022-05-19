//API key 1e7177a851febb02355b0bb2d20048db
const modalBG = document.querySelector(".modal-bg");
const modal = document.querySelector(".modal");
const cityInput = document.getElementById("city-name");
const close = document.getElementById("close");
const geoInput = document.getElementById("geo-name-input")
function showModal(){
    modalBG.style.display = "flex";
}
function hideModal(){
    modalBG.style.display = "none";
}

cityInput.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
        showModal();
    }
});
geoInput.addEventListener("click", ()=>{showModal()})
close.addEventListener("click", ()=>{hideModal()})

modalBG.addEventListener("click", ()=>{hideModal()})
modal.addEventListener("click", (event) => {
    event.stopPropagation();
}, false);