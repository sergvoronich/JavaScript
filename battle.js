const allships = [ship1comp, ship2comp, ship3comp, ship4comp, ship1user, ship2user, ship3user, ship4user];
const compships = [ship1comp, ship2comp, ship3comp, ship4comp];
const userships = [ship1user, ship2user, ship3user, ship4user];
let enemyfield = document.querySelector(".field1");
let userfield = document.querySelector(".field2");
let woundedShipDetected = false;
let firstHitCell = [];
let currentHitCell = [];
let shootAllowed = false;

function startBattle() {
    console.log('Battle started!');

    startBattleNotice();

    for (let i = 0; i < allships.length; i++) {
        console.log(allships[i]);
    }


    shootAllowed = true;
    let currentField = field1;
    let shotCompShip = [];
    let shotUserShip = [];
    let shipLengthCounter = 0;
    let toggle = 2;
    shipsAdjacentAreaCapture();
    userShoot();

    function switchPlayer() {
        if (toggle == 1 && shootAllowed) {
            currentField = field1;
            toggle = 2;
            setTimeout(userShoot, 500);
        } else if (toggle == 2 && shootAllowed) {
            currentField = field2;
            toggle = 1;
            setTimeout(compShoot, 500);
        }
    }

    function userShoot() {
        userfield.classList.remove("red-border");
        enemyfield.classList.add("red-border");
        enemyfield.addEventListener('click', userShootCapture);
        enemyfield.classList.add("user-shoot");

        function userShootCapture(e) {
            if (e.target.tagName == "TD") {
                setTimeout(switchPlayer, 1500);
                let id = e.target.getAttribute("id");
                let indexes = id.substr(0, 2);
                let hitString = indexes.split('');

                let y = parseInt(hitString[0]);
                let x = parseInt(hitString[1]);
                let hit = [y, x];
                const elem = document.getElementById(`${id}`);
                let top = `${y * 53}px`;
                let left = `${x * 53}px`;
                createExplosion(top, left, elem);
                shootAnim();

                if (currentField[y][x] == 0) {
                    currentField[y][x] = 2;
                    setTimeout(() => { e.target.textContent = "o"; }, 1000);
                    // e.target.style.backgroundColor = "rgb(15, 140, 243)";
                    console.log(hit);
                    enemyfield.removeEventListener('click', userShootCapture);
                } else if (currentField[y][x] == 1) {
                    currentField[y][x] = 3;
                    // вставка огня
                    top = `${y * 53}px`;
                    left = `${x * 53 + 14}px`;
                    setTimeout(() => {
                        e.target.style.backgroundColor = `${woundedColor}`;
                        createFire(top, left, elem);
                        killedCheck(hit, compships);
                    }, 1000);
                    enemyfield.removeEventListener('click', userShootCapture);
                }
            }
        }
    }



    function compShoot() {
        console.log(woundedShipDetected);
        enemyfield.classList.remove("red-border");
        userfield.classList.add("red-border");
        //compMoveNotice();
        //setTimeout(userMoveNotice, 1500);
        setTimeout(switchPlayer, 2000);

        let counter = 0;

        if (woundedShipDetected && level == 2) {
            shootIfWounded();
        } else {
            shoot();
        }

        enemyfield.classList.remove("user-shoot");

        function shoot() {
            let x = Math.floor(Math.random() * 10);
            let y = Math.floor(Math.random() * 10);
            let hit = [y, x];
            const cell = document.getElementById(`${y}${x}`);
            if (field2[y][x] == 0) {
                field2[y][x] = 2;
                let top = `${y * 53}px`;
                let left = `${x * 53}px`;
                setTimeout(() => {
                    createExplosion(top, left, cell);
                    shootAnim();
                }, 500);
                //cell.textContent = "o";
                setTimeout(() => { cell.textContent = "o"; }, 1500);
            } else if (field2[y][x] == 1) {
                firstHitCell = [];
                currentHitCell = [];
                firstHitCell.push(y);
                firstHitCell.push(x);
                currentHitCell.push(y);
                currentHitCell.push(x);
                woundedShipDetected = true;
                field2[y][x] = 3;
                let top = `${y * 53}px`;
                let left = `${x * 53}px`;
                setTimeout(() => {
                    createExplosion(top, left, cell);
                    shootAnim();
                }, 500);
                setTimeout(() => {
                    cell.style.backgroundColor = `${woundedColor}`;
                    top = `${y * 53}px`;
                    left = `${x * 53 + 14}px`;
                    createFire(top, left, cell);
                    killedCheck(hit, userships);
                }, 1500)
            } else if (field2[y][x] == 2 || field2[y][x] == 3) {
                shoot();
            }
        }

        function shootIfWounded() {
            let number = Math.floor(Math.random() * 4);
            let x, y;

            if (number == 0) {
                x = currentHitCell[1] - 1;
                y = currentHitCell[0];
            } else if (number == 1) {
                x = currentHitCell[1] + 1;
                y = currentHitCell[0];
            } else if (number == 2) {
                x = currentHitCell[1];
                y = currentHitCell[0] - 1;
            } else if (number == 3) {
                x = currentHitCell[1];
                y = currentHitCell[0] + 1;
            }

            if (x > 9 || y > 9 || x < 0 || y < 0) {
                shootIfWounded();
            } else {
                let hit = [y, x];
                console.log(currentHitCell);
                console.log(hit);
                const cell = document.getElementById(`${y}${x}`);
                if (field2[y][x] == 0) {
                    field2[y][x] = 2;
                    //cell.textContent = "o";
                    let top = `${y * 53}px`;
                    let left = `${x * 53}px`;
                    setTimeout(() => {
                        createExplosion(top, left, cell);
                        shootAnim();
                    }, 500);
                    setTimeout(() => { cell.textContent = "o"; }, 1500);
                    counter = 0;
                } else if (field2[y][x] == 1) {
                    currentHitCell = [y, x];
                    field2[y][x] = 3;
                    let top = `${y * 53}px`;
                    let left = `${x * 53}px`;
                    setTimeout(() => {
                        createExplosion(top, left, cell);
                        shootAnim();
                    }, 500);
                    setTimeout(() => {
                        cell.style.backgroundColor = `${woundedColor}`;
                        top = `${y * 53}px`;
                        left = `${x * 53 + 14}px`;
                        createFire(top, left, cell);
                        killedCheck(hit, userships);
                    }, 1500)
                    counter = 0;
                } else if (field2[y][x] == 2 || field2[y][x] == 3) {
                    counter++;
                    if (counter > 64) {
                        currentHitCell = firstHitCell;
                    }
                    shootIfWounded();
                }
            }
        }
    }
}

