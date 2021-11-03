
function createClock() {
    // создание часов
    let diameter = document.getElementById('diameter').value;
    if (diameter < 200 || diameter > 800) {
        diameter = 200;
    }
    const button = document.querySelector(".button");
    button.insertAdjacentHTML("afterend", '<div class="clock-container"><div class="clock"></div></div>');
    const clock = document.querySelector('.clock');
    clock.style.width = diameter + "px";
    clock.style.height = diameter + "px";

    // создание стрелок и добавление к ним соответствующих классов
    const hourArrow = document.createElement("span");
    const minuteArrow = document.createElement("span");
    const secondArrow = document.createElement("span");
    hourArrow.classList.add("hour-arrow");
    minuteArrow.classList.add("minute-arrow");
    secondArrow.classList.add("second-arrow");

    // определение центра часов и различных размеров в зависимости от диаметра часов
    const center = parseFloat(clock.getBoundingClientRect().width) / 2;
    const hourCircleWidth = clock.getBoundingClientRect().width * 0.15;
    const digitalClockSize = diameter * 0.1;
    const digitalClockPosX = diameter * 0.32;
    const digitalClockPosY = diameter * 0.25;
    const radius = diameter / 2 * 0.8;
    const hourArrowHeight = diameter / 2 * 0.6;
    const minuteArrowHeight = diameter / 2 * 0.85;
    const secondArrowHeight = diameter / 2 * 0.9;
    const hourArrowWidth = diameter * 0.03;
    const minuteArrowWidth = diameter * 0.02;
    const secondArrowWidth = diameter * 0.01;

    // цикл для расстановки кружков с цифрой часа
    let angle = 0;
    for (let i = 0; i < 12; i++) {
        const hour = i + 1;
        angle += 30;
        const angleInRad = angle / 180 * Math.PI;
        const hourCircle = document.createElement("span");
        hourCircle.classList.add("hour-circle");
        hourCircle.innerHTML = hour;
        hourCircle.style.width = hourCircleWidth + "px";
        hourCircle.style.height = hourCircleWidth + "px";
        hourCircle.style.lineHeight = hourCircleWidth + "px";
        hourCircle.style.fontSize = hourCircleWidth * 0.75 + "px";

        const centerX = center + radius * Math.sin(angleInRad);
        const centerY = center - radius * Math.cos(angleInRad);

        const posX = centerX - hourCircleWidth / 2;
        const posY = centerY - hourCircleWidth / 2;

        hourCircle.style.left = posX + "px";
        hourCircle.style.top = posY + "px";
        clock.appendChild(hourCircle);

    }

    // создание цифровых часов
    clock.insertAdjacentHTML('afterbegin', '<span class="digital-clock"></span>');
    const timeContainer = document.querySelector(".digital-clock");
    timeContainer.style.fontSize = digitalClockSize + "px";
    timeContainer.style.left = digitalClockPosX + "px";
    timeContainer.style.top = digitalClockPosY + "px";


    // функция для получения времени
    function getTime() {
        let date = new Date();
        timeContainer.innerHTML = formatDate(date);
    }
    // функция для форматирования времени
    function formatDate(date) {
        let hour = addZero(date.getHours());
        let minute = addZero(date.getMinutes());
        let second = addZero(date.getSeconds());

        function addZero(number) {
            if (number.toString().length == 1) {
                number = "0" + number.toString();
                return number;
            } else {
                return number.toString();
            }
        }

        return hour + ":" + minute + ":" + second;
    }

    // функция для определения положения секундной стрелки
    function secondArrowSet() {
        const time = new Date();
        const seconds = time.getSeconds();
        return seconds * 6;
    }

    // функция для определения положения минутной стрелки
    function minuteArrowSet() {
        const time = new Date();
        const minutes = time.getMinutes();
        return minutes * 6;
    }

    // функция для определения положения часовой стрелки
    function hourArrowSet() {
        const time = new Date();
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const degree = hours * 30 + minutes * 0.5;
        return degree;
    }

    // добавление секундной стрелки
    clock.appendChild(secondArrow);
    secondArrow.style.width = secondArrowWidth + "px";
    secondArrow.style.height = secondArrowHeight + "px";
    const secondArrowPosX = center - secondArrow.getBoundingClientRect().width / 2;
    const secondArrowPosY = center - secondArrow.getBoundingClientRect().height * 0.9;
    secondArrow.style.left = secondArrowPosX + "px";
    secondArrow.style.top = secondArrowPosY + "px";
    // начальная установка секундной стрелки
    let secondArrowAngle = secondArrowSet();
    secondArrow.style.transformOrigin = "50% 90%";
    secondArrow.style.transform = `rotate(${secondArrowAngle}deg)`;


    // добавление минутной стрелки
    clock.appendChild(minuteArrow);
    minuteArrow.style.width = minuteArrowWidth + "px";
    minuteArrow.style.height = minuteArrowHeight + "px";
    const minuteArrowPosX = center - minuteArrow.getBoundingClientRect().width / 2;
    const minuteArrowPosY = center - minuteArrow.getBoundingClientRect().height * 0.9;
    minuteArrow.style.left = minuteArrowPosX + "px";
    minuteArrow.style.top = minuteArrowPosY + "px";
    // начальная установка минутной стрелки
    let minuteArrowAngle = minuteArrowSet();
    minuteArrow.style.transformOrigin = "50% 90%";
    minuteArrow.style.transform = `rotate(${minuteArrowAngle}deg)`;


    // добавление часовой стрелки
    clock.appendChild(hourArrow);
    hourArrow.style.width = hourArrowWidth + "px";
    hourArrow.style.height = hourArrowHeight + "px";
    const hourArrowPosX = center - hourArrow.getBoundingClientRect().width / 2;
    const hourArrowPosY = center - hourArrow.getBoundingClientRect().height * 0.9;
    hourArrow.style.left = hourArrowPosX + "px";
    hourArrow.style.top = hourArrowPosY + "px";
    // начальная установка минутной стрелки
    let hourArrowAngle = hourArrowSet();
    hourArrow.style.transformOrigin = "50% 90%";
    hourArrow.style.transform = `rotate(${hourArrowAngle}deg)`;

    // функция для перемещения стрелок
    function moveArrows() {
        let secondArrowAngle = secondArrowSet();
        secondArrow.style.transformOrigin = "50% 90%";
        secondArrow.style.transform = `rotate(${secondArrowAngle}deg)`;
        if (secondArrowAngle == 0) {
            minuteArrowAngle = minuteArrowSet();
            minuteArrow.style.transformOrigin = "50% 90%";
            minuteArrow.style.transform = `rotate(${minuteArrowAngle}deg)`;
            hourArrowAngle = hourArrowSet();
            hourArrow.style.transformOrigin = "50% 90%";
            hourArrow.style.transform = `rotate(${hourArrowAngle}deg)`;
            console.log(hourArrowAngle);
        }
    }

    document.addEventListener('set', getTime);
    document.addEventListener('set', moveArrows);
}

// функция для генерирования события, по которому будут обновляться 
// все цифровые часы (если их несколько) и вращаться стрелки
function updateTime() {
    const set = new Event('set');
    document.dispatchEvent(set);
}

// функция для запуска ежесекундного генерирования события
function startTimeUpdate() {
    setInterval(updateTime, 1000);
}

const button = document.querySelector(".button");
button.addEventListener('click', createClock);
button.addEventListener('click', startTimeUpdate);

