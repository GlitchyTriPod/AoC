const data: string[] = Deno.readTextFileSync(Deno.args[0]).split("\n");

let P1ans: number = 0;
let P2ans: number = 0;
const lookInBag = (bag: string, countBag: boolean = false): number => {
  const bagDef: string | undefined = data.find((x: string): boolean =>
    x.startsWith(bag)
  );
  if (!bagDef || bagDef.includes("no other")) return 0;
  let goldbags: number = 0;
  const bags: string[] = bagDef.split("bag");
  for (const bag of bags) {
    const digitmatch: RegExpMatchArray | null = bag.match(/\d+/);
    if (!digitmatch) continue;
    const digit: number = parseInt(digitmatch[0]);
    const color: RegExpMatchArray | null = bag.match(/\w+ \w+ $/);
    if (!color) continue;
    if (!countBag) {
      if (color[0].includes("shiny gold")) {
        goldbags += digit;
      } else goldbags += digit * lookInBag(color[0]);
    } else {
      goldbags += digit + (digit * lookInBag(color[0], true));
    }
  }
  return goldbags;
};
for (const bag of data) {
  if (bag) {
    const color: RegExpMatchArray | null = bag.match(/^\w+ \w+/);
    let num: number = 0;
    if (color) num = lookInBag(color[0]);
    if (num !== 0) P1ans++;
  }
}
P2ans = lookInBag("shiny gold", true);
console.log("# of colors that contain gold:", P1ans);
console.log("# of bags inside shiny gold:", P2ans);
