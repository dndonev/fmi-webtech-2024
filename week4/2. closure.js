let sth = 5;

function adder(x) {
  sth = sth + x;

  return function anotherAdder(y) {
    sth = sth + x;
    return x + y;
  };
}

const add5 = adder(5);
console.log("first", add5(5));
console.log("second", add5(5));
console.log("sth", sth);
