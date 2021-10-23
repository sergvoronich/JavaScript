const container = document.querySelector(".content-container");
const bigimage = document.querySelector(".big-picture");
container.addEventListener('click', deploy);

function deploy(e) {
    const image = e.target;
    if (image.classList.contains("small-picture")) {
        bigimage.src = image.src;
    }
}
