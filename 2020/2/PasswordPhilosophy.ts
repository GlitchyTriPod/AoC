const data: string[] = Deno.readTextFileSync(Deno.args[0]).split("\n");

let validPWsP1: number = 0;
let validPWsP2: number = 0;
for (let item of data) {
  if (!item) continue;
  const [policy, PW] = item.split(": ");
  const letter: string = policy.slice(-1);
  const minmax: number[] | undefined = policy.match(/[0-9]*/gm)
    ?.filter((x: string): boolean => x !== "")
    .map((x: string): number => +x);
  const occurence: number | undefined = PW.match(
    new RegExp(`${letter}{1}`, "gm"),
  )?.length;
  if (minmax) {
    if (occurence && minmax[0] <= occurence && occurence <= minmax[1]) {
      ++validPWsP1;
    }
    if (
      !(PW[minmax[0]-1] === PW[minmax[1]-1]) &&
      (PW[minmax[0]-1] === letter || PW[minmax[1]-1] === letter)
    ) {
      ++validPWsP2;
    }
  }
}
console.log(`Valid P1 Passwords: ${validPWsP1}`);
console.log(`Valid P2 Passwords: ${validPWsP2}`);