function killedCheck(hit, ships) {
    for (let i = 0; i < ships.length; i++) {
        for (let j = 0; j < ships[i].items.length; j++) {
            for (let n = 0; n < ships[i].items[j].length; n++) {
                if (ships[i].items[j][n][0] == hit[0] && ships[i].items[j][n][1] == hit[1]) {
                    ships[i].shot[j] += 1;
                }
            }
            console.log(ships[i].shot[j] == ships[i].length);
            if (ships[i].shot[j] === ships[i].length) {
                ships[i].shot[j] = "killed";
                const ship = ships[i].items[j];
                const shipAdjacentArea = ships[i].adjacentArea[j];
                let x = ship[0][1];
                let y = ship[0][0];
                if (ships.includes(ship1comp)) {
                    for (let i = 0; i < shipAdjacentArea.length; i++) {
                        const a = shipAdjacentArea[i][0];
                        const b = shipAdjacentArea[i][1];
                        if (field1[a][b] == 0) {
                            field1[a][b] = 2;
                            const cell = document.getElementById(`${a}${b}comp`);
                            cell.textContent = "o";
                        }
                    }

                    if (ships[i].horiz[j] == true) {
                        const id = `${y}` + `${x}`;
                        const elem = document.getElementById(`${id}comp`);
                        const img = document.createElement('img');
                        img.src = ships[i].image;
                        elem.appendChild(img);
                        const imgstyle = getComputedStyle(img);
                        img.style.position = "absolute";
                        img.style.top = `${y * 53 + 25 - parseFloat(imgstyle.height) / 2}px`;
                        img.style.left = `${x * 55 - x * 2}px`;
                        img.style.width = `${ships[i].width}px`;
                    } else {
                        const id = `${y}` + `${x}`;
                        const elem = document.getElementById(`${id}comp`);
                        const img = document.createElement('img');
                        img.src = ships[i].image;
                        elem.appendChild(img);
                        const imgstyle = getComputedStyle(img);
                        img.style.position = "absolute";
                        img.style.top = `${y * 53}px`;
                        img.style.left = `${x * 53 + 27 + parseFloat(imgstyle.height) / 2}px`;
                        img.style.width = `${ships[i].width}px`;
                        img.style.transform = "rotate(90deg)";
                        img.style.transformOrigin = "0% 0%";
                    }
                    paintKilledShip(ship, ships);
                } else {
                    for (let i = 0; i < shipAdjacentArea.length; i++) {
                        const a = shipAdjacentArea[i][0];
                        const b = shipAdjacentArea[i][1];
                        if (field2[a][b] == 0) {
                            field2[a][b] = 2;
                            const cell = document.getElementById(`${a}${b}`);
                            cell.textContent = "o";
                        }
                    }
                    woundedShipDetected = false;
                    paintKilledShip(ship, ships);
                }
            }
        }
    }
    endGameCheck();
}

