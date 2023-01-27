// ADD POP-UP TO WORK SECTION FOR EVERY TEG "LI";
// чтобы не дублировать в разметке 12раз один и тот-же pop-up для каждого li  
//перенес его в js, одна и та же разметка вставляется для каждого li.
window.addEventListener("DOMContentLoaded", addTegs);
function addTegs() { 
    const galleryItems = document.querySelectorAll(".work .gallery-item");
    const popUp = document.querySelector(".work .pop-up");
    [...galleryItems].slice(1).forEach(li => li.append(popUp.cloneNode(true)));
}




// HOVER SEARCH ICON - замена иконки ув стекла по наведению (хедер навбар)
const searchIcon = document.querySelector(".nav-search-icon");
searchIcon.addEventListener("mouseover", ()=> {
    searchIcon.setAttribute("src" , "./img/header/search-icon-hover.png");
})
searchIcon.addEventListener("mouseout", ()=> {
    searchIcon.setAttribute("src" , "./img/header/search-icon.png");
})




// SWITCHING TABS OF THE SERVICES SECTION
const servicesList = document.querySelector(".services-list");
const servicesDescriptions = document.querySelectorAll(".services-description");

servicesList.addEventListener("click", (evt) => {
    let target = evt.target;
    let prevActive = document.querySelector(".services-list-item.active");
    prevActive.classList.remove("active");
    target.classList.add("active");
    servicesDescriptions.forEach(div => div.dataset.service !== target.dataset.service ?
        div.classList.add("inactive") : div.classList.remove("inactive"))
})




let countDisplayBlock = 12;       // это переменная - счетчик тегов li которые имеют display block (а НЕ "none").
// 1) Так как у меня подсвечиваются картинки соответствующей категории при ховере, а другие затухают
// то после фильтра я убираю эту подсветку т.к. не имеет смысла что то подсвечивать 
// 2) для выравнивания grid repeat (4, fr) или (3, fr);

// FILTER IMAGES VISIBILITY BY CLICK ON APPROPRIATE LIST ITEM
const workList = document.querySelector(".work-list");
workList.addEventListener("click", (evt) => {
    const galleryItems = document.querySelectorAll(".work .gallery-item");
    const worksGallery = document.querySelector(".works-gallery")
    let target = evt.target;
    for (let li of workList.children) {                             // начало - динамическая смена активной вкладки
        if (li.matches(".active")) li.classList.remove("active")
    }
    target.classList.add("active");                             // конец кода - динамическая смена активной вкладки
    let arr = [];                                               // начало опредение кол-ва li с дисплей блок 
    for (let li of galleryItems) {
        li.dataset.typeWork !== target.dataset.typeWork ?
        li.style.display = "none": li.style.display = "block"   // фильтр изображений по категориям
        if (target.dataset.typeWork === "all") li.style.display = "block";  // конец кода фильтр изображений по категориям
        arr.push(window.getComputedStyle(li).display);
    }    
    countDisplayBlock = arr.filter(display => display.includes("block")).length; // конец кода кол-во li с дисплей блок
    (countDisplayBlock <= 3 || countDisplayBlock % 4 !== 0) ?    // если см.условие
    worksGallery.classList.add("works-gallery-js") :             // то меняем дисплей грид с (4, 1fr) на (3, 1fr), для более оптимального отображения.
    worksGallery.classList.remove("works-gallery-js");           // и наоборот;
})




// hover on work section nav -> change images list in work section. Appropriate category - light, other categories - dark
// по наведению на категорию - картинки других категорий получают затемнение.
workList.addEventListener("mouseover", (evt) => {
    const galleryImgs = document.querySelectorAll(".work .gallery-img")
    let target = evt.target;
    if (countDisplayBlock >= 12 && target.tagName === "LI" && target.dataset.typeWork !== "all") {
        for (let img of galleryImgs) {
            if (img.dataset.typeWork !== target.dataset.typeWork) 
            img.style.filter = "brightness(25%)";
        }
    }
})
workList.addEventListener("mouseout", (evt) => {
    const galleryImgs = document.querySelectorAll(".work .gallery-img")
    galleryImgs.forEach(img => img.style.filter = "brightness(100%)")
})




