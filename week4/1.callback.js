const number = 5;

const callback = () => {
  console.log("callbacked");
};

const onButtonClick = (cb) => {
  if (typeof cb === "function") {
    cb();
  } else {
    console.log(cb);
  }
};

const message = "Thank you!";
const timer = setTimeout(() => {
  callback();
  console.log("Timout started");
}, 2000);

setTimeout(() => {
  clearTimeout(timer);
  console.log(`timeout ${timer} cleared! ${message}`);
}, 0);

const interval = setInterval(() => {
  console.log("hi!");
}, 1000);

setTimeout(() => {
  clearTimeout(interval);
  console.log(`interval ${timer} cleared! ${message}`);
}, 4000);
