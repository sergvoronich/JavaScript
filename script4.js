// вариант с функцией и map


function HashStorageFunction() {
    var myMap = new Map();

    this.addValue = function (key, value) {
        this.key = key;
        this.value = value;
        myMap.set(key, value);
    }

    this.getValue = function (key) {
        this.key = key;
        if (key == "undefined") {
            return false;
        } else {
            return myMap.get(key);
        }
    }

    this.deleteValue = function (key) {
        this.key = key;
        if (myMap.get(key)) {
            myMap.delete(key);
            return true;
        } else {
            return false;
        }
    }

    this.getKeys = function () {
        var ar = [];
        for (item of myMap.keys()) {
            ar.push(item);
        }
        return ar;
    }

}

// вариант с классом

// не получилось...

// а потом получилось!

class HashStorageFunction2 {
    storage = new Object;

    addValue = function (key, value) {
        this.key = key;
        this.value = value;
        this.storage[key] = value;
    }

    getValue = function (key) {
        this.key = key;
        if (key == "undefined") {
            return false;
        } else {
            return this.storage[key];
        }
    }

    deleteValue = function (key) {
        this.key = key;
        if (this.storage[key]) {
            delete this.storage[key];
            return true;
        } else {
            return false;
        }
    }

    getKeys = function () {
        var ar = [];
        for (let item in this.storage) {
            ar.push(item);
        }
        return ar;
    }

}
