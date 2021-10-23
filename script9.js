const container = document.getElementById("container");

container.addEventListener('mousedown', move, true);

let counter = 1;

function move(event) {
    const image = event.target;
    const shiftY = event.pageY - image.getBoundingClientRect().top;
    const shiftX = event.pageX - image.getBoundingClientRect().left;
    image.style.position = 'absolute';
    image.style.zIndex = counter;
    image.style.left = event.pageX - shiftX + "px";
    image.style.top = event.pageY - shiftY + "px";

    if (event.target.tagName != "IMG") {
        return;
    }

    image.ondragstart = (event) => {
        event.preventDefault();
    }

    document.onmousemove = (event) => {
        image.style.left = event.pageX - shiftX + "px";
        image.style.top = event.pageY - shiftY + "px";
    }

    document.onmouseup = (event) => {
        document.onmousemove = null;
        counter++;
    }



}
