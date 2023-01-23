// hover searh-icon - замена иконки по наведению (хедер навбар)
const searchIcon = document.querySelector(".nav-search-icon");
searchIcon.addEventListener("mouseover", ()=> {
    searchIcon.setAttribute("src" , "./img/header/search-icon-hover.png");
})
searchIcon.addEventListener("mouseout", ()=> {
    searchIcon.setAttribute("src" , "./img/header/search-icon.png");
})

// switching tabs of the services section
const servicesList = document.querySelector(".services-list");
const servicesDescriptions = document.querySelectorAll(".services-description");

servicesList.addEventListener("click", (evt) => {
    let target = evt.target;
    if (target.tagName === "LI") {
        let prevActive = document.querySelector(".services-list-item.active");
        prevActive.classList.remove("active");
        target.classList.add("active");
        data = target.dataset.service;
        for (div of servicesDescriptions) {
            if (div.dataset.service !== data) {
                div.classList.add("inactive");
            } else {
                div.classList.remove("inactive");
            }
        }
    } 
})

// hover section work 
// по наведению на категорию - картинки других категорий получают затемнение

const workList = document.querySelector(".work-list");
const galleryImgs = document.querySelectorAll(".work .gallery-img")
workList.addEventListener("mouseover", (evt) => {
    let target = evt.target;
    if (target.tagName === "LI" && target.dataset.typeWork !== "all") {
        let data = target.dataset.typeWork
        for (img of galleryImgs) {
            if (img.dataset.typeWork !== data) {
                img.style.filter = "brightness(25%)";
            }
        }
    }
}) 

workList.addEventListener("mouseout", (evt) => {
    if (evt.target.tagName === "LI") {
        for (img of galleryImgs) {
            img.style.filter = "brightness(100%)";
        }
    }
})