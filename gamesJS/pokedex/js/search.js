const inputElement = document.querySelector("#searchInput");
const searchIcon = document.querySelector("#search-close-icon");
const sortWrapper = document.querySelector(".sortWrapper");

inputElement.addEventListener("input", () => {
    handleInputChange(inputElement);
});
searchIcon.addEventListener("click", handleSearchCloseOnClick);
sort_wrapper.addEventListener("click", handleSortIconOnClick);

function handleInputChange(inputElement) {
    const inputValue = inputElement.value;

    if (inputValue !== "") {
        document
            .querySelector("#search-close-icon")
            .classList.add("search-close-icon-visible");
    } else {
        document
            .querySelector("#search-close-icon")
            .classList.remove("search-close-icon-visible");
    }
}

function handleSearchCloseOnClick() {
    document.querySelector("#searchInput").value = "";
    document
        .querySelector("#search-close-icon")
        .classList.remove("search-close-icon-visible");
}

function handleSortIconOnClick() {
    document
        .querySelector(".filterWrapper")
        .classList.toggle("filter-wrapper-open");
    document.querySelector("body").classList.toggle("filter-wrapper-overlay");
}