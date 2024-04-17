const { name: anotherName, age} = {
    name: 'John',
    age: 30,
    children: ['Mary', 'Peter'],
};

console.log(anotherName);
// Destructuring
const anotherPerson = null;

Object.assign(anotherPerson, person);
// same as
const myArray = [1,2,3];
const myOtherArray = [...myArray];

const [firstElement, secondElement, thirdElement] = myArray;

anotherPerson = { ...person };