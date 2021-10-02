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

let storage = {};  // не мог поместить никак объект-хранилище внутри класса, пришлось вот так поступить.

class HashStorageFunction2 {

    constructor(storage) {
        this.storage = storage;
    }

    addValue = function (key, value) {
        this.key = key;
        this.value = value;
        storage[key] = value;
    }

    getValue = function (key) {
        this.key = key;
        if (key == "undefined") {
            return false;
        } else {
            return storage[key];
        }
    }

    deleteValue = function (key) {
        this.key = key;
        if (storage[key]) {
            delete storage[key];
            return true;
        } else {
            return false;
        }
    }

    getKeys = function () {
        var ar = [];
        for (let item in storage) {
            ar.push(item);
        }
        return ar;
    }

}


