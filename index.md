
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div class="wrapper">
        <h1>Task 4</h1>
        <div class="buttons-container">
            <div class="buttons">
                <!-- Вариант с функцией и map -->
                <p>Вариант с функцией и map</p>
                <p><input type="button" value="Ввод информации о напитке"
                        onclick="drinkStorage.addValue(a = drinkNameEntry(), b = drinkInfoEntry());"></p>
                <p><input type="button" value="Получение информации о напитке"
                        onclick="getDrinkInfo(prompt('Введите название напитка:'))"></p>
                <p><input type="button" value="Удаление информации о напитке" onclick="if(drinkStorage.deleteValue(prompt('Введите название напитка, который хотите удалить:')))
            { alert('Напиток удален!')} else {alert('Напитка с таким названием не существует!')}"></p>
                <p><input type="button" value="Перечень всех напитков" onclick="alert(drinkStorage.getKeys())">
                </p>
            </div>
            <div class="buttons">
                <!-- Вариант с классом и объектом -->
                <p>Вариант с классом и объектом</p>
                <p><input type="button" value="Ввод информации о напитке"
                        onclick="drinkStorage2.addValue(a = drinkNameEntry(), b = drinkInfoEntry());"></p>
                <p><input type="button" value="Получение информации о напитке"
                        onclick="getDrinkInfo2(prompt('Введите название напитка:'))"></p>
                <p><input type="button" value="Удаление информации о напитке" onclick="delDrinkInfo()"></p>
                <p><input type="button" value="Перечень всех напитков" onclick="alert(drinkStorage2.getKeys())">
                </p>
            </div>
        </div>
        <script src="script4.js"></script>
        <script>

            /* Общий код для обоих вариантов */

            var drinkNameEntry = function () {
                return prompt("Введите название напитка:");
            }

            var drinkInfoEntry = function () {
                var alc = confirm("Это алкогольный напиток?");
                var rec = prompt("Введите рецепт:");
                return [alc, rec];
            }
            /* Вариант с функцией и map */

            var drinkStorage = new HashStorageFunction();

            var getDrinkInfo = function (drink) {
                this.drink = drink;
                var info = drinkStorage.getValue(drink);
                if (!info) {
                    alert("Напитка с таким названием не существует!");
                } else {
                    if (info[0]) {
                        var alc = "да";
                    } else {
                        var alc = "нет";
                    }
                    alert(`Напиток ${drink}\nалкогольный: ${alc}\nрецепт приготовления:\n${info[1]}`);
                }
            }

            /* Вариант с классом и объектом */

            var drinkStorage2 = new HashStorageFunction2(storage);

            var getDrinkInfo2 = function (drink) {
                this.drink = drink;
                var info = drinkStorage2.getValue(drink);
                if (!info) {
                    alert("Напитка с таким названием не существует!");
                } else {
                    if (info[0]) {
                        var alc = "да";
                    } else {
                        var alc = "нет";
                    }
                    alert(`Напиток ${drink}\nалкогольный: ${alc}\nрецепт приготовления:\n${info[1]}`);
                }
            }

            let delDrinkInfo = function () {
                if (drinkStorage2.deleteValue(prompt('Введите название напитка, который хотите удалить:'))) {
                    alert('Напиток удален!')
                } else {
                    alert('Напитка с таким названием не существует!')
                }
            }








        </script>
    </div>
</body>

</html>
