"use strict"

var formDef1 =
    [
        { label: 'Название сайта:', kind: 'longtext', name: 'sitename' },
        { label: 'URL сайта:', kind: 'longtext', name: 'siteurl' },
        { label: 'Посетителей в сутки:', kind: 'number', name: 'visitors' },
        { label: 'E-mail для связи:', kind: 'shorttext', name: 'email' },
        {
            label: 'Рубрика каталога:', kind: 'combo', name: 'division',
            variants: [{ text: 'здоровье', value: 1 }, { text: 'домашний уют', value: 2 }, { text: 'бытовая техника', value: 3 }]
        },
        {
            label: 'Размещение:', kind: 'radio', name: 'payment',
            variants: [{ text: 'бесплатное', value: 1 }, { text: 'платное', value: 2 }, { text: 'VIP', value: 3 }]
        },
        { label: 'Разрешить отзывы:', kind: 'check', name: 'votes' },
        { label: 'Описание сайта:', kind: 'memo', name: 'description' },
        { caption: 'Опубликовать', kind: 'submit' },
    ];

var formDef2 =
    [
        { label: 'Фамилия:', kind: 'longtext', name: 'lastname' },
        { label: 'Имя:', kind: 'longtext', name: 'firstname' },
        { label: 'Отчество:', kind: 'longtext', name: 'secondname' },
        { label: 'Возраст:', kind: 'number', name: 'age' },
        { caption: 'Зарегистрироваться', kind: 'submit' },
    ];

function createForm(form) {

    for (let i = 0; i < form.length; i++) {

        if (form[i].label) {
            let pelem = document.createElement("p");
            pelem.style.width = "150px";
            pelem.style.display = "inline-block";
            pelem.style.margin = "0";
            let pelemtext = document.createTextNode(form[i].label);
            pelem.appendChild(pelemtext);
            document.body.appendChild(pelem);

            if (form[i].kind == "longtext") {
                let input = document.createElement("input");
                input.setAttribute('size', '60');
                input.setAttribute('type', 'text');
                document.body.appendChild(input);
                let br = document.createElement("br");
                document.body.appendChild(br);

            } else if (form[i].kind == "number") {
                let input3 = document.createElement("input");
                input3.setAttribute('type', 'number');
                document.body.appendChild(input3);
                let br3 = document.createElement("br");
                document.body.appendChild(br3);

            } else if (form[i].kind == "shorttext") {
                let input4 = document.createElement("input");
                input4.setAttribute('type', 'email');
                document.body.appendChild(input4);
                let br4 = document.createElement("br");
                document.body.appendChild(br4);

            } else if (form[i].kind == "combo") {
                let input5 = document.createElement("select");
                let variant1 = document.createElement("option");
                let variant2 = document.createElement("option");
                let variant3 = document.createElement("option");
                document.body.appendChild(input5);
                variant1.appendChild(document.createTextNode("здоровье"));
                variant2.appendChild(document.createTextNode("домашний уют"));
                variant3.appendChild(document.createTextNode("бытовая техника"));
                input5.appendChild(variant1);
                input5.appendChild(variant2);
                input5.appendChild(variant3);
                let br5 = document.createElement("br");
                document.body.appendChild(br5);

            } else if (form[i].kind == "radio") {
                let pelem2 = document.createElement("p");
                pelem2.style.display = "inline-block";
                pelem2.style.margin = "0";
                let pelem2text = document.createTextNode("бесплатное");
                pelem2.appendChild(pelem2text);
                document.body.appendChild(pelem2);

                let pelem3 = document.createElement("p");
                pelem3.style.display = "inline-block";
                pelem3.style.margin = "0";
                let pelem3text = document.createTextNode("платное");
                pelem3.appendChild(pelem3text);
                document.body.appendChild(pelem3);

                let pelem4 = document.createElement("p");
                pelem4.style.display = "inline-block";
                pelem4.style.margin = "0";
                let pelem4text = document.createTextNode("VIP");
                pelem4.appendChild(pelem4text);
                document.body.appendChild(pelem4);

                let input5 = document.createElement("input");
                let input6 = document.createElement("input");
                let input7 = document.createElement("input");
                input5.setAttribute('type', 'radio');
                input5.setAttribute('name', 'accomodation');
                input6.setAttribute('type', 'radio');
                input6.setAttribute('name', 'accomodation');
                input7.setAttribute('type', 'radio');
                input7.setAttribute('name', 'accomodation');

                pelem2.insertBefore(input5, pelem2text);
                pelem3.insertBefore(input6, pelem3text);
                pelem4.insertBefore(input7, pelem4text);

                document.body.appendChild(pelem2);
                document.body.appendChild(pelem3);
                document.body.appendChild(pelem4);

                let br4 = document.createElement("br");
                document.body.appendChild(br4);

            } else if (form[i].kind == "check") {
                let input8 = document.createElement("input");
                input8.setAttribute('type', 'checkbox');
                document.body.appendChild(input8);
                let br6 = document.createElement("br");
                document.body.appendChild(br6);

            } else if (form[i].kind == "memo") {
                let teaxtarea = document.createElement("textarea");
                teaxtarea.style.display = "block";
                teaxtarea.setAttribute('cols', '84');
                teaxtarea.setAttribute('rows', '7');
                document.body.appendChild(teaxtarea);
            }
        } else if (form[i].caption) {
            let button = document.createElement("button");
            button.style.width = "150px";
            button.style.display = "block";
            button.style.marginTop = "5px";
            let buttontext = document.createTextNode(form[i].caption);
            button.appendChild(buttontext);
            document.body.appendChild(button);
        }
    }
}

createForm(formDef1);

let pelem3 = document.createElement("p");
document.body.appendChild(pelem3);


createForm(formDef2);
