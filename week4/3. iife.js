const ATM = (function () {
  let amount = 0;
  let withDrawTimer;
  let depositTimer;

  function change(val) {
    amount += val;
  }

  return {
    print() {
      console.log("Your balance is: ", amount);
    },
    deposit(depositAmount) {
      const doStuff = () => {
        change(depositAmount);
        console.log(`You have deposited ${depositAmount}!`);
        this.print();
      };

      depositTimer = setTimeout(doStuff, 1000);
    },

    withdraw(withdrawAmount) {
      if (amount - withdrawAmount <= 0) {
        console.log("Insufficient funds.");
        return;
      }
      setTimeout(() => {
        change(-withdrawAmount);
        console.log(`You have withdrawn ${withdrawAmount}!`);
      }, 1000);
    },

    blockDepositOperation() {
      if (depositTimer) clearTimeout(depositTimer);
    },

    blockWithDrawOperation() {
      withDrawTimer ?? clearTimeout(withDrawTimer);
    },
  };
})();

ATM.deposit(200);
