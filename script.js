
const speed = 4;
const racketSpeed = 4;
let rand = 1; // используется для изменения угла движения мячика после каждого удара о стенку или ракетку, а также для начального определения угла после старта
const field = document.querySelector(".field");
const ball = document.querySelector(".ball");
const blueRacket = document.querySelector(".blue-racket");
const greenRacket = document.querySelector(".green-racket");
const ballWidth = parseInt(getComputedStyle(ball).width);
const posXinitial = parseInt(getComputedStyle(ball).left); // начальное положение мяча
const posYinitial = parseInt(getComputedStyle(ball).top); // начальное положение мяча
const countDisplay = document.querySelector(".counter");
let counter1 = 0;
let counter2 = 0;
const endGameTextContainer = document.createElement("span");

function startGame() {
    let posX = posXinitial;
    let posY = posYinitial;
    rand = getRandom();

    if (rand >= 0.75) {
        moveRightDown();
    } else if (rand >= 0.5 && rand < 0.75) {
        moveRightUp();
    } else if (rand >= 0.25 && rand < 0.5) {
        moveLeftUp();
    } else {
        moveLeftDown();
    }


    function getRandom() {
        let random = Math.random(1);
        if (random > 0.3) {
            return random.toFixed(1);
        } else {
            return 0.3;
        }
    }

    function moveRightDown() {
        if (posX >= parseInt(getComputedStyle(blueRacket).left) - ballWidth && posY > parseInt(getComputedStyle(blueRacket).top) - ballWidth / 2
            && posY < parseInt(getComputedStyle(blueRacket).top) + parseInt(getComputedStyle(blueRacket).height) - ballWidth / 2) {
            rand = getRandom();
            moveLeftDown();
        } else if (posX < 500 - ballWidth && posY < 300 - ballWidth) {
            posX += speed;
            posY += speed * rand;
            ball.style.left = posX + "px";
            ball.style.top = posY + "px";
            requestAnimationFrame(moveRightDown);
        } else if (posX < 500 - ballWidth && posY >= 300 - ballWidth) {
            rand = getRandom();
            moveRightUp();
        } else {
            counter1++;
            countDisplay.innerHTML = `${counter1}:${counter2}`;
            if (counter1 === 10) {
                endGameTextContainer.textContent = "Игра окончена! Зеленый игрок победил!";
                endGameTextContainer.classList.remove("inactive");
                endGameNotice();
                counter1 = 0;
                counter2 = 0;
                countDisplay.innerHTML = `${counter1}:${counter2}`;
            }
        }
    }

    function moveRightUp() {
        if (posX >= parseInt(getComputedStyle(blueRacket).left) - ballWidth && posY > parseInt(getComputedStyle(blueRacket).top) - ballWidth / 2
            && posY < parseInt(getComputedStyle(blueRacket).top) + parseInt(getComputedStyle(blueRacket).height) - ballWidth / 2) {
            rand = getRandom();
            moveLeftUp();
        } else if (posX < 500 - ballWidth && posY > 0) {
            posX += speed;
            posY -= speed * rand;
            ball.style.left = posX + "px";
            ball.style.top = posY + "px";
            requestAnimationFrame(moveRightUp);
        } else if (posX >= 500 - ballWidth && posY > 0) {
            counter1++;
            countDisplay.innerHTML = `${counter1}:${counter2}`;
            if (counter1 === 10) {
                endGameTextContainer.textContent = "Игра окончена! Зеленый игрок победил!";
                endGameTextContainer.classList.remove("inactive");
                endGameNotice();
                counter1 = 0;
                counter2 = 0;
                countDisplay.innerHTML = `${counter1}:${counter2}`;
            }
        } else {
            rand = getRandom();
            moveRightDown();
        }
    }

    function moveLeftDown() {
        if (posX <= parseInt(getComputedStyle(greenRacket).width) && posY > parseInt(getComputedStyle(greenRacket).top) - ballWidth / 2
            && posY < parseInt(getComputedStyle(greenRacket).top) + parseInt(getComputedStyle(greenRacket).height) - ballWidth / 2) {
            rand = getRandom();
            moveRightDown();
        } else if (posX > 0 && posY < 300 - ballWidth) {
            posX -= speed;
            posY += speed * rand;
            ball.style.left = posX + "px";
            ball.style.top = posY + "px";
            requestAnimationFrame(moveLeftDown);
        } else if (posX <= 0 && posY < 300 - ballWidth) {
            counter2++;
            countDisplay.innerHTML = `${counter1}:${counter2}`;
            if (counter2 === 10) {
                endGameTextContainer.textContent = "Игра окончена! Синий игрок победил!";
                endGameTextContainer.classList.remove("inactive");
                endGameNotice();
                counter1 = 0;
                counter2 = 0;
                countDisplay.innerHTML = `${counter1}:${counter2}`;
            }
        } else {
            rand = getRandom();
            moveLeftUp();
        }
    }

    function moveLeftUp() {
        if (posX <= parseInt(getComputedStyle(greenRacket).width) && posY > parseInt(getComputedStyle(greenRacket).top) - ballWidth / 2
            && posY < parseInt(getComputedStyle(greenRacket).top) + parseInt(getComputedStyle(greenRacket).height) - ballWidth / 2) {
            rand = getRandom();
            moveRightUp();
        } else if (posX > 0 && posY > 0) {
            posX -= speed;
            posY -= speed * rand;
            ball.style.left = posX + "px";
            ball.style.top = posY + "px";
            requestAnimationFrame(moveLeftUp);
        } else if (posX <= 0 && posY > 0) {
            counter2++;
            countDisplay.innerHTML = `${counter1}:${counter2}`;
            if (counter2 === 10) {
                endGameTextContainer.textContent = "Игра окончена! Синий игрок победил!";
                endGameTextContainer.classList.remove("inactive");
                endGameNotice();
                counter1 = 0;
                counter2 = 0;
                countDisplay.innerHTML = `${counter1}:${counter2}`;
            }
        } else {
            rand = getRandom();
            moveLeftDown();
        }
    }


    function endGameNotice() {
        endGameTextContainer.classList.add("end-of-game-notice");
        field.appendChild(endGameTextContainer);
        setTimeout(removeNotice, 3000);

        function removeNotice() {
            endGameTextContainer.classList.add("inactive");
        }

    }

}


