
const container = document.querySelector(".content-container");
const bigimage = document.querySelector(".big-picture");
container.addEventListener('click', deploy);

function deploy(e) {
    const image = e.target;
    if (image.classList.contains("small-picture")) {
        bigimage.src = image.src;
    }
    var event = new CustomEvent("deploy", {
        detail: { image: e.target }
    });
    document.dispatchEvent(event);

}

let text = document.getElementsByTagName("h1")[0];

document.addEventListener('deploy', changeText);

function changeText(e) {
    let images = document.getElementsByClassName("small-picture");
    for (let i = 0; i < images.length; i++) {
        if (images[i] == e.detail.image) {
            text.textContent = `Image ${i + 1}`;
        }
    };
}