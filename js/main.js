// add pop-up to work section for every teg "li";
// чтобы не дублировать в разметке 12раз один и тот-же pop-up для каждого li  
//перенес его в js, одна и та же разметка вставляется для каждого li.
window.addEventListener("DOMContentLoaded", addTegs);
function addTegs() { 
    const galleryItems = document.querySelectorAll(".work .gallery-item");
    const popUp = document.querySelector(".work .pop-up");
    [...galleryItems].slice(1).forEach(li => li.append(popUp.cloneNode(true)));
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
        for (div of servicesDescriptions) {
            div.dataset.service !== target.dataset.service ? 
            div.classList.add("inactive") : div.classList.remove("inactive");
        }
    } 
})




let countDisplayBlock = 12;       // это переменная - счетчик тегов li которые имеют display block (а НЕ "none").
// 1) Так как у меня подсвечиваются картинки соответствующей категории при ховере, а другие затухают
// то после фильтра я убираю эту подсветку т.к. не имеет смысла что то подсвечивать 
// 2) для выравнивания grid repeat (4, fr) или (3, fr);

// filter images visibility by click (on section works)
const workList = document.querySelector(".work-list");
workList.addEventListener("click", (evt) => {
    const galleryItems = document.querySelectorAll(".work .gallery-item");
    const worksGallery = document.querySelector(".works-gallery")
    let target = evt.target;
    if (target.tagName === "LI") {
        for (li of workList.children) {                             // начало - динамическая смена активной вкладки                                 
            if (li.matches(".active")) li.classList.remove("active")
        }
        target.classList.add("active");                             // конец кода - динамическая смена активной вкладки  
        let arr = [];                                               // начало опредение кол-ва пунктов списка с дисплей блок  
        for (li of galleryItems) {                                  // начало - фильтр изображений по категориям   
            li.dataset.typeWork !== target.dataset.typeWork ?
            li.style.display = "none": li.style.display = "block"
            if (target.dataset.typeWork === "all") li.style.display = "block"  // конец кода фильтр изображений по категориям
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
            if (img.dataset.typeWork !== data) img.style.filter = "brightness(25%)";
        }
    }}
})
workList.addEventListener("mouseout", (evt) => {
    const galleryImgs = document.querySelectorAll(".work .gallery-img")
    if (evt.target.tagName === "LI") {
        galleryImgs.forEach(img => img.style.filter = "brightness(100%)")
    }
})




// load images by click on button;
const focusLink = document.querySelector(".hidden-link")                        // для будущей имитации клика по которому перейдем на якорь
const btnLoad = document.querySelector(".work .load-btn");                      // находим кнопку
btnLoad.addEventListener("click", loadImgs)                                     // слушатель по клику на кнопку    

function loadImgs() {
    btnLoad.classList.remove("bg-btn-add", "bg-btn-min");                       // удаляем картинку(вместо нее анимация загрузки)
    btnLoad.children[0].style.visibility = "visible";                           // анимация загрузки
    const worksGallery = document.querySelector(".works-gallery");              // список в котором галерея картинок
    let quantLi = worksGallery.children.length;                                 // считаем количество li
    
    setTimeout(() => {                                                      // имитация загрузки 2 секунды
        btnLoad.children[0].style.visibility = "hidden";                    // убираем анимацию загрузки
        btnLoad.classList.add("bg-btn-add");                                // возвращаем картинку    
        if (quantLi < 25) {                                                 // если количество li < 25 добавляем 12 картинок
        let factor = quantLi <= 12 ? 0 : 3                                  // коэфициент, чтобы добавить картинки 1й раз одни а 2й раз другие
            for (let i = 1; i <= 12; i += 1) {                              // клонируем li           
                let li = worksGallery.children[i-1].cloneNode(true);
                let img = li.children[0];  
                worksGallery.append(li);                               

                if (i <= 3) {                                                              // настраиваем категории и ссылки на картинки
                    li.setAttribute("data-type-Work", "gd");
                    img.setAttribute("src", `./img/img-base/gd/gd-${i + factor}.jpg`)      // картинки с 1й по 3ю или с 4й по 6ю из папки gd
                    img.setAttribute("data-type-Work", "gd");
                } else if (i > 3 && i <= 6) {
                    li.setAttribute("data-type-Work", "wd");
                    img.setAttribute("src", `./img/img-base/wd/wd-${i - 3 + factor}.jpg`)  // картинки с 1й по 3ю или с 4й по 6ю из папки wd
                    img.setAttribute("data-type-Work", "wd");
                } else if (i > 6 && i <= 9) {
                    li.setAttribute("data-type-Work", "lp");
                    img.setAttribute("src", `./img/img-base/lp/lp-${i - 6 + factor}.jpg`)  // картинки с 1й по 3ю или с 4й по 6ю из папки lp
                    img.setAttribute("data-type-Work", "lp");
                } else if (i > 9 && i <= 12) {
                    li.setAttribute("data-type-Work", "wp");
                    img.setAttribute("src", `./img/img-base/wp/wp-${i - 9 + factor}.jpg`)  // картинки с 1й по 3ю или с 4й по 6ю из папки wp
                    img.setAttribute("data-type-Work", "wp");
                }
            }
        }
        if (quantLi >= 24) {                                                     // если произошло 2 загрузки       
            btnLoad.classList.replace("bg-btn-add", "bg-btn-min");               // изображение + на -   
            btnLoad.innerHTML = '<i class="loading"></i>MINIMIZE';               // текст кнопки меняем на "свернуть"
        }
        if (quantLi >= 36) {                                                     //если картинок загружено от 36 шт
            [...worksGallery.children].slice(12).forEach(li => li.remove())      // удаляем все li кроме первых 12;
            btnLoad.classList.replace("bg-btn-min", "bg-btn-add");               // возвращаем картинку +
            btnLoad.innerHTML = '<i class="loading"></i>LOAD MORE'               // возвращаем кнопке текст "загрузить еще"
            focusLink.click();                                                   // имитируем клик на якорь, иначе экран остается внизу;
        }
    }, 2000);
}