let blueRacketAnim;
let greenRacketAnim;

function blueRacketMove(e) {
    const blueRacket = document.querySelector(".blue-racket");
    if (e.key == "ArrowDown") {
        moveDown();
    } else if (e.key == "ArrowUp") {
        moveUp();
    }

    function moveDown() {
        cancelAnimationFrame(blueRacketAnim);
        if (parseInt(getComputedStyle(blueRacket).top) < 230 - racketSpeed) {
            const posY = parseInt(getComputedStyle(blueRacket).top) + racketSpeed;
            blueRacket.style.top = posY + "px";
            blueRacketAnim = requestAnimationFrame(moveDown);
        }
    }

    function moveUp() {
        cancelAnimationFrame(blueRacketAnim);
        if (parseInt(getComputedStyle(blueRacket).top) > 0 + racketSpeed) {
            const posY = parseInt(getComputedStyle(blueRacket).top) - racketSpeed;
            blueRacket.style.top = posY + "px";
            blueRacketAnim = requestAnimationFrame(moveUp);
        }
    }
}

function greenRacketMove(e) {
    const greenRacket = document.querySelector(".green-racket");
    if (e.code == "ControlLeft") {
        moveDown();
    } else if (e.code == "ShiftLeft") {
        moveUp();
    }

    function moveDown() {
        cancelAnimationFrame(greenRacketAnim);
        if (parseInt(getComputedStyle(greenRacket).top) < 230 - racketSpeed) {
            const posY = parseInt(getComputedStyle(greenRacket).top) + racketSpeed;
            greenRacket.style.top = posY + "px";
            greenRacketAnim = requestAnimationFrame(moveDown);
        }
    }

    function moveUp() {
        cancelAnimationFrame(greenRacketAnim);
        if (parseInt(getComputedStyle(greenRacket).top) > 0 + racketSpeed) {
            const posY = parseInt(getComputedStyle(greenRacket).top) - racketSpeed;
            greenRacket.style.top = posY + "px";
            greenRacketAnim = requestAnimationFrame(moveUp);
        }
    }
}


function RacketStop(e) {
    if (e.key == "ArrowDown" || e.key == "ArrowUp") {
        cancelAnimationFrame(blueRacketAnim);
    }
    if (e.code == "ControlLeft" || e.code == "ShiftLeft") {
        cancelAnimationFrame(greenRacketAnim);
    }
}

function checkStartGamePossibility(e) {
    if (parseInt(getComputedStyle(ball).left) == posXinitial || parseInt(getComputedStyle(ball).left) >= 500 - ballWidth
        || parseInt(getComputedStyle(ball).left) <= 0) {
        startGame();
    }
}



const button = document.querySelector("button");
button.addEventListener('click', checkStartGamePossibility);
document.addEventListener('keydown', blueRacketMove);
document.addEventListener('keydown', greenRacketMove);
document.addEventListener('keyup', RacketStop);