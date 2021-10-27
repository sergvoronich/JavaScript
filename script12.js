const svg = document.querySelector("svg");
const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");

button1.addEventListener('click', addCircle, { once: true });
button2.addEventListener('click', addTriangle, { once: true });
button3.addEventListener('click', addRect, { once: true });

function addCircle() {
    const oldcircle = document.querySelector("circle");
    const newcircle = oldcircle.cloneNode(true);
    newcircle.setAttribute('fill', 'pink');
    newcircle.setAttribute('cy', '220');
    svg.appendChild(newcircle);
}

function addTriangle() {
    const oldtriangle = document.querySelector("polygon");
    const newtriangle = oldtriangle.cloneNode(true);
    newtriangle.setAttribute('stroke', 'violet');
    newtriangle.setAttribute('points', '180,170 240,260 300,170');
    svg.appendChild(newtriangle);
}

function addRect() {
    const oldrect = document.querySelector("rect");
    const newrect = oldrect.cloneNode(true);
    newrect.setAttribute('width', '120');
    newrect.setAttribute('height', '120');
    newrect.setAttribute('x', '360');
    newrect.setAttribute('y', '150');
    svg.appendChild(newrect);
}