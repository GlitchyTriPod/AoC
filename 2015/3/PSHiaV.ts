const path: string = Deno.readTextFileSync(Deno.args[0]);

let Xpos: number = 0;
let Ypos: number = 0;
let rXpos: number = 0;
let rYpos: number = 0;
let housePos: string[] = ["0:0"];
for (let i: number = 0; i < path.length; i++) {
  const isRobot: boolean = (i % 2) === 0;
  const dir: string = path[i];
  switch (dir) {
    case "^":
      isRobot ? rYpos++ : Ypos++;
      break;
    case "v":
      isRobot ? rYpos-- : Ypos--;
      break;
    case "<":
      isRobot ? rXpos-- : Xpos--;
      break;
    case ">":
      isRobot ? rXpos++ : Xpos++;
  }
  housePos.push(isRobot ? `${rXpos}:${rYpos}` : `${Xpos}:${Ypos}`);
}
housePos = housePos.filter((val: string, index: number, src: string[]): boolean => {
  return src.indexOf(val) === index;
});
console.log("# of houses delivered to:", housePos.length);