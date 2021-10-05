
let cells = document.getElementsByTagName('td');

function changeColor() {
    if (cells[0].style.backgroundColor === "red") {
        for (let i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = "white";
        }
    } else {
        for (let i = 0; i < cells.length; i++) {
            if (i % 6 === 0) {
                cells[i].style.backgroundColor = "red";
            }
        }
    }
}
