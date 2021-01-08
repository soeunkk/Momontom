const search = document.querySelector(".js-search"),
    searchForm = search.querySelector(".js-searchForm"),
    searchInput = searchForm.querySelector("input");


function handleSubmit(event) {
    event.preventDefault();
    const content = searchInput.value;
    searchInput.value="";
    window.location.href=`https://www.google.com/search?q=${content}&sourceid=chrome&ie=UTF-8`;
}

function init() {
    searchForm.addEventListener("submit", handleSubmit);
}

init();