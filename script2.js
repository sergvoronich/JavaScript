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