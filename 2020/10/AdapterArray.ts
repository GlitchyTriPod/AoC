const data: number[] = Deno.readTextFileSync(Deno.args[0]).split("\n")
  .map((x: string): number => +x).sort((a: number, b: number): number => a - b);

let diff1j: number = 0;
let diff3j: number = 1;
for (let i: number = 0; i < data.length - 1; i++) {
  switch (data[i + 1] - data[i]) {
    case 1:
      diff1j++;
      break;
    case 3:
      diff3j++;
  }
}
const memo: number[][] = [];
for (let i: number = 0; i < data.length -1; i++) {
  for (
    let counter: number = 1;
    data[i + counter] !== undefined &&
    data[i + counter] - data[i] <= 3;
    counter++
  ) {
    if (memo[i]) {
      memo[i].push(i + counter);
    } else {
      memo[i] = [i + counter];
    }
  }
}
const record: number[] = [];
const calculateValidCombos = (readFrom: number = 0): number => {
  const maxBranch: number = memo.length - 1;
  if (readFrom >= maxBranch) {
    return 1;
  } else {
    if (record[readFrom] === undefined) {
      record[readFrom] = memo[readFrom].map((val: number): number => calculateValidCombos(val))
      .reduce((a, b) => a + b);
    }
    return record[readFrom];
  }
}
console.log("Part 1 answer:", diff1j * diff3j);
console.log("Part 2 answer:", calculateValidCombos());
