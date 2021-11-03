
let dot1 = document.getElementById("dot1");
let horiz = 0;
let vert = 0;
let timer;
let speed = 5;

function moveDot() {
    if (horiz <= (568) && vert == 0) {
        horiz += speed;
        dot1.style.left = horiz + "px";
        timer = requestAnimationFrame(moveDot);
    } else if (vert <= (208) && horiz > 30) {
        vert += speed;
        dot1.style.top = vert + "px";
        timer = requestAnimationFrame(moveDot);
    } else if (horiz >= 2) {
        horiz -= speed;
        dot1.style.left = horiz + "px";
        timer = requestAnimationFrame(moveDot);
    } else if (vert >= 2) {
        vert -= speed;
        dot1.style.top = vert + "px";
        timer = requestAnimationFrame(moveDot);
    }
}

const button = document.querySelector(".button");
const button2 = document.querySelector(".button2");
button.addEventListener('click', startMove);
button2.addEventListener('click', stopMove);

function startMove() {
    cancelAnimationFrame(timer);
    timer = requestAnimationFrame(moveDot);
}

function stopMove() {
    cancelAnimationFrame(timer);
}

