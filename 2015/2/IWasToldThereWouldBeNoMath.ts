const data: string[] = Deno.readTextFileSync(Deno.args[0]).split("\n");

let totalPaper: number[] = [];
let totalRibbon: number[] = [];
for (let str of data) {
  if (!str) {
    continue;
  }
  const base: number[] = str.split("x").map((x: string): number => +x)
    .sort((a: number, b: number): number => a - b);
  const ribbon: number = (2 * base[0]) + (2 * base[1]);
  const paper: number[] = [
    base[0] * base[1],
    base[1] * base[2],
    base[0] * base[2],
  ];
  const paperSlack: number = Math.min(...paper);
  const ribbonSlack: number = base[0] * base[1] * base[2];
  let paperSqFt: number = 0;
  for (let num of paper) {
    paperSqFt += 2 * num;
  }
  totalPaper.push(paperSqFt + paperSlack);
  totalRibbon.push(ribbon + ribbonSlack);
}
console.log(
  `Total sq. ft. wrapping paper: ${
    totalPaper.reduce((a: number, b: number): number => a + b)
  }`,
);
console.log(
  `Total ribbon length: ${
    totalRibbon.reduce((a: number, b: number): number => a + b)
  }`,
);
