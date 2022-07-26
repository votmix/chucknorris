var baseCategory = 'celebrity';
var localStorage = window.localStorage;
var search_input = document.getElementById('search_input');
var list = document.getElementById("joke-list");

document.addEventListener('DOMContentLoaded', function () {
    getByCategories(baseCategory);
    getFreeTextSearch();
    filter();
    removeListItem();
    getCategoriesList();
    changeCategoryList();
    templateFavourite();
    favouriteJoke();
    parseTime();

});

function filter() {
    let buttonGetJoke = document.getElementById('get-joke');
    let filters = document.getElementsByClassName('filter');

    buttonGetJoke.onclick = function () {
        for (let i = 0; i < filters.length; i++) {
            if (filters[i].checked === true) {
                filterMenu(filters[i].value);
            }
        }
    }
}

function filterMenu(value = '') {
    switch (value) {
        case 'random':
            getRandom();
            break;
        case 'category':
            getByCategories();
            break;
        case 'search':
            getFreeTextSearch();
            break;
    }
}

function changeFunctions(obj) {
    let categoryList = document.getElementById("category-block");

    if (obj.value === 'search') {
        search_input.classList.add("d-block");
        search_input.classList.remove("d-none");
        categoryList.classList.add("d-none");
        categoryList.classList.remove("d-block");
    }

    if (obj.value === 'category') {
        categoryList.classList.add("d-block");
        categoryList.classList.remove("d-none");
        search_input.classList.add("d-none");
        search_input.classList.remove("d-block");
    }
    if (obj.value === 'random') {
        search_input.classList.add("d-none");
        search_input.classList.remove("d-block");
    }
}

function getCategoriesList() {
    let url = 'https://api.chucknorris.io/jokes/categories';
    sendRequestAPI(url, templateCategoryList);
}

function changeCategoryList() {
    let categoryList = document.getElementById("category-list");
    let category = document.getElementsByClassName("choice");

    categoryList.addEventListener('click', function (event) {
        category[0].classList.remove("choice");
        event.target.classList.add("choice");
    });
}

function clearSearchInput() {

    search_input.value = '';
}

function getRandom() {
    clearSearchInput();

    let url = 'https://api.chucknorris.io/jokes/random';
    sendRequestAPI(url, template);
}

function getByCategories(category = '') {
    clearSearchInput();

    let url = '';

    if (!category) {
        category = document.getElementsByClassName("choice");
        category = category[0].dataset.category;
    }

    url = 'https://api.chucknorris.io/jokes/random?category=' + category;
    sendRequestAPI(url, template);
}

function getFreeTextSearch() {

    if (search_input.value.length >= 3) {
        let url = 'https://api.chucknorris.io/jokes/search?query=' + search_input.value;
        sendRequestAPI(url, templateElasticSearch);
    }
}

function template(data = '') {
    let html = '';
    let localData = [];
    let like = false;

    localData = getLocalStorageItem();

    for (let i = 0; i < localData.length; i++) {
        if (localData[i]['id'] === data['id']) {
            like = true;
            break;
        } else {
            like = false;
        }
    }
    if (like) {
        html += templateNew(data, true, 'list-block');
    } else {
        html += templateNew(data, false, 'list-block');
    }

    list.innerHTML = html;
}

function getCurrentTime() {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    return date + ' ' + time;
}

function parseTime(date = '', today = '') {

    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const year = day * 365;

    let dateOld = Date.parse(date);
    let hourOld = Math.round(dateOld / hour);

    let dateCurrent = Date.parse(today);
    let hoursCurrent = Math.round(dateCurrent / hour);

    return hoursCurrent - hourOld;
}

function templateNew(data = '', check = '', nameClass = '') {
    let html = '';
    let today = getCurrentTime();

    html =
        '<div class="row ' + nameClass + '">' +
        '<div class="col-12 d-flex justify-content-end">' +
        (check ?
                '<img class="mark-image mark" src="/public/images/heart/full_heart_icon_20.png" alt="">' :
                !check ? '<img class="mark-image unmark" src="/public/images/heart/empty_heart_icon_20.png" alt="">' : ''
        ) +
        '</div>' +
        '<div class="col-2 text-end">' +
        '<img class="img-fluid talk-icon" src="/public/images/social/message_talk_icon.jpg" alt="">' +
        '</div>' +
        '<div class="col-10">' +
        '<p id="id" data-id="' + data['id'] + '">' +
        '<a target="_blank" id="url" data-url="' + data['url'] + '" href="' + data['url'] + '">' + data['id'] +
        '<img src="/public/images/navigation/move_icon_10.png" alt="">' +
        '</a>' +
        '</p>' +
        '<p id="value" data-value="' + data['value'] + '">' + data['value'] + '</p>' +
        '<div class="row">' +
        '<div class="col-12 col-md-6">' +
        '<p id="update" data-update="' + data['updated_at'] + '">' +
        'Last update: ' + parseTime(data['updated_at'], today) + ' hours ago' +
        '</p>' +
        '</div>' +
        '<div class="col-12 col-md-6">' +
        '<p class="category text-md-end">' +
        (data['categories'] ? data['categories'] : '') +
        '</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';

    return html;
}

