const canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
const span = document.getElementById('count');
let counter = 1;


let pressedKeys = {};
let showSmallElement1 = true;
let showSmallElement2 = true;
let showSmallElement3 = true;

const squareOpts = {
    height: 20,
    width: 20
}

let squareCoords = {
    x: 10,
    y: 10
}


function drawSquare() {
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.strokeRect(squareCoords.x,
        squareCoords.y,
        squareOpts.width,
        squareOpts.height);
}

let anim = null;

function drawCnv() {
    cancelAnimationFrame(anim);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSquare();
    drawSmallElement(smallElemCoord1, showSmallElement1);
    drawSmallElement(smallElemCoord2, showSmallElement2);
    drawSmallElement(smallElemCoord3, showSmallElement3);

    anim = requestAnimationFrame(drawCnv);
}

anim = requestAnimationFrame(drawCnv);

function moveSquare() {
    if (pressedKeys.right) {
        if (squareCoords.x < 280) {
            squareCoords.x += 2;
        }
    }
    if (pressedKeys.left) {
        if (squareCoords.x > 0) {
            squareCoords.x -= 2;
        }
    }
    if (pressedKeys.up) {
        if (squareCoords.y > 0) {
            squareCoords.y -= 2;
        }
    }
    if (pressedKeys.down) {
        if (squareCoords.y < 180) {
            squareCoords.y += 2;
        }
    }

    if (squareCoords.x > smallElemCoord1.x - 8 && squareCoords.x < smallElemCoord1.x + 8
        && squareCoords.y > smallElemCoord1.y - 8 && squareCoords.y < smallElemCoord1.y + 8
        && showSmallElement1) {
        showSmallElement1 = false;
        span.innerHTML = `Съедено квадратиков: ${counter++}`;
    }

    if (squareCoords.x > smallElemCoord2.x - 8 && squareCoords.x < smallElemCoord2.x + 8
        && squareCoords.y > smallElemCoord2.y - 8 && squareCoords.y < smallElemCoord2.y + 8
        && showSmallElement2) {
        showSmallElement2 = false;
        span.innerHTML = `Съедено квадратиков: ${counter++}`;
    }

    if (squareCoords.x > smallElemCoord3.x - 8 && squareCoords.x < smallElemCoord3.x + 8
        && squareCoords.y > smallElemCoord3.y - 8 && squareCoords.y < smallElemCoord3.y + 8
        && showSmallElement3) {
        showSmallElement3 = false;
        span.innerHTML = `Съедено квадратиков: ${counter++}`;
    }
}


const smallElemCoord1 = {
    x: 150,
    y: 12,
    size: 16,
    xinit: 150,
    yinit: 12,
    move: 'vert',
    speed: 0.5,
    movedir: true
}

const smallElemCoord2 = {
    x: 200,
    y: 172,
    size: 16,
    xinit: 200,
    yinit: 172,
    move: 'horiz',
    speed: 0.3,
    movedir: true
}

const smallElemCoord3 = {
    x: 25,
    y: 100,
    size: 16,
    xinit: 25,
    yinit: 100,
    move: 'horiz',
    speed: 0.7,
    movedir: true
}

function drawSmallElement(smallElemCoord, showSmallElement) {
    if (showSmallElement) {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 1;
        ctx.strokeRect(smallElemCoord.x,
            smallElemCoord.y,
            smallElemCoord.size,
            smallElemCoord.size);
        if (smallElemCoord.move == "horiz") {
            moveSmallElemHoriz(smallElemCoord);
        } else if (smallElemCoord.move == "vert") {
            moveSmallElemVert(smallElemCoord);
        }
    }
}

function moveSmallElemHoriz(smallElemCoord) {
    if (smallElemCoord.x < smallElemCoord.xinit + 60 && smallElemCoord.movedir) {
        smallElemCoord.x += smallElemCoord.speed;
    } else if (smallElemCoord.x > smallElemCoord.xinit) {
        smallElemCoord.movedir = false;
        smallElemCoord.x -= smallElemCoord.speed;
    } else {
        smallElemCoord.movedir = true;
    }
}

function moveSmallElemVert(smallElemCoord) {
    if (smallElemCoord.y < smallElemCoord.yinit + 60 && smallElemCoord.movedir) {
        smallElemCoord.y += smallElemCoord.speed;
    } else if (smallElemCoord.y > smallElemCoord.yinit) {
        smallElemCoord.movedir = false;
        smallElemCoord.y -= smallElemCoord.speed;
    } else {
        smallElemCoord.movedir = true;
    }
}

function setIsDown(e, status) {
    if (e.key === "ArrowRight") {
        pressedKeys.right = status;
    }
    if (e.key === "ArrowLeft") {
        pressedKeys.left = status;
    }
    if (e.key === "ArrowUp") {
        pressedKeys.up = status;
    }
    if (e.key === "ArrowDown") {
        pressedKeys.down = status;
    }
    moveSquare();
}
document.addEventListener('keydown', (e) => setIsDown(e, true));
document.addEventListener('keyup', (e) => setIsDown(e, false));



/*

Задача:

выводить счет словленных красных квадратов
добавить на поле еще несколько таких же красных квадратов с таким же функционалом
добавить движение красных квадратов(только по 1 оси, * рандомное движение)

*/