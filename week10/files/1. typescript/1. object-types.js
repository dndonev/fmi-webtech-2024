"use strict";
const jsPerson = {
    firstName: 'Dobrin',
};
// anonymous type
const person = {
    firstName: 'Dobrin'
};
const p1 = {
    firstName: 'DDD'
};
class Person {
    constructor(firstName) {
        this.firstName = firstName;
    }
}
var EUser;
(function (EUser) {
    EUser[EUser["Admin"] = 0] = "Admin";
    EUser[EUser["ProUser"] = 1] = "ProUser";
})(EUser || (EUser = {}));
