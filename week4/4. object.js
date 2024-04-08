
const myobj = {
    name: 'Dobrin',
    fn: 123213,
    introduce(age) {
        console.log(`Hello my name is ${this.name}`, age);
    }
};

myobj[myProperty];
myobj.introduce(26);

Object.defineProperties(myobj, { // Object.someting?????
    age: {
        value: 26,
        writable: false,
        enumerable: true,
        configurable: true
    }
 })

// otherObj.introduce();
// // const myBoundIntro = myobj.introduce.bind({ name: 'Bound Dobrin' })

// // myobj.introduce.call({name: 'Not Dobrin'}, 0, 123);
// // myobj.introduce.apply({name: 'Not Dobrin'}, [0, 123]);

// // myBoundIntro();