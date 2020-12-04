const data: string[] = Deno.readTextFileSync(Deno.args[0]).split("\n\n");

const reqFields: string[] = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
const validEcl: string[] = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
let validPPs: number = 0;
for (const passport of data) {
  let valid: boolean = true;
  for (const reqField of reqFields) {
    const field: string | undefined = passport.split(/( |\n)/)
      .find((x: string): boolean => x.startsWith(reqField));
    if (!field) {
      valid = false;
      break;
    }
    const value: string = field.split(":")[1];
    const isInRange = (low: number, high: number, num: number): boolean => {
      return (low <= num && num <= high);
    };
    switch (reqField) {
      case "byr":
        valid = isInRange(1920, 2002, +value);
        break;
      case "iyr":
        valid = isInRange(2010, 2020, +value);
        break;
      case "eyr":
        valid = isInRange(2020, 2030, +value);
        break;
      case "hgt":
        if (value.endsWith("cm")) valid = isInRange(150, 193, parseInt(value));
        else if (value.endsWith("in")) valid = isInRange(59, 76, parseInt(value));
        else valid = false;
        break;
      case "hcl":
        valid = Boolean(value.match(/#[\da-f]{6}/));
        break;
      case "ecl":
        valid = Boolean(validEcl.find((x: string):boolean => x === value));
        break;
      case "pid":
        valid = value.length === 9 && Boolean(value.match(/\d{9}/));
    }
    if (!valid) break;
  }
  if (valid) {
    validPPs++;
  }
}
console.log("Valid passports:", validPPs);