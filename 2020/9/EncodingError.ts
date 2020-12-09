const data: number[] = Deno.readTextFileSync(Deno.args[0]).split("\n").map((
  x: string,
): number => +x);

let invalid: number = 0;
for (let i = 25; i < data.length; i++) {
  const val: number = data[i];
  const pre25: number[] = data.slice(i - 25, i);
  let isValid: boolean = false;
  for (const first of pre25) {
    const second: number = val - first;
    if (pre25.includes(second)) {
      isValid = true;
      break;
    }
  }
  if (!isValid) {
    invalid = val;
    break;
  }
}
let encWK: number = 0;
let subArrSum: number = data[0];
let start: number = 0;
for (let i = 1; i < data.length; i++) {
  while (subArrSum > invalid && start < i - 1) {
    subArrSum = subArrSum - data[start];
    start++;
  }
  if (subArrSum === invalid) {
    const range: number[] = data.slice(start, i);
    encWK = Math.max(...range) + Math.min(...range);
    break;
  }
  if (i < data.length) subArrSum = subArrSum + data[i];
}
console.log("First number to be invalid:", invalid);
console.log("Encryption weakness:", encWK);
