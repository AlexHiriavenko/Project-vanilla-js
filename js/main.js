// add hidding content to work section
// чтобы не дублировать в разметке 12раз один и тот-же блок для каждого li (блок анимация - выезжает при ховере), 
//перенес его в js, одна и та же разметка ваствляется для каждого li.

window.addEventListener("DOMContentLoaded", addTegs);
function addTegs() { 
    const galleryImgs = document.querySelectorAll(".work .gallery-img")
    for (img of galleryImgs) {
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

// hover searh-icon - замена иконки ув стекла по наведению (хедер навбар)

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


const workList = document.querySelector(".work-list");

let countDisplayBlock = 12;       // это переменная для ховера. Так как у меня подсвечиваются картинки соответствующей
// категории при ховере, то после фильтра я убираю эту подсветку т.к. не имеет смысла что то подсвечивать, потому что
// после клика уже все отфильтровано по конкретной категории. А так же для выравнивания grid. 
// По умолчанию grid 4по 1fr ну а если после фильтра меньше чем 4? тогда меняем грид на flex для размещения по центру.

// filter images visibility by click (on section works)
workList.addEventListener("click", (evt) => {
    const galleryItems = document.querySelectorAll(".work .gallery-item");
    const worksGallery = document.querySelector(".works-gallery")
    let target = evt.target;
    if (target.tagName === "LI") {
        for (li of workList.children) {                       // начало - динамическая смена активной вкладки                                 
            if (li.matches(".active")) {
                li.classList.remove("active")
            }
        }
        target.classList.add("active");                       // конец кода - динамическая смена активной вкладки  
        let arr = [];                                         // начало опредение кол-ва пунктов списка с дисплей блок  
        for (li of galleryItems) {                            // начало - фильтр изображений по категориям   
            if (li.dataset.typeWork !== target.dataset.typeWork) {
                li.style.display = "none";
            } else {li.style.display = "block"}
            if (target.dataset.typeWork === "all") {
                li.style.display = "block"                    // конец кода фильтр изображений по категориям
            }
            arr.push(window.getComputedStyle(li).display);
        }    
        let displayBlockFilter = arr.filter(display => display.includes("block"));
        countDisplayBlock = displayBlockFilter.length;       // конец кода опредение кол-ва пунктов списка с дисплей блок   
    }                                                        
    if (countDisplayBlock <= 3) {                            // если картинок после фильтра меньше чем 4   
        worksGallery.classList.add("works-gallery-js");      // то меняем дисплей грид с (4, 1fr) на флекс; 
    } else {
        worksGallery.classList.remove("works-gallery-js");   // и наоборот
    }
})


// hover on work section nav -> change images list in work section. Appropriate category - light, other categories - dark
// по наведению на категорию - картинки других категорий получают затемнение
    workList.addEventListener("mouseover", (evt) => {
        const galleryImgs = document.querySelectorAll(".work .gallery-img")
        if (countDisplayBlock >= 12) {
        let target = evt.target;
        if (target.tagName === "LI" && target.dataset.typeWork !== "all") {
            let data = target.dataset.typeWork
            for (img of galleryImgs) {
                if (img.dataset.typeWork !== data) {
                    img.style.filter = "brightness(25%)";
                }
            }
        }}
    })
    workList.addEventListener("mouseout", (evt) => {
        const galleryImgs = document.querySelectorAll(".work .gallery-img")
        if (evt.target.tagName === "LI") {
            for (img of galleryImgs) {
                img.style.filter = "brightness(100%)";
            }
        }
    })


const btnLoad = document.querySelector(".work .load-btn");
console.log(btnLoad);

btnLoad.addEventListener("click", loadImgs)

function loadImgs() {
    const worksGallery = document.querySelector(".works-gallery")
    for (let i = 1; i <= 12; i += 1) {
        
        let li = document.createElement("li");
        li.classList.add("gallery-item")
        worksGallery.append(li);

        let img = document.createElement("img");
        img.classList.add("gallery-img");
        li.append(img);

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
        if (i <=3) {
            li.setAttribute("data-type-Work", "gd");
            img.setAttribute("src", `./img/img-base/gd/gd-${i}.jpg`)
            img.setAttribute("data-type-Work", "gd");
        } else if (i > 3 && i <= 6) {
            li.setAttribute("data-type-Work", "wd");
            img.setAttribute("src", `./img/img-base/wd/wd-${i-3}.jpg`)
            img.setAttribute("data-type-Work", "wd");
        } else if (i > 6 && i <= 9) {
            li.setAttribute("data-type-Work", "lp");
            img.setAttribute("src", `./img/img-base/lp/lp-${i-6}.jpg`)
            img.setAttribute("data-type-Work", "lp");
        } else if (i > 9 && i <= 12) {
            li.setAttribute("data-type-Work", "wp");
            img.setAttribute("src", `./img/img-base/wp/wp-${i-9}.jpg`)
            img.setAttribute("data-type-Work", "wp");            
        }
    }
}