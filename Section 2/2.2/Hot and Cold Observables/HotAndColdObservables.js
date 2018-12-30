let Rx = window['rxjs'];
let {interval} = Rx;
let {take, publish, publishReplay} = Rx.operators

//let source$ = interval(1000).pipe(take(2))
let source$ = interval(1000).pipe(take(3),publish());
//let source$ = interval(1000).pipe(take(3),publishReplay(3));
source$.connect();

source$.subscribe((data) => console.log('Observer 1: ', data));
setTimeout(() => {
  source$.subscribe((data) => console.log('Observer 2: ', data));
}, 2500)