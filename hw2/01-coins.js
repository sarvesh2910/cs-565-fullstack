/* Exercise 01 - Coins */

const calculateChange = (input) => {
  let answer = `$${input} ==>`;

  const coinValues = [100, 25, 10, 5, 1];
  const coinNames = ["dollar", "quarter", "dime", "nickel", "penn"];

  if (input <= 0) return `${answer} input should be positive`;
  if (input > 10) return `${answer} Error: the number is too large`;

  let input100 = input * 100;

  const coinChange = coinValues.map((coinValue) => {
    const quotient = Math.floor(input100 / coinValue);
    input100 -= quotient * coinValue;
    return quotient;
  });

  const tempArray = [];
  coinChange.forEach((item, index) => {
    if (item) {
      if (index === 4) {
        // penny
        tempArray.push(
          `${item} ${
            item >= 2 ? `${coinNames[index]}ies` : `${coinNames[index]}y`
          }`
        );
      } else {
        // other coins
        tempArray.push(
          `${item} ${item > 1 ? `${coinNames[index]}s` : coinNames[index]}`
        );
      }
    }
  });

  answer = `${answer} ${tempArray.join(", ")}`;
  return answer;
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
