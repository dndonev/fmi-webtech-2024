class Person {
    constructor(name) {
        this.name = name;
    }

    introduce() {
        console.log('My official name is ' + this.name)
    }
}

class Student extends Person {
    constructor(name, fn) {
        super(name);
        this.fn = fn;
    }
    greet () {
        console.log(
            'Hi, my name is ' + this.name + 'and my fn is ' + this.fn);
    }
}

const s1 = new Student('Dobrin', 123213);
const s2 = new Student('Peter', 123213);

s1.introduce();