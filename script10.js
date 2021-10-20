
const container = document.querySelector(".content-container");
container.addEventListener('click', deploy);

function deploy(e) {
    const image = e.target;
    if (image.classList.contains("small-picture")) {
        let ar = document.getElementsByClassName("big-picture");
        if (ar.length < 4) {
            const bigs = document.querySelector(".big-pictures");
            const newbig = document.querySelector(".big-picture:last-child");
            newbig.src = image.src;
            newbig.classList.add("move");
            const copy = newbig.cloneNode(true);
            copy.classList.remove("move");
            bigs.appendChild(copy);
        } else {
            const bigs = document.querySelector(".big-pictures");
            const newbig = document.querySelector(".big-picture:last-child");
            newbig.src = image.src;
            newbig.classList.add("move");
            const copy = newbig.cloneNode(true);
            copy.classList.remove("move");
            bigs.appendChild(copy);
            const oldbig = document.querySelector(".big-picture:nth-child(2)");
            bigs.removeChild(oldbig);
        }
    }
}