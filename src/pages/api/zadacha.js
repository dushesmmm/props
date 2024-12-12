const first = [1, 2, 3];
const second = [3, 2, 0];

sum = parseInt(first.join("")) + parseInt(second.join(""));

console.log(Array.from(sum.toString().split(""), Number));
