const data: string[] = Deno.readTextFileSync(Deno.args[0]).split("\n");

let returnAcc: number = NaN;
let firstLoop: boolean = false;
const accAtFirstLoop = (
  instr: string,
  index: number = 0,
  acc: number = 0,
  indeces: number[] = [],
): number => {
  if (indeces.indexOf(index) !== -1) {
    if (!firstLoop) returnAcc = acc;
    return NaN;
  }
  indeces.push(index);
  const action: RegExpMatchArray | null = instr.match(/^\w+/);
  const val: RegExpMatchArray | null = instr.match(/.\w+$/);
  if (!action || !val) return acc;
  switch (action[0]) {
    case "jmp": {
      index += parseInt(val[0]);
      const returnVal: number = accAtFirstLoop(
        data[index],
        index,
        acc,
        indeces,
      );
      if (isNaN(returnVal)) {
        index++;
        return accAtFirstLoop(data[index], index, acc, indeces);
      } else return returnVal;
    }
    case "acc": {
      acc += parseInt(val[0]);
      index++;
      return accAtFirstLoop(data[index], index, acc, indeces);
    }
    default: {
      index++;
      const returnVal: number = accAtFirstLoop(
        data[index],
        index,
        acc,
        indeces,
      );
      if (isNaN(returnVal)) {
        index = (index - 1) + parseInt(val[0]);
        return accAtFirstLoop(data[index], index, acc, indeces);
      } else return returnVal;
    }
  }
};
const accTerm: number = accAtFirstLoop(data[0]);
console.log("Accumulator at first loop:", returnAcc);
console.log("Accumulator at end:", accTerm);
