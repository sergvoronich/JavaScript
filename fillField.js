"use strict"

let field1 = [
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

let field2 = [
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



let ship1comp = {
    length: 4,
    quantity: 1,
    items: [[]],
    shot: [0],
    image: "/ships_images/Battleship/ShipBattleshipHull.png"
};

let ship2comp = {
    length: 3,
    quantity: 2,
    items: [[], []],
    shot: [0, 0],
    image: "/ships_images/Cruiser/ShipCruiserHull.png"
};

let ship3comp = {
    length: 2,
    quantity: 3,
    items: [[], [], []],
    shot: [0, 0, 0],
    image: "/ships_images/Destroyer/ShipDestroyerHull.png"
};

let ship4comp = {
    length: 1,
    quantity: 4,
    items: [[], [], [], []],
    shot: [0, 0, 0, 0],
    image: "/ships_images/Plane/PlaneF-35Lightning2.png"
};

let ship1user = {
    length: 4,
    quantity: 1,
    display: null,
    items: [[]],
    shot: [0],
    image: "/ships_images/Battleship/ShipBattleshipHull.png"
};

let ship2user = {
    length: 3,
    quantity: 2,
    display: null,
    items: [[], []],
    shot: [0, 0],
    image: "/ships_images/Cruiser/ShipCruiserHull.png"
};

let ship3user = {
    length: 2,
    quantity: 3,
    display: null,
    items: [[], [], []],
    shot: [0, 0, 0],
    image: "/ships_images/Destroyer/ShipDestroyerHull.png"
};

let ship4user = {
    length: 1,
    quantity: 4,
    display: null,
    items: [[], [], [], []],
    shot: [0, 0, 0, 0],
    image: "/ships_images/Plane/PlaneF-35Lightning2.png"
};


function checkVertPath(x, y, ship, field) {
    let errors = 0;
    if ((y + ship.length) < field.length && field[y][x] != 1) {
        for (let i = 0; i < ship.length; i++) {
            if (y === 0) {
                if (x === 0) {
                    // проверки верхнего левого угла
                    if (field[y + i + 1][x] != 1 && field[y + i + 1][x + 1] != 1 && field[y + i][x + 1] != 1) {
                        errors += 0;
                    } else {
                        errors += 1;
                    }
                } else if (x === 9) {
                    // проверки верхнего правого угла
                    if (field[y + i + 1][x] != 1 && field[y + i + 1][x - 1] != 1 && field[y + i][x - 1] != 1) {
                        errors += 0;
                    } else {
                        errors += 1;
                    }
                } else {
                    // проверки остальных крайних полей по линии у=0
                    if (field[y + i][x - 1] != 1 && field[y + i + 1][x - 1] != 1
                        && field[y + i + 1][x] != 1 && field[y + i][x + 1] != 1 && field[y + i + 1][x + 1] != 1) {
                        errors += 0;
                    } else {
                        errors += 1;
                    }
                }
            } else if (y === 9) {
                if (x === 0) {
                    // проверки нижнего левого угла
                    if (field[y + i - 1][x] != 1 && field[y + i - 1][x + 1] != 1 && field[y + i][x + 1] != 1) {
                        errors += 0;
                    } else {
                        errors += 1;
                    }
                } else if (x === 9) {
                    // проверки нижнего правого угла
                    if (field[y + i - 1][x - 1] != 1 && field[y + i][x - 1] != 1 && field[y + i - 1][x] != 1) {
                        errors += 0;
                    } else {
                        errors += 1;
                    }
                } else {
                    // проверки остальных крайних полей по линии у=10
                    if (field[y + i - 1][x - 1] != 1 && field[y + i][x - 1] != 1
                        && field[y + i - 1][x] != 1 && field[y + i - 1][x + 1] != 1 && field[y + i][x + 1] != 1) {
                        errors += 0;
                    } else {
                        errors += 1;
                    }
                }
            } else if (x === 0) {
                // проверки крайних полей по линии х=0
                if (field[y + i - 1][x] != 1 && field[y + i + 1][x] != 1
                    && field[y + i - 1][x + 1] != 1 && field[y + i][x + 1] != 1 && field[y + i + 1][x + 1] != 1) {
                    errors += 0;
                } else {
                    errors += 1;
                }
            } else if (x === 9) {
                // проверки крайних полей по линии х=10
                if (field[y + i - 1][x - 1] != 1 && field[y + i][x - 1] != 1 && field[y + i + 1][x - 1] != 1
                    && field[y + i - 1][x] != 1 && field[y + i + 1][x] != 1) {
                    errors += 0;
                } else {
                    errors += 1;
                }
            } else {
                if (field[y + i - 1][x - 1] != 1 && field[y + i][x - 1] != 1 && (field[y + i + 1][x - 1] != 1) &&
                    field[y + i - 1][x] != 1 && field[y + i + 1][x] != 1
                    && field[y + i - 1][x + 1] != 1 && field[y + i][x + 1] != 1 && field[y + i + 1][x + 1] != 1) {
                    errors += 0;
                } else {
                    errors += 1;
                }
            }
        }

    } else {
        errors += 1;
    }

    if (errors === 0) {
        return true;
    } else {
        return false;
    }

}

function checkHorPath(x, y, ship, field) {
    let errors = 0;
    if ((x + ship.length) <= field[0].length && field[y][x] != 1) {
        for (let i = 0; i < ship.length; i++) {
            if (y === 0) {
                if (x === 0) {
                    // проверки верхнего левого угла
                    if (field[y + 1][x + i] != 1 && field[y + 1][x + i + 1] != 1 && field[y][x + i + 1] != 1) {
                        errors += 0;
                    } else {
                        errors += 1;
                    }
                } else if (x === 9) {
                    // проверки верхнего правого угла
                    if (field[y + 1][x + i] != 1 && field[y + 1][x + i - 1] != 1 && field[y][x + i - 1] != 1) {
                        errors += 0;
                    } else {
                        errors += 1;
                    }
                } else {
                    // проверки остальных крайних полей по линии у=0
                    if (field[y][x + i - 1] != 1 && field[y + 1][x + i - 1] != 1
                        && field[y + 1][x + i] != 1 && field[y][x + i + 1] != 1 && field[y + 1][x + i + 1] != 1) {
                        errors += 0;
                    } else {
                        errors += 1;
                    }
                }
            } else if (y === 9) {
                if (x === 0) {
                    // проверки нижнего левого угла
                    if (field[y - 1][x + i] != 1 && field[y - 1][x + i + 1] != 1 && field[y][x + i + 1] != 1) {
                        errors += 0;
                    } else {
                        errors += 1;
                    }
                } else if (x === 9) {
                    // проверки нижнего правого угла
                    if (field[y - 1][x + i - 1] != 1 && field[y][x + i - 1] != 1 && field[y - 1][x + i] != 1) {
                        errors += 0;
                    } else {
                        errors += 1;
                    }
                } else {
                    // проверки остальных крайних полей по линии у=10
                    if (field[y - 1][x + i - 1] != 1 && field[y][x + i - 1] != 1
                        && field[y - 1][x + i] != 1 && field[y - 1][x + i + 1] != 1 && field[y][x + i + 1] != 1) {
                        errors += 0;
                    } else {
                        errors += 1;
                    }
                }
            } else if (x === 0) {
                // проверки крайних полей по линии х=0
                if (field[y - 1][x + i] != 1 && (field[y + 1][x + i] != 1)
                    && field[y - 1][x + i + 1] != 1 && field[y][x + i + 1] != 1 && field[y + 1][x + i + 1] != 1) {
                    errors += 0;
                } else {
                    errors += 1;
                }
            } else if (x === 9) {
                // проверки крайних полей по линии х=10
                if (field[y - 1][x + i - 1] != 1 && field[y][x + i - 1] != 1 && field[y + 1][x + i - 1] != 1
                    && field[y - 1][x + i] != 1 && field[y + 1][x + i] != 1) {
                    errors += 0;
                } else {
                    errors += 1;
                }
            } else {
                // проверки всех остальных полей
                if ((field[y - 1][x + i - 1] != 1) && (field[y][x + i - 1] != 1) &&
                    (field[y + 1][x - 1 + i] != 1)
                    && (field[y - 1][x + i] != 1) && (field[y + 1][x + i] != 1)
                    && (field[y - 1][x + i + 1] != 1) && (field[y][x + i + 1] != 1) && (field[y + 1][x + i + 1] != 1)) {
                    errors += 0;
                } else {
                    errors += 1;
                }
            }
        }

    } else {
        errors += 1;
    }

    if (errors === 0) {
        return true;
    } else {
        return false;
    }

}



function fillField(ship, player) {
    let field;
    if (player == 'comp') {
        field = field1;
    } else if (player == 'user') {
        field = field2;
    }
    let counter = 0;
    let quantity = ship.quantity;
    for (let i = 0; i < ship.quantity + counter; i++) {
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);
        if (checkHorPath(x, y, ship, field)) {
            quantity--;
            if (player == 'user') {
                const id = `${y}` + `${x}`;
                const elem = document.getElementById(`${id}`);
                const img = document.createElement('img');
                img.src = ship.image;
                img.style.position = "absolute";
                img.style.top = `${y * 54 + 10 - y}px`;
                img.style.left = `${x * 55 - x}px`;
                elem.appendChild(img);
            }

            for (let i = 0; i < ship.length; i++) {
                field[y][x + i] = 1;
                ship.items[quantity].push([y, x + i]);
            }
        } else if (checkVertPath(x, y, ship, field)) {
            quantity--;
            if (player == 'user') {
                const id = `${y}` + `${x}`;
                const elem = document.getElementById(`${id}`);
                const img = document.createElement('img');
                img.src = ship.image;
                img.style.position = "absolute";
                img.style.top = `${y * 53}px`;
                img.style.left = `${x * 55 + 25 - x}px`;
                img.style.transform = "rotate(90deg)";
                img.style.transformOrigin = "0% 50%";
                elem.appendChild(img);
            }
            for (let i = 0; i < ship.length; i++) {
                field[y + i][x] = 1;
                ship.items[quantity].push([y + i, x]);
            }
        } else {
            counter++;
        }
    }
    ship.quantity = quantity;
}

const autoFillButton = document.getElementById("autoFillButton");
const autoFillButton2 = document.getElementById("autoFillButton2");
autoFillButton.addEventListener('click', autofill);
autoFillButton2.addEventListener('click', autofill);

function autofill(e) {
    let temp = 0;
    if (e.target == autoFillButton) {
        temp = document.querySelector('.field1');

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

        fillField(ship1comp, 'comp');
        fillField(ship2comp, 'comp');
        fillField(ship3comp, 'comp');
        fillField(ship4comp, 'comp');

        autoFillButton.classList.add("inactive");

    } else if (e.target == autoFillButton2) {
        temp = document.querySelector('.field2');


        fillField(ship1user, 'user');
        fillField(ship2user, 'user');
        fillField(ship3user, 'user');
        fillField(ship4user, 'user');

        autoFillButton2.classList.add("inactive");

    }

    const table = temp.getElementsByTagName("td");
    for (let i = 0; i < table.length; i++) {
        table[i].style.backgroundColor = "rgb(116, 183, 238)";
    };

    console.log(field1);

    const shipsfilled = new Event('shipsfilled');
    document.dispatchEvent(shipsfilled);

    /*
    for (let i = 0; i < field1.length; i++) {
        for (let j = 0; j < field1[0].length; j++) {
            if (field1[i][j] === 1) {
                const id = `${i}` + `${j}`;
                const elem = document.getElementById(`${id}comp`);
                elem.style.backgroundColor = "blue";
            }
        }
    }

    

    // окрашивание кораблей на поле

    for (let i = 0; i < field2.length; i++) {
        for (let j = 0; j < field2[0].length; j++) {
            if (field2[i][j] === 1) {
                const id = `${i}` + `${j}`;
                const elem = document.getElementById(`${id}`);
                elem.style.backgroundColor = "yellow";
                elem.style.border = "2px solid black";
            }
        }
    }
    */

}

let fieldDisplay2 = document.querySelector(".field2");
ship1user.display = document.querySelector(".ship1-table.active");
ship2user.display = document.querySelector(".ship2-table");
ship3user.display = document.querySelector(".ship3-table");
ship4user.display = document.querySelector(".ship4-table");

ship1user.display.addEventListener('dragstart', dragStart);
ship1user.display.addEventListener('mousedown', mouseDown);
ship2user.display.addEventListener('dragstart', dragStart);
ship2user.display.addEventListener('mousedown', mouseDown);
ship3user.display.addEventListener('dragstart', dragStart);
ship3user.display.addEventListener('mousedown', mouseDown);
ship4user.display.addEventListener('dragstart', dragStart);
ship4user.display.addEventListener('mousedown', mouseDown);

let currentShip = {};
let dragPoint = null;
let shiplength = 0;

ship1user.display.addEventListener('contextmenu', horVertChange);
ship2user.display.addEventListener('contextmenu', horVertChange);
ship3user.display.addEventListener('contextmenu', horVertChange);

function mouseDown(e) {
    dragPoint = e.target;
}

function horVertChange(e) {
    e.preventDefault();
    let active = document.querySelector(".ship1-table.active");
    let inactive = document.querySelector(".ship1-table.inactive");
    active.classList.toggle("active");
    active.classList.toggle("inactive");
    inactive.classList.toggle("inactive");
    inactive.classList.toggle("active");
    ship1user.display = document.querySelector(".ship1-table.active");
    console.log(ship1user.display);
    console.log(ship1user);
    ship1user.display.addEventListener('dragstart', dragStart);
    ship1user.display.addEventListener('mousedown', mouseDown);
    ship1user.display.addEventListener('contextmenu', horVertChange);
    ship2user.display.addEventListener('contextmenu', horVertChange);
    ship3user.display.addEventListener('contextmenu', horVertChange);
}

function dragStart(e) {
    shiplength = e.target.querySelectorAll("td").length;
    if (shiplength == 4) {
        currentShip = ship1user;
    } else if (shiplength == 3) {
        currentShip = ship2user;
    } else if (shiplength == 2) {
        currentShip = ship3user;
    } else if (shiplength == 1) {
        currentShip = ship4user;
    }
}


fieldDisplay2.addEventListener('dragover', dragover);
fieldDisplay2.addEventListener('dragleave', dragleave);
fieldDisplay2.addEventListener('drop', drop);

function dragover(e) {
    e.preventDefault();
    //if (e.target.tagName == "TD") {
    //  if (dragPoint.classList.contains("part01")) {

    //}

    // e.target.style.backgroundColor = "blue";
    //}
}

function dragleave(e) {
    if (e.target.tagName == "TD") {
        // e.target.style.backgroundColor = "#ccc";
    }
}

function drop(e) {
    console.log(currentShip);
    if (e.target.tagName == "TD" && currentShip.quantity > 0) {
        let indexes = e.target.getAttribute("id").split('');
        let y = parseInt(indexes[0]);
        let x = parseInt(indexes[1]);
        if (dragPoint.closest("#ship1-hor")) {
            // e.target.style.backgroundColor = "#ccc";
            if (dragPoint.classList.contains("part02")) {
                x -= 1;
                // field2[y][x - 1] = 1;
            } else if (dragPoint.classList.contains("part03")) {
                x -= 2;
            } else if (dragPoint.classList.contains("part04")) {
                x -= 3;
            }
            if (checkHorPath(x, y, currentShip, field2)) {
                const id = `${y}` + `${x}`;
                const elem = document.getElementById(`${id}`);
                const img = document.createElement('img');
                img.src = currentShip.image;
                img.style.position = "absolute";
                img.style.top = `${y * 54 + 10 - y}px`;
                img.style.left = `${x * 55 - x}px`;
                elem.appendChild(img);


                for (let i = 0; i < shiplength; i++) {
                    field2[y][x + i] = 1;
                    currentShip.items[currentShip.quantity - 1].push([y, x + i]);
                }
                currentShip.quantity--;
            }
        } else {
            if (dragPoint.classList.contains("part02")) {
                y -= 1;
                // field2[y][x - 1] = 1;
            } else if (dragPoint.classList.contains("part03")) {
                y -= 2;
            } else if (dragPoint.classList.contains("part04")) {
                y -= 3;
            }

            if (checkVertPath(x, y, currentShip, field2)) {

                const id = `${y}` + `${x}`;
                const elem = document.getElementById(`${id}`);
                const img = document.createElement('img');
                img.src = currentShip.image;
                img.style.position = "absolute";
                img.style.top = `${y * 50}px`;
                img.style.left = `${x * 55 + 25 - x}px`;
                img.style.transform = "rotate(90deg)";
                img.style.transformOrigin = "0% 50%";
                elem.appendChild(img);

                for (let i = 0; i < shiplength; i++) {
                    field2[y + i][x] = 1;
                    currentShip.items[currentShip.quantity - 1].push([y + i, x]);
                }
                currentShip.quantity--;
            }
        }

        console.log(field2);
        const shipsfilled = new Event('shipsfilled');
        document.dispatchEvent(shipsfilled);

        /*
        for (let i = 0; i < field2.length; i++) {
            for (let j = 0; j < field2[0].length; j++) {
                if (field2[i][j] === 1) {
                    const id = `${i}` + `${j}`;
                    const elem = document.getElementById(`${id}`);
                    if (elem.style.backgroundColor != "yellow") {
                        elem.style.backgroundColor = "yellow";
                        elem.style.border = "2px solid black";
                    }
                }
            }
        }
        */

    }
}