// LOAD IMAGES BY CLICK ON BUTTON;
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
                worksGallery.append(li);
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



// DISPLAY ELEMENT ON CLICK ON ICON
const usersList = document.querySelector(".users-list");
usersList.addEventListener("click", carouselIcon) 

function carouselIcon(evt) {
    if (evt.target.tagName === "IMG") {
        let target = evt.target
        const usersCards = document.querySelectorAll(".user-feedback");
        let prevActive = document.querySelector(".feedback .user-img.active");
        prevActive.classList.remove("active");
        target.classList.add("active");
        usersCards[0].classList.add("inactive");
        for (let userCard of usersCards) {
            target.dataset.userId !== userCard.dataset.userId ?
                userCard.classList.replace("move", "inactive"):
                userCard.classList.add("move");
        }
    }
}

// DISPLAY ELEMENT ON CLICK ON BUTTON

const btnL = document.querySelector(".feedback button.arrow-left");
const btnR = document.querySelector(".feedback button.arrow-right");
btnL.addEventListener("click", carouselBtnL);
btnR.addEventListener("click", carouselBtnR);

function carouselBtnL() {
    const usersCards = document.querySelectorAll(".user-feedback");   // находим все дивы которые будут меняться    
    const imgs = document.querySelectorAll(".feedback .user-img");    // находим все картинки - иконки малые внизу  
    const prevActiveImg = document.querySelector(".feedback .user-img.active"); // находим активную img, кот была до клика
    const prevActiveImgIndex = ([...imgs].indexOf(prevActiveImg));    //  находим её индекс
    prevActiveImg.classList.remove("active");                         // удаляем класс эктив с img которая был до клика  
    let newActiveImg;                                                 // новая активная img 
    if (prevActiveImgIndex === 0) {                                   // если индекс img, кот была до клика = 0 
        newActiveImg = imgs[imgs.length -1];                          // новая активная img это img c последним индексом  
        imgs[imgs.length -1].classList.add("active");
    }                                                                 // приваиваем ей класс эктив  
    else {                                                            // иначе  
        newActiveImg = imgs[prevActiveImgIndex - 1]                   // новая активная img это img c индексом предыдущей - 1  
        imgs[prevActiveImgIndex - 1].classList.add("active")          // тогда присваиваем ей класс эктив 
    }
    usersCards[0].classList.add("inactive");
    for (let userCard of usersCards) {                                // пробегаемся циклом по всем дивам  
        newActiveImg.dataset.userId !== userCard.dataset.userId ?     // датасеты НЕ совпадают ?  
            userCard.classList.replace("move", "inactive"):           // всем дивам оставаться не видимыми  
            userCard.classList.add("move");                           // если совпадают - именно этот див будет видимым  
    }
}

function carouselBtnR() {
    const usersCards = document.querySelectorAll(".user-feedback");     
    const imgs = document.querySelectorAll(".feedback .user-img");  
    const prevActiveImg = document.querySelector(".feedback .user-img.active");
    const prevActiveImgIndex = ([...imgs].indexOf(prevActiveImg));
    prevActiveImg.classList.remove("active");
    let newActiveImg;
    if (prevActiveImgIndex === imgs.length -1) {
        newActiveImg = imgs[0];
        imgs[0].classList.add("active");
    } else {
        newActiveImg = imgs[prevActiveImgIndex + 1]
        imgs[prevActiveImgIndex + 1].classList.add("active")
    }
    usersCards[0].classList.add("inactive");
    for (let userCard of usersCards) {
        newActiveImg.dataset.userId !== userCard.dataset.userId ?
            userCard.classList.replace("move", "inactive"):
            userCard.classList.add("move");
    }
}