function templateElasticSearch(data = '', selector = '') {

    let html = '';
    let localData = [];

    localData = getLocalStorageItem();

    for (let i = 0; i < data['result'].length; i++) {
        for (let j = 0; j < localData.length; j++) {
            if (data['result'][i]['id'] === localData[j]['id']) {
                html += templateNew(data['result'][i], true, 'list-block');
                break;
            } else {
                html += templateNew(data['result'][i], false, 'list-block');
                break;
            }
        }
    }

    list.innerHTML = html;
}

function templateCategoryList(data) {
    let html = '';
    let list = document.getElementById('category-list');
    let categories = ['animal', 'celebrity', 'career', 'dev'];

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < categories.length; j++) {
            if (data[i] === categories[j] && data[i] !== baseCategory) {
                html +=
                    '<div class="col name base-font-params" data-category="' + data[i] + '">' +
                    data[i] +
                    '</div>';
            } else if (data[i] === categories[j] && data[i] === baseCategory) {
                html +=
                    '<div class="col name base-font-params choice" data-category="' + data[i] + '">' +
                    data[i] +
                    '</div>';
            }
        }
    }

    list.innerHTML = html;
}

function templateFavourite() {

    let html = '';
    let list = document.getElementById("favourite-list");
    let data = [];

    data = getLocalStorageItem();

    if (data !== null) {
        for (let i = 0; i < data.length; i++) {
            html += templateNew(data[i], true, 'list-block-favourite');
        }
    }

    list.innerHTML = html;
}

function addNewItem(data = '') {
    let html = '';
    let list = document.getElementById("favourite-list");

    html = templateNew(data, true, 'list-block-favourite');

    list.insertAdjacentHTML('beforeend', html);
}

function removeItem(id = '') {
    let favouriteList = document.getElementsByClassName("list-block-favourite");

    for (let i = 0; i < favouriteList.length; i++) {
        if (favouriteList[i].querySelector("#id").dataset.id === id) {
            favouriteList[i].remove();
        }
    }
}

function removeListItem() {
    let list = document.getElementById("favourite-list");
    let target;
    let listBlock = '';
    let removeJokeID = '';
    let jokeID = '';
    let jokeImg = '';
    let listJoke = document.getElementsByClassName("list-block");
    let unmarkImageUrl = '/public/images/heart/empty_heart_icon_20.png';

    list.addEventListener('click', function (event) {
        target = event.target;

        if (target.classList.contains('mark')) {
            listBlock = target.closest(".list-block-favourite");
            removeJokeID = listBlock.querySelector("#id").dataset.id;
            removeLocalStorageItem(removeJokeID);
            listBlock.remove();
        }

        for (let i = 0; i < listJoke.length; i++) {
            jokeID = listJoke[i].querySelector("#id").dataset.id;
            if (jokeID === removeJokeID) {
                jokeImg = listJoke[i].querySelector(".mark");
                jokeImg.src = unmarkImageUrl;
                jokeImg.classList.add("unmark");
                jokeImg.classList.remove("mark");
            }
        }
    });
}

function favouriteJoke() {

    let id = '';
    let url = '';
    let value = '';
    let updated_at = '';
    let data = [];
    let listBlock = '';
    let markImage = list;
    let target;
    let markImageUrl = '/public/images/heart/full_heart_icon_20.png';
    let unmarkImageUrl = '/public/images/heart/empty_heart_icon_20.png';

    markImage.addEventListener('click', function (event) {
        target = event.target;
        listBlock = target.closest(".list-block");

        if (target.classList.contains("unmark")) {
            target.src = markImageUrl;
            target.classList.remove("unmark");
            target.classList.add("mark");

            id = listBlock.querySelector("#id").dataset.id;
            url = listBlock.querySelector("#url").dataset.url;
            value = listBlock.querySelector("#value").textContent;
            updated_at = listBlock.querySelector("#update").dataset.update;
            data = {"id": id, "url": url, "value": value, "updated_at": updated_at};
            setLocalStorageItem(data);
            addNewItem(data);
        } else if (target.classList.contains("mark")) {
            target.src = unmarkImageUrl;
            target.classList.remove("mark");
            target.classList.add("unmark");

            id = listBlock.querySelector("#id").dataset.id;
            removeLocalStorageItem(id);
            removeItem(id);
        }
    });
}

function getLocalStorageItem() {

    return JSON.parse(localStorage.getItem("object")) || [];
}

function setLocalStorageItem(data = '') {
    let localData = [];

    localData = getLocalStorageItem();
    localData.push(data);
    localStorage.setItem("object", JSON.stringify(localData));
}

function removeLocalStorageItem(id) {
    let localData = [];
    localData = getLocalStorageItem();

    for (let i = 0; i < localData.length; i++) {
        if (localData[i]['id'] === id) {
            localData.splice(i, 1);
        }
    }

    localStorage.setItem("object", JSON.stringify(localData));
}

function sendRequestAPI(url, callback) {

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        callback(JSON.parse(this.responseText));
    }
    xhttp.open("GET", url);
    xhttp.send();
}