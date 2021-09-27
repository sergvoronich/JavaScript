// Первое задание (TREESUM)

var sum = 0;

function NumbersSumCount(ar) {
    if (Array.isArray(ar)) {
        for (var item of ar) {
            if (Number.isFinite(item)) {
                sum += item;
            } else if (Array.isArray(item)) {
                NumbersSumCount(item);
            }
        }
    }
}

var test = [5, 7,
    [4, [2], 8, [1, 3], 2],
    [9, []],
    1, 8
];

NumbersSumCount(test);

console.log(sum);

// Второе задание (VOWELS)

var string = prompt("Введите любую строку:");

var VC = function vowelsCount(str) {
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

console.log(VC(string));


