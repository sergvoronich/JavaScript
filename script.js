var lastNameEntry, lastName;
var firstNameEntry, firstName;
var middleNameEntry, middleName;
var age;
var sexEntry, sex;
var retire;
var ageInDays;
var ageInFiveYears;

function nameCheck(name, x) {
    for (; ;) {
        if (name === "" || Number.isInteger(parseInt(name))) {
            alert(`Нужно ввести ${x}!`);
            name = prompt(`Введите ${x}:`);
        } else if (name === null) {
            name = " ";
            break;
        } else if (name.length > 30) {
            alert("Не может быть!");
            name = prompt(`Введите ${x}:`);
        } else {
            break;
        }
    }
    return name;
}

lastName = (lastNameEntry = nameCheck(prompt("Введите вашу фамилию:"), "фамилию"));
firstName = (firstNameEntry = nameCheck(prompt("Введите ваше имя:"), "имя"));
middleName = (middleNameEntry = nameCheck(prompt("Введите вашу отчество:"), "отчество"));

age = prompt("Введите ваш возраст:");
for (; ;) {
    if (age === null) {
        age = "неизвестно";
        break;
    } else if (age === "" || !Number.isInteger(parseInt(age))) {
        alert("Нужно ввести число!");
        age = prompt("Введите ваш возраст:");
    } else if (parseInt(age) > 120 || parseInt(age) <= 0) {
        alert("Не может быть!");
        age = prompt("Введите ваш возраст:");
    } else {
        age = parseInt(age);
        break;
    }
}

sexEntry = confirm("Ваш пол мужской?");

if (sexEntry) {
    sex = "мужской";
    if (age >= 57) {
        retire = "да";
    } else {
        retire = "нет";
    }
} else {
    sex = "женский";
    if (age >= 62) {
        retire = "да";
    } else {
        retire = "нет";
    }
}

if (age === "неизвестно") {
    ageInDays = "неизвестно";
    ageInFiveYears = "неизвестно";
    retire = "неизвестно";
} else {
    ageInDays = age * 365 + (parseInt(age / 4));
    ageInFiveYears = age + 5;
}

alert("ваше ФИО: " + lastName + " " + firstName + " " + middleName + " "
    + "\nваш возраст в годах: " + age + "\nваш возраст в днях: " + ageInDays
    + "\nчерез 5 лет вам будет: " + ageInFiveYears + "\nваш пол: " + sex +
    "\nвы на пенсии: " + retire);