document.addEventListener('DOMContentLoaded', function () {
    menu();
});

function menu() {
    if (window.matchMedia("(max-width: 767px)").matches) {
        toggle(window.innerWidth);
    }

    if (window.matchMedia("(min-width: 768px)").matches) {
        toggle(window.innerWidth / 2, 0);
    }
}

function toggle(width = '', right = '') {
    let menuIcon = document.getElementById("show-menu");
    let favouriteBlock = document.getElementById("favourite");
    let openMenuUrlIcon = '/public/images/menu/menu_navigation_icon.png';
    let closeMenuUrlIcon = '/public/images/menu/menu_navigation_close_icon.png';

    menuIcon.onclick = function () {
        if (favouriteBlock.classList.contains("d-none")) {
            menuIcon.src = closeMenuUrlIcon;
            favouriteBlock.classList.add("d-block");
            favouriteBlock.classList.remove("d-none");
            favouriteBlock.style.position = "absolute";
            favouriteBlock.style.marginTop = "88px";
            favouriteBlock.style.right = right + "px";
            favouriteBlock.style.width = width + "px";
        } else {
            menuIcon.src = openMenuUrlIcon;
            favouriteBlock.classList.add("d-none");
            favouriteBlock.classList.remove("d-block");
            favouriteBlock.style.position = "";
            favouriteBlock.style.marginTop = "";
            favouriteBlock.style.width = "";
        }
    }
}


// document.addEventListener('DOMContentLoaded', function () {
//     toggleMenu();
// });
//
// function toggleMenu() {
//     let menuIcon = document.getElementById("show-menu");
//     let favouriteBlock = document.getElementById("favourite");
//     let openMenuUrlIcon = '/public/images/menu/menu_navigation_icon.png';
//     let closeMenuUrlIcon = '/public/images/menu/menu_navigation_close_icon.png';
//     let width = '';
//     let height = '';
//
//     menuIcon.onclick = function () {
//         if (window.matchMedia("(max-width: 767px)").matches) {
//
//             if (favouriteBlock.classList.contains("d-none")) {
//                 menuIcon.src = closeMenuUrlIcon;
//                 favouriteBlock.classList.add("d-block");
//                 favouriteBlock.classList.remove("d-none");
//                 favouriteBlock.style.position = "absolute";
//                 favouriteBlock.style.marginTop = "88px";
//                 favouriteBlock.style.width = window.innerWidth + "px";
//             } else {
//                 menuIcon.src = openMenuUrlIcon;
//                 favouriteBlock.classList.add("d-none");
//                 favouriteBlock.classList.remove("d-block");
//                 favouriteBlock.style.position = "";
//                 favouriteBlock.style.marginTop = "";
//                 favouriteBlock.style.width = "";
//             }
//             console.log('320');
//         }
//
//         if (window.matchMedia("(min-width: 768px)").matches) {
//
//             if (favouriteBlock.classList.contains("d-none")) {
//                 menuIcon.src = closeMenuUrlIcon;
//                 favouriteBlock.classList.add("d-block");
//                 favouriteBlock.classList.remove("d-none");
//                 favouriteBlock.style.position = "absolute";
//                 favouriteBlock.style.right = "0";
//                 favouriteBlock.style.marginTop = "88px";
//                 favouriteBlock.style.width = window.innerWidth / 2 + "px";
//             } else {
//                 menuIcon.src = openMenuUrlIcon;
//                 favouriteBlock.classList.add("d-none");
//                 favouriteBlock.classList.remove("d-block");
//                 favouriteBlock.style.position = "";
//                 favouriteBlock.style.marginTop = "";
//                 favouriteBlock.style.width = "";
//             }
//             console.log('768');
//         }
//     }
// }
//
// function menu() {
//
// }