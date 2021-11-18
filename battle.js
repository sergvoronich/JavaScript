const allships = [ship1comp, ship2comp, ship3comp, ship4comp, ship1user, ship2user, ship3user, ship4user];
const compships = [ship1comp, ship2comp, ship3comp, ship4comp];
const userships = [ship1user, ship2user, ship3user, ship4user];

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

    function addHoverToCompField() {
        enemyfield.classList.add("hover");
    }

    function removeHoverFromCompField() {
        enemyfield.classList.remove("hover");
    }

    function userShoot() {

        enemyfield.addEventListener('click', userShootCapture);
        enemyfield.addEventListener('mouseover', addHoverToCompField);
        enemyfield.addEventListener('mouseleave', removeHoverFromCompField);

        function userShootCapture(e) {
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
                enemyfield.classList.remove("hover");
                enemyfield.removeEventListener('click', userShootCapture);
                enemyfield.removeEventListener('mouseover', addHoverToCompField);
                enemyfield.removeEventListener('mouseleave', removeHoverFromCompField);
                switchPlayer();
            } else if (currentField[y][x] == 1) {
                currentField[y][x] = 3;
                e.target.style.backgroundColor = "rgb(218, 136, 126)";
                e.target.style.border = "2px dashed black";
                // shotCompShip.push(hit);
                console.log(shotCompShip);
                killedCheck(hit, compships, shotCompShip);

                enemyfield.classList.remove("hover");
                enemyfield.removeEventListener('click', userShootCapture);
                enemyfield.removeEventListener('mouseover', addHoverToCompField);
                enemyfield.removeEventListener('mouseleave', removeHoverFromCompField);
                switchPlayer();
            }
        }
    }



    function compShoot() {
        compMoveNotice();
        setTimeout(userMoveNotice, 2000);
        setTimeout(switchPlayer, 3000);
        setTimeout(shoot, 2000);

        function shoot() {
            let x = Math.floor(Math.random() * 10);
            let y = Math.floor(Math.random() * 10);
            let hit = [y, x];
            const cell = document.getElementById(`${y}${x}`);
            if (field2[y][x] == 0) {
                field2[y][x] = 2;
                cell.textContent = "o";
            } else if (field2[y][x] == 1) {
                field2[y][x] = 3;
                cell.style.backgroundColor = "rgb(218, 136, 126)";
                killedCheck(hit, userships);
            } else if (field2[y][x] == 2 || field2[y][x] == 3) {
                shoot();
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
                if (ships[i].shot[j] == ships[i].length) {
                    const ship = ships[i].items[j];
                    paintKilledShip(ship, ships);
                }
            }
        }
    }
}

function paintKilledShip(ship, ships) {
    console.log(ships.includes(ship1comp));
    for (let i = 0; i < ship.length; i++) {
        let x = ship[i][1];
        let y = ship[i][0];
        if (ships.includes(ship1comp)) {
            const cell = document.getElementById(`${y}${x}comp`);
            cell.style.backgroundColor = "brown";
            cell.style.border = "2px solid black";
        } else if (ships.includes(ship1user)) {
            const cell = document.getElementById(`${y}${x}`);
            cell.style.backgroundColor = "brown";
            cell.style.border = "2px solid black";
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
    textContainer.textContent = "Ход компьютера!";
    textContainer.classList.add("start-battle-notice");
    document.body.appendChild(textContainer);

    setTimeout(removeNotice, 1000);

    function removeNotice() {
        textContainer.classList.add("inactive");
    }

}

function userMoveNotice() {
    const textContainer = document.createElement("span");
    textContainer.textContent = "Ваш ход!";
    textContainer.classList.add("start-battle-notice");
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
        }
    }
    console.log(errors);
    if (errors == 0) {
        const ready = new Event('ready_to_battle');
        document.dispatchEvent(ready);
    } else {
        return false;
    }
}


document.addEventListener('shipsfilled', shipsFilledCheck);
document.addEventListener('ready_to_battle', startBattle);


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


