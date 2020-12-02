const input: string = Deno.readTextFileSync(Deno.args[0]);

let floor: number = 0;
let enteredBasement: boolean = false;
for (let i = 0; i < input.length; i += 1) {
  if (input[i] === '(') {
    floor = floor + 1;
  } else {
    floor = floor - 1;
  }
  if (!enteredBasement && floor === -1) {
    enteredBasement = true;
    console.log('Santa entered basement on position ' + (i + 1));
  }
}
console.log('Santa is on floor ' + floor);