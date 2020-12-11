const data: string[] = Deno.readTextFileSync(Deno.args[0]).split("\n");

let prev: string[] = data.slice();
const ref: string[] = data.slice();
while (true) {
  for (let x: number = 0; x < prev.length; x++) {
    const line: string = prev[x];
    if (!line) continue;
    for (let y: number = 0; y < line.length; y++) {
      const char: string = line[y];
      if (char === ".") continue;
      let occupied: number = 0;
      let deltas: number[][] = [
        [-1, 1],
        [0, 1],
        [1, 1],
        [-1, 0],
        [1, 0],
        [-1, -1],
        [0, -1],
        [1, -1],
      ];
      for (const delta of deltas) {
        let length: number = 1;
        let [Xpos, Ypos] = delta;
        let currX, currY = 0;
        while (true) {
          currX = x + Xpos * length;
          currY = y + Ypos * length;
          if (
            currX >= 0 && currX < prev.length && currY >= 0 &&
            currY < line.length
          ) {
            if (prev[currX][currY] === "#") {
              occupied++
              break;
            } else if (prev[currX][currY] === "L") break;
            else length++;
          } else break;
        }
      }
      switch (char) {
        case "L":
          if (occupied === 0) {
            ref[x] = ref[x].substr(0, y) + "#" +
              ref[x].substr(y + 1, ref[x].length);
          }
          break;
        case "#":
          if (occupied >= 5) {
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
