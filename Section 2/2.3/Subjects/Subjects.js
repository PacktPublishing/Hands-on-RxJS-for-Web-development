let Rx = window['rxjs'];
let {Subject, BehaviorSubject, ReplaySubject, AsyncSubject} = Rx;


let source$ = new Subject(); 
//let source$ = new BehaviorSubject(-1); // -1 is initial value
//let source$ = new ReplaySubject(3);
//let source$ = new AsyncSubject(); 
let counter = 0;

let clearId = setInterval(() => {
  console.log('source$ value', counter);
  source$.next(counter++);
}, 1000);

source$.subscribe((data) => console.log('Observer 1: ', data));

setTimeout(() => {
  source$.subscribe((data) => console.log('Observer 2: ', data));
}, 2500);

setTimeout(() => {
  source$.complete();
  clearInterval(clearId);
}, 5000);
