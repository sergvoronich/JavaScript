window.location.hash = "menu";
setTimeout(() => {
    document.querySelector('.wrapper').style.display = "";
    document.querySelector('.navigation').style.display = "";
    document.querySelector('.info').style.display = "";
}, 500);


var links = document.getElementsByTagName('a');
links[0].addEventListener('click', openpage1);



//setTimeout(() => {
//  const script = document.createElement('script');
// cript.src = "main-menu-buttons.js";
//document.body.appendChild(script);
//}, 1000);



function openpage1(e) {
    e.preventDefault()
    window.location.hash = "menu";
}

function openpage2(e) {
    e.preventDefault()
    window.location.hash = "hiscore";
}

function openpage3(e) {
    e.preventDefault()
    window.location.hash = "rules";
}

function openpage4(e) {
    e.preventDefault()
    window.location.hash = "settings";
}

function openinitialpage(e) {
    e.preventDefault()
    window.location.hash = "";
}



function renderNewPage(data) {
    var container = document.getElementById('new-pages-container');
    container.innerHTML = data;
}

function renderInitialPage() {
    var container = document.getElementById('new-pages-container');
    container.innerHTML = "";
}

function updatePage() {
    var hash = location.hash.substr(1);

    switch (hash) {
        case 'menu':
            $.ajax(hash + '.html', {
                type: "GET",
                dataType: "html",
                success: renderNewPage
            });
            setTimeout(mainMenu, 500);
            break;
        case 'hiscore':
            $.ajax(hash + '.html', {
                type: "GET",
                dataType: "html",
                success: renderNewPage
            })
            setTimeout(childMenu, 500);
            break;
        case 'rules':
            $.ajax(hash + '.html', {
                type: "GET",
                dataType: "html",
                success: renderNewPage
            })
            setTimeout(childMenu, 500);
            break;
        case 'settings':
            $.ajax(hash + '.html', {
                type: "GET",
                dataType: "html",
                success: renderNewPage
            })
            setTimeout(childMenu, 500);
            break;
        case '':
            $.ajax('index.html', {
                type: "GET",
                dataType: "html",
                success: renderInitialPage
            })
            break;
    }

}

function mainMenu() {
    const play = document.querySelector(".play");
    const rules = document.querySelector(".rules");
    const settings = document.querySelector(".settings");
    const hiscore = document.querySelector(".hiscore");
    play.addEventListener('click', openinitialpage);
    rules.addEventListener('click', openpage3);
    settings.addEventListener('click', openpage4);
    hiscore.addEventListener('click', openpage2);
}

function childMenu() {
    const mainMenu = document.querySelector(".back-to-main-menu");
    mainMenu.addEventListener('click', openpage1);
}




window.onhashchange = updatePage;
window.addEventListener('DOMContentLoaded', updatePage);

