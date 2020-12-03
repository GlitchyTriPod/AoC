const data: string[] = Deno.readTextFileSync(Deno.args[0]).split("\n");

const slopes: number[][] = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];
let encArr: number[] = [];
const getTreeEncounterForSlope = (right: number, down: number): number => {
  let patCheck: number = 0;
  let treesHit: number = 0;
  for (let i = 0; i < data.length - 1; i += down) {
    // console.log(i);
    const pat: string = data[i];
    if (pat[patCheck] === "#") treesHit++;
    patCheck += right;
    if (patCheck > pat.length - 1) patCheck -= pat.length;
  }
  console.log(
    `Slope: ${right} right, ${down} down; Trees Encountered: ${treesHit}`,
  );
  return treesHit;
};
for (const slope of slopes) {
  encArr.push(getTreeEncounterForSlope(slope[0], slope[1]));
}
console.log(
  "Tree Encounters Multiplied:",
  encArr.reduce((a: number, b: number): number => a * b),
);
