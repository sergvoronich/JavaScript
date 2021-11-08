
function createClock() {
    // создание часов
    let diameter = document.getElementById('diameter').value;
    if (diameter < 200 || diameter > 800) {
        diameter = 200;
    }
    const button = document.querySelector(".button");
    button.insertAdjacentHTML("afterend", "<svg id='clock-container'><circle id='clock' fill='orange'/></svg>");
    const clockContainer = document.getElementById('clock-container');
    clockContainer.setAttribute('height', diameter);
    clockContainer.setAttribute('width', diameter);
    const clock = document.getElementById('clock');
    clock.setAttribute('cx', diameter / 2);
    clock.setAttribute('cy', diameter / 2);
    clock.setAttribute('r', diameter / 2);
    clock.setAttribute('fill', 'orange');

    // определение центра часов и различных размеров в зависимости от диаметра часов
    const center = diameter / 2;
    const hourCircleRadius = diameter / 2 * 0.15;
    const digitalClockSize = diameter * 0.1;
    const clockCenterToHourCircleDist = diameter / 2 * 0.8;
    const hourArrowHeight = diameter / 2 * 0.6;
    const minuteArrowHeight = diameter / 2 * 0.85;
    const secondArrowHeight = diameter / 2 * 0.9;
    const hourArrowWidth = diameter * 0.03;
    const minuteArrowWidth = diameter * 0.02;
    const secondArrowWidth = diameter * 0.01;
    const hourCircleNumberShiftY = diameter / 30;

    // цикл для расстановки кружков с цифрой часа
    let angle = 0;
    for (let i = 0; i < 12; i++) {
        angle += 30;
        const hour = i + 1;
        const angleInRad = angle / 180 * Math.PI;
        const centerX = center + clockCenterToHourCircleDist * Math.sin(angleInRad);
        const centerY = center - clockCenterToHourCircleDist * Math.cos(angleInRad);
        clock.insertAdjacentHTML("afterend", "<circle id='hour-circle' fill='green' />");
        const hourCircle = document.getElementById("hour-circle");
        hourCircle.setAttribute('cx', centerX);
        hourCircle.setAttribute('cy', centerY);
        hourCircle.setAttribute('r', hourCircleRadius);
        hourCircle.insertAdjacentHTML("afterend", "<text id='hour-circle-number' text-anchor='middle'></text>");
        const hourCircleNumber = document.getElementById("hour-circle-number");
        hourCircleNumber.setAttribute('x', centerX);
        hourCircleNumber.setAttribute('y', centerY + hourCircleNumberShiftY);
        hourCircleNumber.style.fontSize = hourCircleRadius * 1.5 + "px";
        hourCircleNumber.innerHTML = hour;
    }

    // создание цифровых часов
    clock.insertAdjacentHTML('afterend', "<text id='digital-clock-number' x='100', y='65' text-anchor='middle'></text>");
    const digitalClockNumber = document.getElementById("digital-clock-number");
    digitalClockNumber.setAttribute('x', diameter / 2);
    digitalClockNumber.setAttribute('y', diameter * 0.35);
    digitalClockNumber.style.fontSize = digitalClockSize + "px";
    digitalClockNumber.style.fontWeight = "bold";
    digitalClockNumber.innerHTML = "00:00:00";

    // создание стрелок
    clockContainer.insertAdjacentHTML("beforeend", "<rect id='second-arrow' style='fill:#333' rx='3' ry='3'/>");
    clockContainer.insertAdjacentHTML("beforeend", "<rect id='minute-arrow' style='fill:#333' rx='3' ry='3' />");
    clockContainer.insertAdjacentHTML("beforeend", "<rect id='hour-arrow' style='fill:#333' rx='3' ry='3' />");
    const secondArrow = document.getElementById("second-arrow");
    const secondArrowPosX = center - secondArrowWidth / 2;
    const secondArrowPosY = center - secondArrowHeight * 0.9;
    secondArrow.setAttribute('x', secondArrowPosX);
    secondArrow.setAttribute('y', secondArrowPosY);
    secondArrow.setAttribute('width', secondArrowWidth);
    secondArrow.setAttribute('height', secondArrowHeight);

    const minuteArrow = document.getElementById("minute-arrow");
    const minuteArrowPosX = center - minuteArrowWidth / 2;
    const minuteArrowPosY = center - minuteArrowHeight * 0.9;
    minuteArrow.setAttribute('x', minuteArrowPosX);
    minuteArrow.setAttribute('y', minuteArrowPosY);
    minuteArrow.setAttribute('width', minuteArrowWidth);
    minuteArrow.setAttribute('height', minuteArrowHeight);

    const hourArrow = document.getElementById("hour-arrow");
    const hourArrowPosX = center - hourArrowWidth / 2;
    const hourArrowPosY = center - hourArrowHeight * 0.9;
    hourArrow.setAttribute('x', hourArrowPosX);
    hourArrow.setAttribute('y', hourArrowPosY);
    hourArrow.setAttribute('width', hourArrowWidth);
    hourArrow.setAttribute('height', hourArrowHeight);


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

    // функция для перемещения стрелок
    function setArrows() {
        const time = new Date();
        digitalClockNumber.innerHTML = formatDate(time);
        const seconds = time.getSeconds();
        const secondArrowAngle = seconds * 6;
        const minutes = time.getMinutes();
        const minuteArrowAngle = minutes * 6;
        const hours = time.getHours();
        const hourArrowAngle = hours * 30 + minutes * 0.5;
        secondArrow.style.transformOrigin = "50% 50%";
        secondArrow.style.transform = `rotate(${secondArrowAngle}deg)`;
        minuteArrow.style.transformOrigin = "50% 50%";
        minuteArrow.style.transform = `rotate(${minuteArrowAngle}deg)`;
        hourArrow.style.transformOrigin = "50% 50%";
        hourArrow.style.transform = `rotate(${hourArrowAngle}deg)`;
    }

    setArrows(); // инициализация цифровых и стрелочных часов
    document.addEventListener('set', setArrows);
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
button.addEventListener('click', startTimeUpdate, { once: true });
