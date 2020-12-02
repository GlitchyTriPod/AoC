const n = Deno.readTextFileSync(Deno.args[0]);
let f = 0;
let e = false;
for (let i = 0; i< n.length; i++) {
  n[i]==='('?f++:f--;
  if (!e&&f===-1) {e = true; console.log(`Santa entered basement on position ${i+1}`)};
}
console.log(`Santa is on floor ${f}`);