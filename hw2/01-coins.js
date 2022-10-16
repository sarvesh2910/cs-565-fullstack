/* Exercise 01 - Coins */

// eslint-disable-next-line consistent-return
const calculateChange = (input) => {
  if (input <= 0) return "input should be positive";
  if (input > 10) return "Error: the number is too large";

  // eslint-disable-next-line prefer-const
  let [dollars, remaining] = input
    .toString()
    .split(".")
    .map((i) => parseInt(i, 10));

  let answer = "";

  const quarters = Math.floor(remaining / 25);
  remaining -= quarters * 25;

  const dime = Math.floor(remaining / 10);
  remaining -= dime * 10;

  const nickel = Math.floor(remaining / 5);
  remaining -= nickel * 5;

  const pennies = Math.floor(remaining);

  if (dollars) {
    answer = `${answer} ${dollars} dollar${dollars > 2 ? "s" : ""},`;
  }
  if (quarters) {
    answer = `${answer} ${quarters} quarter${quarters >= 2 ? "s" : ""},`;
  }
  if (dime) {
    answer = `${answer} ${dime} dime${dime >= 2 ? "s" : ""},`;
  }
  if (nickel) {
    answer = `${answer} ${nickel} nickel${nickel >= 2 ? "s" : ""},`;
  }
  if (pennies) {
    answer = `${answer} ${pennies} penn${pennies >= 2 ? "ies" : "y"}`;
  }

  console.log(answer);
};

// Sample Test Cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(9.74));
// $9.74 ==> 9 dollars, 2 quarters, 2 dimes, 4 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(15.11));
// $15.11 ==> Error: the number is too large
