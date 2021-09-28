// Первое задание (TREESUM)

function NumbersSumCount(ar) {
    var sum = 0;
    if (Array.isArray(ar)) {
        for (item of ar) {
            if (Number.isFinite(item)) {
                sum += item;
            } else if (Array.isArray(item)) {
                sum += NumbersSumCount(item);
            }
        }
    }
    return sum;
}

var test = [5, 7,
    [4, [2], 8, [1, 3], 2],
    [9, []],
    1, 8
];

console.log(NumbersSumCount(test));

// Второе задание (VOWELS)

var string = prompt("Введите любую строку:");

function vowelsCount(str) {
    var vowelsum = 0;
    var rusvowels = ['а', 'о', 'е', 'и', 'э', 'у', 'ы', 'ю', 'я', 'ё',];
    try {
        for (testch of str) {
            for (refch of rusvowels) {
                if (testch === refch) {
                    vowelsum++;
                    break;
                }
            }
        }
    } catch (error) {
        alert("Возникла ошибка!");
        console.log(error);
    }
    return vowelsum;
}

console.log(vowelsCount(string));
