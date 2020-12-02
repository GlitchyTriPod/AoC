const data: string = await Deno.readTextFile(Deno.args[0]);
const inputArr: number[] = data.split('\n').map(
  function(x: string): number {
    return +x;
  },
);

for (let num of inputArr) { // part 1
  let numlookup: number = 2020 - num;
  if (inputArr.includes(numlookup)) {
    console.log('Part 1 answer: ' + (num * numlookup));
    break;
  }
}

const part2 = function(): void { // part 2
  for (let num of inputArr) { 
    let rem: number = 2020 - num;
    for (let num2 of inputArr) {
      if (num2 === num) {
        continue;
      }
      let num3: number = rem - num2;
      if (inputArr.includes(num3)) {
        console.log('Part 2 answer: ' + (num * num2 * num3));
        return;
      }
    }
  }
};
part2();