function paintKilledShip(ship, ships) {
    for (let i = 0; i < ship.length; i++) {
        let x = ship[i][1];
        let y = ship[i][0];
        if (ships.includes(ship1comp)) {
            const cell = document.getElementById(`${y}${x}comp`);
            cell.style.backgroundColor = `${killedColor}`;
            //cell.style.border = "2px solid black";
        } else if (ships.includes(ship1user)) {
            const cell = document.getElementById(`${y}${x}`);
            cell.style.backgroundColor = `${killedColor}`;
            //cell.style.border = "2px solid black";
            //cell.style.backgroundColor = "rgba(21, 78, 165, 0.2)";
            //cell.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
        }

    }
}




function startBattleNotice() {
    const textContainer = document.createElement("span");
    textContainer.textContent = "Битва началась!";
    textContainer.classList.add("start-battle-notice");
    document.body.appendChild(textContainer);

    setTimeout(removeNotice, 1000);

    function removeNotice() {
        textContainer.classList.add("inactive");
    }

}


function compMoveNotice() {
    const textContainer = document.createElement("span");
    textContainer.textContent = "ХОД КОМПЬЮТЕРА";
    textContainer.classList.add("comp-move-notice");
    document.body.appendChild(textContainer);

    setTimeout(removeNotice, 1000);

    function removeNotice() {
        textContainer.classList.add("inactive");
    }

}

function userMoveNotice() {
    const textContainer = document.createElement("span");
    textContainer.textContent = "ВАШ ХОД";
    textContainer.classList.add("user-move-notice");
    document.body.appendChild(textContainer);

    setTimeout(removeNotice, 500);

    function removeNotice() {
        textContainer.classList.add("inactive");
    }

}



function shipsFilledCheck() {
    let errors = 0;
    for (let i = 0; i < allships.length; i++) {
        if (allships[i].quantity != 0) {
            errors++;
        } else {
            if (userships.includes(allships[i])) {
                if (allships[i].length == 4) {
                    ship1.classList.add("inactive");
                } else if (allships[i].length == 3) {
                    ship2.classList.add("inactive");
                } else if (allships[i].length == 2) {
                    ship3.classList.add("inactive");
                } else if (allships[i].length == 1) {
                    ship4.classList.add("inactive");
                }
            }
        }
    }
    if (errors == 0) {
        //const ready = new Event('ready_to_battle');
        //document.dispatchEvent(ready);
        return true;
    } else {
        return false;
    }
}


function shipsAdjacentAreaCapture() {
    for (let i = 0; i < allships.length; i++) {
        for (let j = 0; j < allships[i].items.length; j++) {
            for (let n = 0; n < allships[i].items[j].length; n++) {
                const yCoord = allships[i].items[j][n][0];
                const xCoord = allships[i].items[j][n][1];
                allships[i].adjacentArea[j].push([yCoord - 1, xCoord - 1]);
                allships[i].adjacentArea[j].push([yCoord, xCoord - 1]);
                allships[i].adjacentArea[j].push([yCoord + 1, xCoord - 1]);
                allships[i].adjacentArea[j].push([yCoord - 1, xCoord]);
                //allships[i].adjacentArea[j].push([yCoord, xCoord]);
                allships[i].adjacentArea[j].push([yCoord + 1, xCoord]);
                allships[i].adjacentArea[j].push([yCoord - 1, xCoord + 1]);
                allships[i].adjacentArea[j].push([yCoord, xCoord + 1]);
                allships[i].adjacentArea[j].push([yCoord + 1, xCoord + 1]);
            }
        }
    }

    for (let i = 0; i < allships.length; i++) {
        for (let j = 0; j < allships[i].adjacentArea.length; j++) {
            allships[i].adjacentArea[j] = allships[i].adjacentArea[j].filter(a => a[0] >= 0 && a[1] >= 0 && a[0] < 10 && a[1] < 10);
        }
    }
}

