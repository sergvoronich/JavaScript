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


let level = 2;
const mainColor = "rgba(116, 183, 238, 0.6);";
const woundedColor = "rgba(218, 136, 126, 0.6)";
const killedColor = "rgba(73, 1, 1, 0.6)";

const boom1 = new Audio();
boom1.src = "sounds/boom1.mp3";
const boom2 = new Audio();
boom2.src = "sounds/boom2.mp3";
const boom3 = new Audio();
boom3.src = "sounds/boom3.mp3";

const music1 = new Audio();
music1.src = "sounds/muzyka_dlya_bitv.mp3";
const music2 = new Audio();
music2.src = "sounds/morskoe_srazhenie.mp3";

let readytoPlay = false;

const ship1 = document.querySelector(".ship1");
const ship2 = document.querySelector(".ship2");
const ship3 = document.querySelector(".ship3");
const ship4 = document.querySelector(".ship4");

const resetButton = document.getElementById("resetButton");
const autoFillButton = document.getElementById("autoFillButton");


let ship1comp = {
    length: 4,
    initquantity: 1,
    quantity: 1,
    items: [[]],
    adjacentArea: [[]],
    shot: [0],
    image: "ships_images/Battleship/ShipBattleshipHull.png",
    gunImage: "ships_images/Battleship/WeaponBattleshipStandardGun.png",
    gunImageVert: "ships_images/Battleship/WeaponBattleshipStandardGunVert.png",
    horiz: [],
    width: 210,
};

let ship2comp = {
    length: 3,
    initquantity: 2,
    quantity: 2,
    items: [[], []],
    adjacentArea: [[], []],
    shot: [0, 0],
    image: "ships_images/Cruiser/ShipCruiserHull.png",
    horiz: [],
    width: 160,
};

let ship3comp = {
    length: 2,
    initquantity: 3,
    quantity: 3,
    items: [[], [], []],
    adjacentArea: [[], [], []],
    shot: [0, 0, 0],
    image: "ships_images/Destroyer/ShipDestroyerHull.png",
    horiz: [],
    width: 107,
};

let ship4comp = {
    length: 1,
    initquantity: 4,
    quantity: 4,
    items: [[], [], [], []],
    adjacentArea: [[], [], [], []],
    shot: [0, 0, 0, 0],
    image: "ships_images/Plane/PlaneF-35Lightning2.png",
    horiz: [],
    width: 54,
};

let ship1user = {
    length: 4,
    initquantity: 1,
    quantity: 1,
    display: null,
    items: [[]],
    adjacentArea: [[]],
    shot: [0],
    image: "ships_images/Battleship/ShipBattleshipHull.png",
    gunImage: "ships_images/Battleship/WeaponBattleshipStandardGun.png",
    gunImageVert: "ships_images/Battleship/WeaponBattleshipStandardGunVert.png",
    horiz: [],
    width: 210,
};

let ship2user = {
    length: 3,
    initquantity: 2,
    quantity: 2,
    display: null,
    items: [[], []],
    adjacentArea: [[], []],
    shot: [0, 0],
    image: "ships_images/Cruiser/ShipCruiserHull.png",
    gunImage: "ships_images/Cruiser/WeaponSubmarineStandard.png",
    gunImageVert: "ships_images/Cruiser/WeaponSubmarineStandardVert.png",
    horiz: [],
    width: 160,
};

let ship3user = {
    length: 2,
    initquantity: 3,
    quantity: 3,
    display: null,
    items: [[], [], []],
    adjacentArea: [[], [], []],
    shot: [0, 0, 0],
    image: "ships_images/Destroyer/ShipDestroyerHull.png",
    gunImage: "ships_images/Destroyer/WeaponDestroyerStandardGun.png",
    gunImageVert: "ships_images/Destroyer/WeaponDestroyerStandardGunVert.png",
    horiz: [],
    width: 107,
};

let ship4user = {
    length: 1,
    initquantity: 4,
    quantity: 4,
    display: null,
    items: [[], [], [], []],
    adjacentArea: [[], [], [], []],
    shot: [0, 0, 0, 0],
    image: "ships_images/Plane/PlaneF-35Lightning2.png",
    horiz: [],
    width: 54,
};


