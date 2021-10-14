let inputContainer = document.querySelector(".filter-body");

function addFilter() {
    let content = document.querySelector("input").value;
    let filterElement = document.createElement("div");
    filterElement.classList.add("filter__item");
    let close = document.createElement("div");
    close.classList.add("close");
    close.textContent = "X";
    let text = document.createElement("p");
    text.classList.add("text");
    text.textContent = content;

    filterElement.appendChild(text);
    filterElement.appendChild(close);
    inputContainer.appendChild(filterElement);

    document.querySelector("input").value = "";
}


let button = document.querySelector("button");
button.addEventListener("click", addFilter);

function removeFilter(e) {
    e.currentTarget.removeChild(e.target.parentNode);
}

let closeElements = document.querySelector(".filter-body");
closeElements.addEventListener("click", removeFilter);