function readyToBattleCheck() {
    let ready = shipsFilledCheck();
    if (ready) {
        startBattle();
        resetButton.classList.add("inactive");
        startButton.classList.add("inactive");
        autoFillButton.classList.add("inactive");
    }
}


function endGameCheck() {
    let liveUserShips = 0;
    let liveCompShips = 0;
    for (let i = 0; i < userships.length; i++) {
        for (let j = 0; j < userships[i].shot.length; j++) {
            if (userships[i].shot[j] != "killed") {
                liveUserShips++;
            }
        }
    }

    for (let i = 0; i < compships.length; i++) {
        for (let j = 0; j < compships[i].shot.length; j++) {
            if (compships[i].shot[j] != "killed") {
                liveCompShips++;
            }
        }
    }

    if (liveCompShips === 0) endGame("user");
    if (liveUserShips === 0) endGame("comp");

}

function endGame(winner) {
    music1.currentTime = 0;
    music1.pause();
    music2.play();
    music2.volume = 0.3;
    music2.loop = true;
    shootAllowed = false;
    let winOrLoose;
    if (winner == "user") {
        winOrLoose = "Вы выиграли!"
    } else if (winner == "comp") {
        winOrLoose = "Вы проиграли!"
    }

    const endGameBlockBack = document.createElement("div");
    endGameBlockBack.classList.add("end-game-background");
    const endGameBlock = document.createElement("div");
    endGameBlock.insertAdjacentHTML("afterbegin", `<p class="win-or-loose-text">${winOrLoose}</p>`)
    const button1 = document.createElement("button");
    button1.setAttribute("type", "button");
    button1.textContent = "PLAY AGAIN";
    button1.classList.add("end-game-button");
    button1.classList.add("play-again");
    endGameBlock.appendChild(button1);
    const button2 = document.createElement("button");
    button2.setAttribute("type", "button");
    button2.textContent = "MAIN MENU";
    button2.classList.add("end-game-button");
    button2.classList.add("main-menu");
    endGameBlock.appendChild(button2);
    console.log(endGameBlock);

    endGameBlock.classList.add("end-game-block");
    document.body.appendChild(endGameBlockBack);
    endGameBlockBack.appendChild(endGameBlock);
    setTimeout(() => { endGameBlock.classList.add("move-down"); }, 10);


    button1.addEventListener("click", closeBlock);

    function closeBlock() {
        endGameBlock.remove();
        endGameBlockBack.remove();
        music2.currentTime = 0;
        music2.pause();
        music1.play();
        reset();
    }
}

function reset() {
    field1 = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    field2 = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    const table1 = document.querySelector('.field1');
    const table2 = document.querySelector('.field2');
    const table1cells = table1.getElementsByTagName("td");
    const table2cells = table2.getElementsByTagName("td");
    const table1images = [...table1.getElementsByTagName("img")];
    const table2images = [...table2.getElementsByTagName("img")];
    table1images.forEach(element => {
        element.remove();
    });
    table2images.forEach(element => {
        element.remove();
    });

    for (let i = 0; i < table1cells.length; i++) {
        table1cells[i].style.backgroundColor = "";
        table2cells[i].style.backgroundColor = "";
        table1cells[i].style.backgroundColor = `${mainColor}`;
        table2cells[i].style.backgroundColor = `${mainColor}`;
        table1cells[i].textContent = "";
        table2cells[i].textContent = "";
    };

    shipsReset();

    autofill();

}

function shipsReset() {
    for (let i = 0; i < allships.length; i++) {
        allships[i].quantity = allships[i].initquantity;

        for (let j = 0; j < allships[i].shot.length; j++) {
            allships[i].shot[j] = 0;
        };

        for (let j = 0; j < allships[i].items.length; j++) {
            allships[i].items[j] = [];
        }

        for (let j = 0; j < allships[i].adjacentArea.length; j++) {
            allships[i].adjacentArea[j] = [];
        }

        allships[i].adjacentArea.length = allships[i].items.length;
        allships[i].horiz = [];
    }
    enemyfield.classList.remove("red-border");
    userfield.classList.remove("red-border");
    resetButton.classList.remove("inactive");
    startButton.classList.remove("inactive");
    autoFillButton.classList.remove("inactive");
    console.log(ship1comp);
    console.log(ship3user);
    ship1.classList.remove("inactive");
    ship2.classList.remove("inactive");
    ship3.classList.remove("inactive");
    ship4.classList.remove("inactive");
}

