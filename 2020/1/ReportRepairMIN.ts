const i = Deno.readTextFileSync(Deno.args[0]).split('\n').map((x)=>+x);

for (let n of i) {
  let l = 2020-n;
  i.includes(n)?console.log(`Part 1 answer: ${n*l}`):0;
  break;
}

(()=>{
  for (let n of i) {
    let r = 2020-n;
    for (let o of i) {
      if (o===n) continue;
      let p = r-o;
      if (i.includes(p)) { console.log(`Part 2 answer: ${n*o*p}`); return }
    }
  }
})();