function checkVertPath(x, y, ship, field) {
    let errors = 0;
    if ((y + ship.length) <= field.length && field[y][x] != 1) {
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
            } else if (y + i === 9) {
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
            ship.horiz.unshift(true);
            if (player == 'user') {
                const id = `${y}` + `${x}`;
                const elem = document.getElementById(`${id}`);
                const img = document.createElement('img');
                img.src = ship.image;
                elem.appendChild(img);
                const imgstyle = getComputedStyle(img);
                img.style.position = "absolute";
                img.style.top = `${y * 53 + 25 - parseFloat(imgstyle.height) / 2}px`;
                img.style.left = `${x * 55 - x * 2}px`;
                img.style.width = `${ship.width}px`;
                if (ship.gunImage) {
                    const gun = document.createElement('img');
                    gun.src = ship.gunImage;
                    elem.appendChild(gun);
                    gun.style.position = "absolute";
                    if (ship.length == 4) {
                        gun.style.top = `${y * 53 + 31 - parseFloat(imgstyle.height) / 2}px`;
                        gun.style.left = `${x * 55 + 38 - x * 2}px`;
                        gun.style.width = `${ship.width * 0.2}px`;
                        gun.classList.add("rotate-horiz-gun");
                    } else if (ship.length == 2) {
                        gun.style.top = `${y * 53 + 30 - parseFloat(imgstyle.height) / 2}px`;
                        gun.style.left = `${x * 55 + 18 - x * 2}px`;
                        gun.style.width = `${ship.width * 0.2}px`;
                    } else if (ship.length == 3) {
                        gun.style.top = `${y * 53 + 32 - parseFloat(imgstyle.height) / 2}px`;
                        gun.style.left = `${x * 55 + 33 - x * 2}px`;
                        gun.style.width = `${ship.width * 0.2}px`;
                        gun.classList.add("rotate-horiz-gun");
                    }
                }
            }

            for (let i = 0; i < ship.length; i++) {
                field[y][x + i] = 1;
                ship.items[quantity].push([y, x + i]);
            }
        } else if (checkVertPath(x, y, ship, field)) {
            quantity--;
            ship.horiz.unshift(false);
            if (player == 'user') {
                const id = `${y}` + `${x}`;
                const elem = document.getElementById(`${id}`);
                const img = document.createElement('img');
                elem.appendChild(img);
                const imgstyle = getComputedStyle(img);
                img.src = ship.image;
                img.style.position = "absolute";
                img.style.top = `${y * 53}px`;
                img.style.left = `${x * 53 + 27 + parseFloat(imgstyle.height) / 2}px`;
                img.style.width = `${ship.width}px`;
                img.style.transform = "rotate(90deg)";
                img.style.transformOrigin = "0% 0%";
                if (ship.gunImageVert && ship.length != 2) {
                    const gun = document.createElement('img');
                    gun.src = ship.gunImageVert;
                    elem.appendChild(gun);
                    gun.style.position = "absolute";
                    gun.style.top = `${y * 53 + 51 - parseFloat(imgstyle.height) / 2}px`;
                    gun.style.left = `${x * 55 + 17 - x * 2}px`;
                    gun.style.width = `${ship.width * 0.1}px`;
                    gun.classList.add("rotate-vert-gun");
                }
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


autoFillButton.addEventListener('click', autofill);

function autofill(e) {
    let temp = 0;
    if (!e) {
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

    } else if (e.target == autoFillButton) {
        temp = document.querySelector('.field2');

        fillField(ship1user, 'user');
        fillField(ship2user, 'user');
        fillField(ship3user, 'user');
        fillField(ship4user, 'user');

        // autoFillButton.classList.add("inactive");

    }

    /*
    const table = temp.getElementsByTagName("td");
    for (let i = 0; i < table.length; i++) {
        table[i].style.backgroundColor = "rgb(116, 183, 238, 0.5)";
    };
    */

    console.log(field1);
    countUpdate();

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
ship2user.display = document.querySelector(".ship2-table.active");
ship3user.display = document.querySelector(".ship3-table.active");
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
const count1 = document.querySelector(".count1");
const count2 = document.querySelector(".count2");
const count3 = document.querySelector(".count3");
const count4 = document.querySelector(".count4");
countUpdate();

function countUpdate() {
    count1.textContent = `x ${ship1user.quantity}`;
    count2.textContent = `x ${ship2user.quantity}`;
    count3.textContent = `x ${ship3user.quantity}`;
    count4.textContent = `x ${ship4user.quantity}`;
}

autofill();

ship1user.display.addEventListener('contextmenu', horVertChange);
ship2user.display.addEventListener('contextmenu', horVertChange);
ship3user.display.addEventListener('contextmenu', horVertChange);

function mouseDown(e) {
    dragPoint = e.target;
}

function horVertChange(e) {
    e.preventDefault();
    let active;
    let inactive;
    let img;

    if (e.target.closest(".ship1") != null) {
        active = document.querySelector(".ship1-table.active");
        console.log(active);
        inactive = document.querySelector(".ship1-table.inactive");
        img = document.querySelector(".ship1 img");
        active.classList.toggle("active");
        active.classList.toggle("inactive");
        inactive.classList.toggle("inactive");
        inactive.classList.toggle("active");
        img.classList.toggle("rotate");
        ship1user.display = document.querySelector(".ship1-table.active");
        ship1user.display.addEventListener('dragstart', dragStart);
        ship1user.display.addEventListener('mousedown', mouseDown);
        ship1user.display.addEventListener('contextmenu', horVertChange);
    } else if (e.target.closest(".ship2") != null) {
        console.log(active);
        active = document.querySelector(".ship2-table.active");
        inactive = document.querySelector(".ship2-table.inactive");
        img = document.querySelector(".ship2 img");
        active.classList.toggle("active");
        active.classList.toggle("inactive");
        inactive.classList.toggle("inactive");
        inactive.classList.toggle("active");
        img.classList.toggle("rotate");
        ship2user.display = document.querySelector(".ship2-table.active");
        ship2user.display.addEventListener('dragstart', dragStart);
        ship2user.display.addEventListener('mousedown', mouseDown);
        ship2user.display.addEventListener('contextmenu', horVertChange);
    } else if (e.target.closest(".ship3") != null) {
        active = document.querySelector(".ship3-table.active");
        inactive = document.querySelector(".ship3-table.inactive");
        img = document.querySelector(".ship3 img");
        active.classList.toggle("active");
        active.classList.toggle("inactive");
        inactive.classList.toggle("inactive");
        inactive.classList.toggle("active");
        img.classList.toggle("rotate");
        ship3user.display = document.querySelector(".ship3-table.active");
        ship3user.display.addEventListener('dragstart', dragStart);
        ship3user.display.addEventListener('mousedown', mouseDown);
        ship3user.display.addEventListener('contextmenu', horVertChange);
    }
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
}

function dragleave(e) {
    if (e.target.tagName == "TD") {
        // e.target.style.backgroundColor = "#ccc";
    }
}

function drop(e) {
    if (e.target.tagName == "TD" && currentShip.quantity > 0) {
        let indexes = e.target.getAttribute("id").split('');
        let y = parseInt(indexes[0]);
        let x = parseInt(indexes[1]);
        if (dragPoint.closest(".ship-table-hor")) {
            if (dragPoint.classList.contains("part02")) {
                x -= 1;
            } else if (dragPoint.classList.contains("part03")) {
                x -= 2;
            } else if (dragPoint.classList.contains("part04")) {
                x -= 3;
            }
            dragPoint = null;
            if (checkHorPath(x, y, currentShip, field2)) {
                const id = `${y}` + `${x}`;
                const elem = document.getElementById(`${id}`);
                const img = document.createElement('img');
                img.src = currentShip.image;
                elem.appendChild(img);
                const imgstyle = getComputedStyle(img);
                img.style.position = "absolute";
                img.style.top = `${y * 53 + 25 - parseFloat(imgstyle.height) / 2}px`;
                img.style.left = `${x * 55 - x * 2}px`;
                img.style.width = `${currentShip.width}px`;
                if (currentShip.gunImage) {
                    const gun = document.createElement('img');
                    gun.src = currentShip.gunImage;
                    elem.appendChild(gun);
                    gun.style.position = "absolute";
                    gun.style.top = `${y * 53 + 31 - parseFloat(imgstyle.height) / 2}px`;
                    gun.style.left = `${x * 55 + 38 - x * 2}px`;
                    gun.style.width = `${currentShip.width * 0.2}px`;
                    gun.classList.add("rotate-horiz-gun");
                    //setTimeout(() => { gun.classList.remove("rotate-horiz-gun"); }, 2000);
                    //setTimeout(() => { gun.classList.add("shoot-horiz-gun"); }, 2000);
                }

                for (let i = 0; i < shiplength; i++) {
                    field2[y][x + i] = 1;
                    currentShip.items[currentShip.quantity - 1].push([y, x + i]);
                }
                currentShip.quantity--;
                countUpdate();
            }
        } else if (dragPoint.closest(".ship-table-vert")) {
            if (dragPoint.classList.contains("part02")) {
                y -= 1;
            } else if (dragPoint.classList.contains("part03")) {
                y -= 2;
            } else if (dragPoint.classList.contains("part04")) {
                y -= 3;
            }
            dragPoint = null;
            if (checkVertPath(x, y, currentShip, field2)) {
                const id = `${y}` + `${x}`;
                const elem = document.getElementById(`${id}`);
                const img = document.createElement('img');
                img.src = currentShip.image;
                elem.appendChild(img);
                const imgstyle = getComputedStyle(img);
                img.style.position = "absolute";
                img.style.top = `${y * 53}px`;
                img.style.left = `${x * 53 + 27 + parseFloat(imgstyle.height) / 2}px`;
                img.style.width = `${currentShip.width}px`;
                img.style.transform = "rotate(90deg)";
                img.style.transformOrigin = "0% 0%";
                if (currentShip.gunImageVert) {
                    const gun = document.createElement('img');
                    gun.src = currentShip.gunImageVert;
                    elem.appendChild(gun);
                    gun.style.position = "absolute";
                    gun.style.top = `${y * 53 + 51 - parseFloat(imgstyle.height) / 2}px`;
                    gun.style.left = `${x * 55 + 17 - x * 2}px`;
                    gun.style.width = `${currentShip.width * 0.1}px`;
                    gun.classList.add("rotate-vert-gun");
                }

                for (let i = 0; i < shiplength; i++) {
                    field2[y + i][x] = 1;
                    currentShip.items[currentShip.quantity - 1].push([y + i, x]);
                }
                currentShip.quantity--;
                countUpdate();
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

let timer;


function playMusic() {
    clearInterval(timer);
    if (readytoPlay == true) {
        music1.play();
        music1.volume = 0.3;
        music1.loop = true;
    } else {
        timer = setInterval(playMusic, 5000);
    }
}

function startPlayMusic() {
    readytoPlay = true;
}

playMusic();
document.addEventListener('click', startPlayMusic);