// функция создания анимации горящего огня для раненых кораблей
function createFire(top, left, elem) {
    let timer;
    let counter = 0;
    let xInit = -14;
    let yInit = -5;
    let xShift = 0;
    let yShift = 0;
    let fireImage = 'images/fire4_64.png';
    const container = document.createElement("div");
    container.classList.add("fire-container");
    elem.appendChild(container);
    timer = requestAnimationFrame(fireAmin);
    container.style.backgroundImage = `url("${fireImage}")`;
    container.style.top = `${top}`;
    container.style.left = `${left}`;

    function fireAmin() {
        cancelAnimationFrame(timer);
        if (counter === 60 || counter === 0) {
            counter = 0;
            xShift = 0;
            yShift = 0;
        } else if (counter % 10 === 0) {
            xShift = 0;
            yShift -= 50;
        } else {
            xShift -= 50;
        }
        counter++;
        container.style.backgroundPosition = `${xInit + xShift}px ${yInit + yShift}px`;
        timer = requestAnimationFrame(fireAmin);
    }
}

function createExplosion(top, left, elem) {
    let timer;
    let counter = 0;
    let xInit = -8;
    let yInit = -20;
    let xShift = 0;
    let yShift = 0;
    let explosionImage = 'images/boom3.png';
    //let startTime;
    const container = document.createElement("div");
    container.classList.add("explosion-container");
    elem.appendChild(container);
    timer = requestAnimationFrame(explosionAnim);
    container.style.backgroundImage = `url("${explosionImage}")`;
    container.style.backgroundPosition = `${xInit + xShift}px ${yInit + yShift}px`;
    container.style.top = `${top}`;
    container.style.left = `${left}`;

    function explosionAnim() {
        //if (!startTime) startTime = timestamp;
        // это то время, которое прошло с первого вызова функции до сейчас 
        //var progress = timestamp - startTime;
        cancelAnimationFrame(timer);
        //if (progress > 0) {
        if (counter % 8 === 0) {
            xShift = 0;
            yShift -= 62.5;
        } else {
            xShift -= 62.5;
        }
        container.style.backgroundPosition = `${xInit + xShift}px ${yInit + yShift}px`;
        //startTime = null;
        //}
        if (counter != 64) {
            timer = requestAnimationFrame(explosionAnim);
        } else {
            container.remove();
        }
        counter++;
    }
}


function shootAnim() {
    let number = Math.floor(Math.random() * 3);
    console.log(number);

    if (number == 0) {
        boom1.play();
    } else if (number == 1) {
        boom2.play();
    } else if (number == 2) {
        boom3.play();
    }
}

//endGame("user");
//endGame("comp");

//const testButton = document.querySelector(".test-reset");
//testButton.addEventListener('click', reset);

document.addEventListener('shipsfilled', shipsFilledCheck);
//document.addEventListener('ready_to_battle', startBattle);

const startButton = document.getElementById("startButton");
startButton.addEventListener('click', readyToBattleCheck);





/*

// сравнение координат раненого корабля с координатами, записанными в объектах кораблей
function compareArrays(ar1, ar2) {
    let errors = 0;
    let compare;
    for (let i = 0; i < ar1.length; i++) {
        if (Array.isArray(ar1[i]) && Array.isArray(ar2[i])) {
            compare = compareArrays(ar1[i], ar2[i]);
            if (!compare) errors++;
        } else if (ar1[i] != ar2[i]) {
            errors++;
        }
    }
    if (errors == 0) {
        return true;
    } else {
        return false;
    }
}

// сортировка координат раненого корабля на основе пузырьковой сортировки
function sortArray(ar) {
    let temp;
    let needIteration = true;
    while (needIteration) {
        needIteration = false;
        for (let i = 1; i < ar.length; i++) {
            if (ar[i][0] < ar[i - 1][0]) {
                temp = ar[i][0];
                ar[i][0] = ar[i - 1][0];
                ar[i - 1][0] = temp;
                needIteration = true;
            } else if (ar[i][0] == ar[i - 1][0] && ar[i][1] < ar[i - 1][1]) {
                temp = ar[i][1];
                ar[i][1] = ar[i - 1][1];
                ar[i - 1][1] = temp;
                needIteration = true;
            }
        }
    }
}
*/


