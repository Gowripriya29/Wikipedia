let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    let { link, title, description } = result;

    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");

    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");

    let urlEl = document.createElement("a");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    urlEl.classList.add("result-url");

    let descriptionEl = document.createElement("p");
    descriptionEl.textContent = description;
    descriptionEl.classList.add("link-description");

    resultItemEl.append(titleEl, document.createElement("br"), urlEl, document.createElement("br"), descriptionEl);
    searchResultsEl.appendChild(resultItemEl);
}

function displayResults(searchResults) {
    spinnerEl.classList.add("d-none");
    searchResults.forEach(createAndAppendSearchResult);
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        let searchInput = searchInputEl.value.trim();

        if (searchInput === "") {
            alert("Please enter a search term!");
            return;
        }

        spinnerEl.classList.remove("d-none");
        searchResultsEl.innerHTML = "";

        let url = `https://apis.ccbp.in/wiki-search?search=${searchInput}`;
        fetch(url)
            .then(response => response.json())
            .then(jsonData => {
                displayResults(jsonData.search_results);
            })
            .catch(error => {
                alert("Failed to fetch results. Please try again!");
                console.error("API Error:", error);
                spinnerEl.classList.add("d-none");
            });
    }
}

searchInputEl.addEventListener("keydown", searchWikipedia);
