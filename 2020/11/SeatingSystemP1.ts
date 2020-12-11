const data: string[] = Deno.readTextFileSync(Deno.args[0]).split("\n");

let prev: string[] = data.slice();
const ref: string[] = data.slice();
while (true) {
  for (let x: number = 0; x < prev.length; x++) {
    const line: string = prev[x];
    if (!line) continue;
    for (let y: number = 0; y < line.length; y++) {
      const char: string = line[y];
      const adjacent: string = "".concat(...[
        x === 0 || y === 0 ? "" : prev[x - 1][y - 1],
        x === 0 ? "" : prev[x - 1][y],
        x === 0 || y === line.length - 1 ? "" : prev[x - 1][y + 1],
        y === 0 ? "" : line[y - 1],
        y === line.length - 1 ? "" : line[y + 1],
        x === prev.length - 1 || y === 0 ? "" : prev[x + 1][y - 1],
        x === prev.length - 1 ? "" : prev[x + 1][y],
        x === prev.length - 1 || y === line.length - 1
          ? ""
          : prev[x + 1][y + 1],
      ].filter((a: string): boolean => Boolean(a)));
      const occupied: number = adjacent.replace(/[^#]/gi, "").length;
      switch (char) {
        case "L":
          if (occupied === 0) {
            ref[x] = ref[x].substr(0, y) + "#" +
              ref[x].substr(y + 1, ref[x].length);
          }
          break;
        case "#":
          if (occupied >= 4) {
            ref[x] = ref[x].substr(0, y) + "L" +
              ref[x].substr(y + 1, ref[x].length);
          }
          break;
      }
    }
  }
  let areEqual: boolean = true;
  for (let i: number = 0; i < ref.length; i++) {
    if (ref[i] !== prev[i]) {
      areEqual = false;
      break;
    }
  }
  if (areEqual) break;
  prev = ref.slice();
}
const occupied: number = "".concat(...ref).replace(/[^#]/gi, "").length;
console.log("Occupied seats:", occupied);
