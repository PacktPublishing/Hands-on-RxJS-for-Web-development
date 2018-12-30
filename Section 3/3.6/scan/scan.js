let Rx = window['rxjs'];
let {from} = Rx;
let {scan, map} = Rx.operators;
console.clear();

from([1,2,3,4,5]) // emits values 1,2,3,4,5
.pipe(
  scan((acc, next) => acc + next, 0),
  map((x, index) => x/(index+1))
)
.subscribe((x) => console.log(x));