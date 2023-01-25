// add hidding content to work section for every teg "li";
// чтобы не дублировать в разметке 12раз один и тот-же блок для каждого li (блок анимация - выезжает при ховере), 
//перенес его в js, одна и та же разметка вставляется для каждого li.
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




let countDisplayBlock = 12;       // это переменная - счетичик тегов li которые имеют display block (а НЕ "none").
//Так как у меня подсвечиваются картинки соответствующей категории при ховере, а другие затухают
// то после фильтра я убираю эту подсветку т.к. не имеет смысла что то подсвечивать, потому что
// после клика уже все отфильтровано по конкретной категории. А так же для выравнивания grid repeat (4, fr) или (3, fr);

// filter images visibility by click (on section works)
const workList = document.querySelector(".work-list");
workList.addEventListener("click", (evt) => {
    const galleryItems = document.querySelectorAll(".work .gallery-item");
    const worksGallery = document.querySelector(".works-gallery")
    let target = evt.target;
    if (target.tagName === "LI") {
        for (li of workList.children) {                             // начало - динамическая смена активной вкладки                                 
            if (li.matches(".active")) {
                li.classList.remove("active")
            }
        }
        target.classList.add("active");                             // конец кода - динамическая смена активной вкладки  
        let arr = [];                                               // начало опредение кол-ва пунктов списка с дисплей блок  
        for (li of galleryItems) {                                  // начало - фильтр изображений по категориям   
            if (li.dataset.typeWork !== target.dataset.typeWork) {
                li.style.display = "none";
            } else {li.style.display = "block"}
            if (target.dataset.typeWork === "all") {
                li.style.display = "block"                          // конец кода фильтр изображений по категориям
            }
            arr.push(window.getComputedStyle(li).display);
        }    
        let displayBlockFilter = arr.filter(display => display.includes("block"));
        countDisplayBlock = displayBlockFilter.length;              // конец кода опредение кол-ва пунктов списка с дисплей блок   
    }                                                        
    if (countDisplayBlock <= 3 || countDisplayBlock % 4 !== 0) {    // если см.условие 
        worksGallery.classList.add("works-gallery-js");             // то меняем дисплей грид с (4, 1fr) на (3, 1fr), для более опимального отображения. 
    } else {
        worksGallery.classList.remove("works-gallery-js");          // и наоборот;
    }
})




// hover on work section nav -> change images list in work section. Appropriate category - light, other categories - dark
// по наведению на категорию - картинки других категорий получают затемнение.
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




// load images by click on button;
const focusLink = document.querySelector(".hidden-link")                                // для будущей имитации клика по которому перейдем на якорь
const btnLoad = document.querySelector(".work .load-btn");
btnLoad.addEventListener("click", loadImgs)

function loadImgs() {
    btnLoad.style.backgroundImage = "none";
    btnLoad.children[0].style.visibility = "visible";
    const worksGallery = document.querySelector(".works-gallery");                      // список в котором галерея картинок
    let quantLi = worksGallery.children.length;                                         // считаем количество li
    
        setTimeout(() => {                                                              // имитация загрузки
            btnLoad.children[0].style.visibility = "hidden";
            btnLoad.style.backgroundImage = 'url("../img/work/plus.png")';
            if (quantLi < 25) {                                                         // если количество li < 25 добавляем 12 картинок
            let factor = quantLi <= 12 ? 0 : 3                                          // коэфициент, чтобы добавить картинки 1й раз одни а 2й раз другие
            for (let i = 1; i <= 12; i += 1) {                                          // добавляем 12 li с картинками, разметкой, классом, атрибутом            
                
                let li = document.createElement("li");                                  // создаем li и втавляем в список
                li.classList.add("gallery-item")
                worksGallery.append(li);

                let img = document.createElement("img");                                // создаем img и вставляем в li
                img.classList.add("gallery-img");
                li.append(img);

                let div = document.createElement("div");                                // создаем div и втавляем под img (ховер анимация)
                div.innerHTML = `                                                               
                <div>
                    <div class="circle"><img class="chain" src="./img/work/chain.png" alt="chain"></div>
                    <div class="circle"><img class="quater" src="./img/work/quater.png" alt="quater"></div>
                </div>
                <p class="cd-text">CREATIVE DESIGN</p>
                <p class="wd-text">Web Design</p>`
                div.classList.add("hidden-options")
                img.after(div);
                if (i <= 3) {
                    li.setAttribute("data-type-Work", "gd");
                    img.setAttribute("src", `./img/img-base/gd/gd-${i + factor}.jpg`)      // картинки с 1й по 3ю или с 4й по 6ю из папки gd
                    img.setAttribute("data-type-Work", "gd");
                } else if (i > 3 && i <= 6) {
                    li.setAttribute("data-type-Work", "wd");
                    img.setAttribute("src", `./img/img-base/wd/wd-${i - 3 + factor}.jpg`) // картинки с 1й по 3ю или с 4й по 6ю из папки wd
                    img.setAttribute("data-type-Work", "wd");
                } else if (i > 6 && i <= 9) {
                    li.setAttribute("data-type-Work", "lp");
                    img.setAttribute("src", `./img/img-base/lp/lp-${i - 6 + factor}.jpg`)  // картинки с 1й по 3ю или с 4й по 6ю из папки lp
                    img.setAttribute("data-type-Work", "lp");
                } else if (i > 9 && i <= 12) {
                    li.setAttribute("data-type-Work", "wp");
                    img.setAttribute("src", `./img/img-base/wp/wp-${i - 9 + factor}.jpg`) // картинки с 1й по 3ю или с 4й по 6ю из папки wp
                    img.setAttribute("data-type-Work", "wp");
                }
            }
        }
        if (quantLi >= 24) {                                                         // если произошло 2 загрузки       
            btnLoad.style.backgroundImage = 'url("../img/work/sub.png")';            // изображение + на -   
            btnLoad.innerHTML = '<i class="loading"></i>MINIMIZE';                   // текст кнопки меняем на "свернуть"
        }
        if (quantLi >= 36) {                                                         //если картинок загружено от 36 шт
            [...worksGallery.children].forEach((li, i) => {
                if (i > 11) li.remove()                                              // удаляем все кроме первых 12;
            })
            btnLoad.style.backgroundImage = 'url("../img/work/plus.png")';           // возвращаем картинку +
            btnLoad.innerHTML = '<i class="loading"></i>LOAD MORE'                   // возвращаем кнопке текст "загрузить еще"
            focusLink.click();                                                       // имитируем клик на якорь, иначе экран остается внизу;
        }
    }, 2000);
}