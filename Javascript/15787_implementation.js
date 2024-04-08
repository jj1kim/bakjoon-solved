//입력을 파일에서 받아오기
const fs = require("fs");
const input = fs.readFileSync("example.txt").toString().trim().split("\n");

//메인 로직
const trainNumber = input[0].split(" ").map((val) => +val)[0];
const orderNumber = input[0].split(" ").map((val) => +val)[1];

const answerArray = new Set();

let trains = [];
for (let i = 0; i < parseInt(trainNumber); i++) {
  trains.push(0);
}

for (let i = 0; i < parseInt(orderNumber); i++) {
  const order = input[i + 1].split(" ").map((val) => +val);
  const train = order[1] - 1;

  if (order[0] === 1 || order[0] === 2) {
    const place = order[2];
    trains[train] =
      order[0] === 1
        ? trains[train] | (1 << (place - 1))
        : trains[train] & ~(1 << (place - 1));
  } else if (order[0] === 3 || order[0] === 4) {
    trains[train] =
      order[0] === 3
        ? (trains[train] << 1) & ((1 << 20) - 1)
        : trains[train] >> 1;
  }
}

for (let i = 0; i < parseInt(trainNumber); i++) {
  answerArray.add(trains[i]);
}
console.log(answerArray.size);
