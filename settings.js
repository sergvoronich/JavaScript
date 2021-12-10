// функция для инициализации и установки слушателей на радиокнопки
function setRadioButtons() {
    var hash = location.hash.substr(1);
    if (hash == "settings") {
        setTimeout(() => {
            const musicRadioButton = document.querySelector(".music input");
            const soundsRadioButton = document.querySelector(".sounds input");
            const musicRadioButton2 = document.querySelector(".music input:last-child");
            const soundsRadioButton2 = document.querySelector(".sounds input:last-child");
            if (sessionStorage.getItem("musicIsOn") == "false") {
                musicRadioButton2.setAttribute("checked", "");
            } else {
                musicRadioButton.setAttribute("checked", "");
            }
            if (sessionStorage.getItem("soundsIsOn") == "false") {
                soundsRadioButton2.setAttribute("checked", "");
            } else {
                soundsRadioButton.setAttribute("checked", "");
            }
            const musicBlock = document.querySelector(".music");
            const soundsBlock = document.querySelector(".sounds");
            musicBlock.addEventListener('click', changeMusicRadio);
            soundsBlock.addEventListener('click', changeSoundsRadio);

        }, 500);
    }
}

// функция включения/выключения музыки
function changeMusicRadio() {
    const musicRadioButton = document.querySelector(".music input");
    const musicRadioButton2 = document.querySelector(".music input:last-child");
    if (musicRadioButton.checked) {
        musicIsOn = true;
        music1.volume = 0.3;
        sessionStorage.setItem("musicIsOn", "true");
    } else if (musicRadioButton2.checked) {
        musicIsOn = false;
        music1.volume = 0;
        sessionStorage.setItem("musicIsOn", "false");
    }
}

// функция включения/выключения звуков
function changeSoundsRadio() {
    const soundsRadioButton = document.querySelector(".sounds input");
    const soundsRadioButton2 = document.querySelector(".sounds input:last-child");
    if (soundsRadioButton.checked) {
        soundsIsOn = true;
        boom1.volume = 1;
        boom2.volume = 1;
        boom3.volume = 1;
        sessionStorage.setItem("soundsIsOn", "true");
    } else if (soundsRadioButton2.checked) {
        soundsIsOn = false;
        boom1.volume = 0;
        boom2.volume = 0;
        boom3.volume = 0;
        sessionStorage.setItem("soundsIsOn", "false");
    }
}




window.addEventListener('hashchange', setRadioButtons);