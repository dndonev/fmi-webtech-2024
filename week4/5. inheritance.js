function Person (name) {
    this.name = name;
}

Person.prototype.introduce = function () {
    console.log('My official name is ' + this.name)
}

function Student(name, fn) {
    this.name = name;
    this.fn = fn;
}

Student.prototype = Object.create(Person.prototype); // (es5) == Student extends Person (es6)
Student.prototype.constructor = Student;

Student.prototype.introduce =  function () {
    console.log(
        'Hi, my name is ' + this.name + 'and my fn is ' + this.fn)
}

const s1 = new Student('Peter', 123213);
s1.introduce();

