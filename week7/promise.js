const promise = new Promise((resolve, reject) => {
  // user/:id
  resolve('Data received from server1');
});

promise
  .then((value) => {
    // user/:id/details
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Data received from server2');
      }, 1000);
    });
  })
  .then((message) => console.log(message))
  .catch((error) => console.log('REJECTED'));
