const data: string[] = Deno.readTextFileSync(Deno.args[0]).split("\n\n");

let P1: number = 0;
let P2: number = 0;
for (const group of data) {
  const userAns: string[] = group.split("\n").filter((val: string): boolean =>
    val !== ""
  );
  const uniqueQs: string = "".concat(
    ...userAns.map((ans: string): string[] => ans.split("")).flat().filter(
      (val: string, index: number, src: string[]): boolean => {
        return src.indexOf(val) === index;
      },
    ),
  );
  P1 += uniqueQs.length;
  P2 += uniqueQs.split("").filter(
    ((Q: string): boolean => {
      for (let i = 0; i < userAns.length; i++) {
        if (!userAns[i].includes(Q)) return false;
      }
      return true;
    }),
  ).length;
}
console.log("Part 1:", P1);
console.log("Part 2:", P2);