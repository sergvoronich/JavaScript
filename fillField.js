"use strict"

let field = [
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



let ship1 = {
    length: 4,
    quantity: 1
};

let ship2 = {
    length: 3,
    quantity: 2
};

let ship3 = {
    length: 2,
    quantity: 3
};

let ship4 = {
    length: 1,
    quantity: 4
};


function checkVertPath(x, y, ship) {
    let errors = 0;
    if ((y + ship.length) < field.length) {
        for (let i = 0; i < ship.length; i++) {
            if (y === 0) {
                if (x === 0) {
                    // проверки верхнего левого угла
                    if (field[y + i + 1][x] === 0 && field[y + i + 1][x + 1] === 0 && field[y + i][x + 1] === 0) {
                        errors += 0;
                    } else {
                        errors += 1;
                    }
                } else if (x === 9) {
                    // проверки верхнего правого угла
                    if (field[y + i + 1][x] === 0 && field[y + i + 1][x - 1] === 0 && field[y + i][x - 1] === 0) {
                        errors += 0;
                    } else {
                        errors += 1;
                    }
                } else {
                    // проверки остальных крайних полей по линии у=0
                    if (field[y + i][x - 1] === 0 && field[y + i + 1][x - 1] === 0
                        && field[y + i + 1][x] === 0 && field[y + i][x + 1] === 0 && field[y + i + 1][x + 1] === 0) {
                        errors += 0;
                    } else {
                        errors += 1;
                    }
                }
            } else if (y === 9) {
                if (x === 0) {
                    // проверки нижнего левого угла
                    if (field[y + i - 1][x] === 0 && field[y + i - 1][x + 1] === 0 && field[y + i][x + 1] === 0) {
                        errors += 0;
                    } else {
                        errors += 1;
                    }
                } else if (x === 9) {
                    // проверки нижнего правого угла
                    if (field[y + i - 1][x - 1] === 0 && field[y + i][x - 1] === 0 && field[y + i - 1][x] === 0) {
                        errors += 0;
                    } else {
                        errors += 1;
                    }
                } else {
                    // проверки остальных крайних полей по линии у=10
                    if (field[y + i - 1][x - 1] === 0 && field[y + i][x - 1] === 0
                        && field[y + i - 1][x] === 0 && field[y + i - 1][x + 1] === 0 && field[y + i][x + 1] === 0) {
                        errors += 0;
                    } else {
                        errors += 1;
                    }
                }
            } else if (x === 0) {
                // проверки крайних полей по линии х=0
                if (field[y + i - 1][x] === 0 && field[y + i + 1][x] === 0
                    && field[y + i - 1][x + 1] === 0 && field[y + i][x + 1] === 0 && field[y + i + 1][x + 1] === 0) {
                    errors += 0;
                } else {
                    errors += 1;
                }
            } else if (x === 9) {
                // проверки крайних полей по линии х=10
                if (field[y + i - 1][x - 1] === 0 && field[y + i][x - 1] === 0 && field[y + i + 1][x - 1] === 0
                    && field[y + i - 1][x] === 0 && field[y + i + 1][x] === 0) {
                    errors += 0;
                } else {
                    errors += 1;
                }
            } else {
                if (field[y + i - 1][x - 1] === 0 && field[y + i][x - 1] === 0 && (field[y + i + 1][x - 1] === 0) &&
                    field[y + i - 1][x] === 0 && field[y + i + 1][x] === 0
                    && field[y + i - 1][x + 1] === 0 && field[y + i][x + 1] === 0 && field[y + i + 1][x + 1] === 0) {
                    errors += 0;
                } else {
                    errors += 1;
                }
            }
        }

    } else {
        errors = + 1;
    }

    if (errors === 0) {
        return true;
    } else {
        return false;
    }

}

function checkHorPath(x, y, ship) {
    let errors = 0;
    if ((x + ship.length) < field[0].length) {
        for (let i = 0; i < ship.length; i++) {
            if (y === 0) {
                if (x === 0) {
                    // проверки верхнего левого угла
                    if (field[y + 1][x + i] === 0 && field[y + 1][x + i + 1] === 0 && field[y][x + i + 1] === 0) {
                        errors += 0;
                    } else {
                        errors += 1;
                    }
                } else if (x === 9) {
                    // проверки верхнего правого угла
                    if (field[y + 1][x + i] === 0 && field[y + 1][x + i - 1] === 0 && field[y][x + i - 1] === 0) {
                        errors += 0;
                    } else {
                        errors += 1;
                    }
                } else {
                    // проверки остальных крайних полей по линии у=0
                    if (field[y][x + i - 1] === 0 && field[y + 1][x + i - 1] === 0
                        && field[y + 1][x + i] === 0 && field[y][x + i + 1] === 0 && field[y + 1][x + i + 1] === 0) {
                        errors += 0;
                    } else {
                        errors += 1;
                    }
                }
            } else if (y === 9) {
                if (x === 0) {
                    // проверки нижнего левого угла
                    if (field[y - 1][x + i] === 0 && field[y - 1][x + i + 1] === 0 && field[y][x + i + 1] === 0) {
                        errors += 0;
                    } else {
                        errors += 1;
                    }
                } else if (x === 9) {
                    // проверки нижнего правого угла
                    if (field[y - 1][x + i - 1] === 0 && field[y][x + i - 1] === 0 && field[y - 1][x + i] === 0) {
                        errors += 0;
                    } else {
                        errors += 1;
                    }
                } else {
                    // проверки остальных крайних полей по линии у=10
                    if (field[y - 1][x + i - 1] === 0 && field[y][x + i - 1] === 0
                        && field[y - 1][x + i] === 0 && field[y - 1][x + i + 1] === 0 && field[y][x + i + 1] === 0) {
                        errors += 0;
                    } else {
                        errors += 1;
                    }
                }
            } else if (x === 0) {
                // проверки крайних полей по линии х=0
                if (field[y - 1][x + i] === 0 && (field[y + 1][x + i] === 0)
                    && field[y - 1][x + i + 1] === 0 && field[y][x + i + 1] === 0 && field[y + 1][x + i + 1] === 0) {
                    errors += 0;
                } else {
                    errors += 1;
                }
            } else if (x === 9) {
                // проверки крайних полей по линии х=10
                if (field[y - 1][x + i - 1] === 0 && field[y][x + i - 1] === 0 && field[y + 1][x + i - 1] === 0
                    && field[y - 1][x + i] === 0 && field[y + 1][x + i] === 0) {
                    errors += 0;
                } else {
                    errors += 1;
                }
            } else {
                // проверки всех остальных полей
                if ((field[y - 1][x + i - 1] === 0) && (field[y][x + i - 1] === 0) &&
                    (field[y + 1][x - 1 + i] === 0)
                    && (field[y - 1][x + i] === 0) && (field[y + 1][x + i] === 0)
                    && (field[y - 1][x + i + 1] === 0) && (field[y][x + i + 1] === 0) && (field[y + 1][x + i + 1] === 0)) {
                    errors += 0;
                } else {
                    errors += 1;
                }
            }
        }

    } else {
        errors = + 1;
    }

    if (errors === 0) {
        return true;
    } else {
        return false;
    }

}



function fillField(ship) {
    let counter = 0;
    for (let i = 0; i < ship.quantity + counter; i++) {
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);
        if (field[y][x] != 1 && checkHorPath(x, y, ship)) {
            for (let i = 0; i < ship.length; i++) {
                field[y][x + i] = 1;
            }
        } else if (field[y][x] != 1 && checkVertPath(x, y, ship)) {
            for (let i = 0; i < ship.length; i++) {
                field[y + i][x] = 1;
            }
        } else {
            counter++;
        }
    }



}


fillField(ship1);
fillField(ship2);
fillField(ship3);
fillField(ship4);

console.log(field);