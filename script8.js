

function validateInputs(e) {
    if (!e.target.value && !e.target.parentNode.querySelector(".warning")) {
        let span = document.createElement("span");
        span.classList.add("warning");
        span.textContent = "Поле не может быть пустым!";
        e.target.parentNode.appendChild(span);
    } else if (e.target.value && e.target.parentNode.querySelector(".warning")) {
        let warning = e.target.parentNode.querySelector(".warning");
        console.log(e.target.parentNode);
        e.target.parentNode.removeChild(warning);
    }
}


function validateRadios() {
    let radios = document.querySelectorAll('input[type = "radio"]');
    let checked = false;

    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked === true) {
            checked = true;
        }
    }

    let radio = document.getElementById("input7");

    if (checked && radio.parentNode.querySelector(".warning")) {
        let warning = radio.parentNode.querySelector(".warning");
        console.log(radio.parentNode);
        radio.parentNode.removeChild(warning);
    }
}

function validateCheckbox() {
    let checkbox = document.getElementById("input10");
    if (checkbox.checked && checkbox.parentNode.querySelector(".warning")) {
        let warning = checkbox.parentNode.querySelector(".warning");
        console.log(checkbox.parentNode);
        checkbox.parentNode.removeChild(warning);
    }

}


function validateForm(e) {

    // Проверка полей для ввода текста, даты, е-мэйла и т.д.

    let inp = document.querySelectorAll(".form__input");
    let errors = 0;
    for (let i = 0; i < inp.length; i++) {
        if (!inp[i].value) {
            errors++;
            if (!inp[i].parentNode.querySelector(".warning")) {
                let span = document.createElement("span");
                span.classList.add("warning");
                span.textContent = "Поле не может быть пустым!";
                inp[i].parentNode.appendChild(span);
            }
        }
    }

    // Проверка чекбокса

    let checkbox = document.getElementById("input10");
    if (checkbox.checked === false && !checkbox.parentNode.querySelector(".warning")) {
        let span2 = document.createElement("span");
        span2.classList.add("warning");
        span2.textContent = "Обязательно поставьте галочку!";
        checkbox.parentNode.appendChild(span2);
        errors++;
    } else if (checkbox.checked && checkbox.parentNode.querySelector(".warning")) {
        let warning = checkbox.parentNode.querySelector(".warning");
        console.log(checkbox.parentNode);
        checkbox.parentNode.removeChild(warning);
    }


    // Проверка радиокнопки

    let radios = document.querySelectorAll('input[type = "radio"]');
    let checked = false;

    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked === true) {
            checked = true;
        }
    }

    let radio = document.getElementById("input7");

    if (!checked && !radio.parentNode.querySelector(".warning")) {
        let span3 = document.createElement("span");
        span3.classList.add("warning");
        span3.textContent = "Обязательно выберите один из вариантов!";
        radio.parentNode.appendChild(span3);
        errors++;
    } else if (checked && radio.parentNode.querySelector(".warning")) {
        let warning = radio.parentNode.querySelector(".warning");
        console.log(radio.parentNode);
        radio.parentNode.removeChild(warning);
    }


    // Общая проверка наличия ошибок в форме и при их выявлении запрет отправки путем изменения типа кнопки
    let but = document.querySelector(".button");
    if (errors > 0) {
        but.setAttribute("type", "button");
        let form = document.querySelector("form");
        form.addEventListener("submit", function (e) { e.preventDefault; });
        alert("Отправка формы запрещена!");
    } else {
        but.setAttribute("type", "submit");
    }
}



let button = document.querySelector('.button');
button.addEventListener("click", validateForm);


let inputs = document.querySelectorAll(".form__input");
inputs.forEach(item => {
    item.addEventListener("blur", validateInputs);
});


let radio = document.getElementById("radios");
radio.addEventListener("click", validateRadios);

let checkbox = document.getElementById("input10");
checkbox.addEventListener("click", validateCheckbox);

