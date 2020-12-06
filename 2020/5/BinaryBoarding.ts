const data: string[] = Deno.readTextFileSync(Deno.args[0]).split("\n")
  .filter((x: string): boolean => Boolean(x));

const seatIDs: number[] = data.map((seat: string): number => {
  const findNum = (index: number, min: number, max: number): number => {
    if (min === max) return min;
    const avg = Math.round((min + max) / 2);
    if (seat[index].match(/(F|L)/)) return findNum(index + 1, min, avg - 1);
    else return findNum(index + 1, avg, max);
  };
  return (findNum(0, 0, 127) * 8 + findNum(7, 0, 7));
});
const maxSeat: number = Math.max(...seatIDs);
let mySeat: number = 0;
for (let i = Math.min(...seatIDs) + 1; i < maxSeat; i++) {
  if (!seatIDs.includes(i)) mySeat = i;
}

console.log("Max seat number:", maxSeat);
console.log("Your seat number:", mySeat);
