

const jsPerson = {
    firstName: 'Dobrin',
}
// anonymous type
const person: { firstName: string } = {
    firstName: 'Dobrin'
}

interface IPerson {
    firstName: string;
}

const p1: IPerson = {
    firstName: 'DDD'
}

class Person {
    constructor(public firstName: string) { }
}

type TPerson = 5;

enum EUser {
    Admin,
    ProUser,
}
