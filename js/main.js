// add hidding content to work section
// чтобы не дублировать в разметке 12раз один и тот-же блок для каждого li (анимация появления при ховере), 
//перенес его в js - смысл не писать 12 раз разметку в html, а дать инструкцию js написать одну и ту же разметку для каждого li; 
//сразу после построения DOM дерева.

window.addEventListener("DOMContentLoaded", addTegs);
let galleryImgs = document.querySelectorAll(".work .gallery-img")
function addTegs() { 
    for (img of [...galleryImgs]) {
        let div = document.createElement("div");
        div.innerHTML = `
        <div>
            <div class="circle"><img class="chain" src="./img/work/chain.png" alt="chain"></div>
            <div class="circle"><img class="quater" src="./img/work/quater.png" alt="quater"></div>
        </div>
        <p class="cd-text">CREATIVE DESIGN</p>
        <p class="wd-text">Web Design</p>`
        div.classList.add("hidden-options")
        img.after(div);
    }
}

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


// hover on work section nav -> change images list in work section. Appropriate category - light, other categories - dark
// по наведению на категорию - картинки других категорий получают затемнение

const galleryItems = document.querySelectorAll(".work .gallery-item");
const workList = document.querySelector(".work-list");

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

workList.addEventListener("click", (evt) => {
    let target = evt.target;
    if (target.tagName === "LI") {
        for (li of workList.children) {
            if (li.matches(".active")) {
                li.classList.remove("active")
            }
        }
        target.classList.add("active");
        for (li of galleryItems) {
            if (li.dataset.typeWork !== target.dataset.typeWork) {
                li.style.display = "none";
            } else {li.style.display = "block"}
            if (target.dataset.typeWork === "all") {
                li.style.display = "block"
                console.log("asdasd");
            }
        }      
    }
})