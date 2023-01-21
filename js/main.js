// ховер searh-icon
const searchIcon = document.querySelector(".nav-search-icon");
console.log(searchIcon);
searchIcon.addEventListener("mouseover", ()=> {
    searchIcon.setAttribute("src" , "./img/header/xxx.png");
})
searchIcon.addEventListener("mouseout", ()=> {
    searchIcon.setAttribute("src" , "./img/header/search-icon.png");
})
