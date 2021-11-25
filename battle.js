const allships = [ship1comp, ship2comp, ship3comp, ship4comp, ship1user, ship2user, ship3user, ship4user];
const compships = [ship1comp, ship2comp, ship3comp, ship4comp];
const userships = [ship1user, ship2user, ship3user, ship4user];
let woundedShipDetected = "no";
let firstHitCell = [];
let currentHitCell = [];

function startBattle() {
    console.log('Battle started!');

    startBattleNotice();

    for (let i = 0; i < allships.length; i++) {
        console.log(allships[i]);
    }


    let enemyfield = document.querySelector(".field1");
    let userfield = document.querySelector(".field2");
    let currentField = field1;
    let shotCompShip = [];
    let shotUserShip = [];
    let shipLengthCounter = 0;
    let toggle = 2;
    shipsAdjacentAreaCapture();
    userShoot();

    function switchPlayer() {
        if (toggle == 1) {
            currentField = field1;
            toggle = 2;
            userShoot();
        } else if (toggle == 2) {
            currentField = field2;
            toggle = 1;
            compShoot();
        }
    }

    function userShoot() {
        userfield.classList.remove("red-border");
        enemyfield.classList.add("red-border");
        enemyfield.addEventListener('click', userShootCapture);
        enemyfield.classList.add("user-shoot");

        function userShootCapture(e) {
            if (e.target.tagName == "TD") {
                let id = e.target.getAttribute("id");
                let indexes = id.substr(0, 2);
                let hitString = indexes.split('');

                let y = parseInt(hitString[0]);
                let x = parseInt(hitString[1]);
                let hit = [y, x];

                if (currentField[y][x] == 0) {
                    currentField[y][x] = 2;
                    e.target.textContent = "o";
                    // e.target.style.backgroundColor = "rgb(15, 140, 243)";
                    console.log(hit);
                    enemyfield.removeEventListener('click', userShootCapture);
                    switchPlayer();
                } else if (currentField[y][x] == 1) {
                    currentField[y][x] = 3;
                    e.target.style.backgroundColor = `${woundedColor}`;
                    //const img = document.createElement('img');
                    //img.src = "/ships_images/fire.gif";
                    //img.style.position = "absolute";
                    //img.style.top = `0`;
                    //img.style.left = `0`;
                    //img.style.width = `45px`;
                    //e.target.appendChild(img);
                    //e.target.style.border = "2px dashed black";
                    // shotCompShip.push(hit);
                    killedCheck(hit, compships);
                    enemyfield.removeEventListener('click', userShootCapture);
                    switchPlayer();
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

        if (woundedShipDetected == "yes" && level == 2) {
            setTimeout(shootIfWounded, 1500);
        } else {
            setTimeout(shoot, 1500);
        }

        enemyfield.classList.remove("user-shoot");

        function shoot() {
            let x = Math.floor(Math.random() * 10);
            let y = Math.floor(Math.random() * 10);
            let hit = [y, x];
            const cell = document.getElementById(`${y}${x}`);
            if (field2[y][x] == 0) {
                field2[y][x] = 2;
                cell.textContent = "o";
            } else if (field2[y][x] == 1) {
                firstHitCell = [];
                currentHitCell = [];
                firstHitCell.push(y);
                firstHitCell.push(x);
                currentHitCell.push(y);
                currentHitCell.push(x);
                woundedShipDetected = "yes";
                console.log("Выполняется функция shoot");
                field2[y][x] = 3;
                cell.style.backgroundColor = `${woundedColor}`;
                killedCheck(hit, userships);
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
                let hit2 = [y, x];
                console.log(currentHitCell);
                console.log(hit2);

                const cell = document.getElementById(`${y}${x}`);
                if (field2[y][x] == 0) {
                    field2[y][x] = 2;
                    cell.textContent = "o";
                    counter = 0;
                } else if (field2[y][x] == 1) {
                    currentHitCell = [y, x];
                    field2[y][x] = 3;
                    cell.style.backgroundColor = `${woundedColor}`;
                    killedCheck(hit2, userships);
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
                    woundedShipDetected = "no";
                    console.log("Вот тут его не должно быть!");
                    paintKilledShip(ship, ships);
                }
            }
        }
    }
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


