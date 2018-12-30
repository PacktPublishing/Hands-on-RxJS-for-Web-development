let Rx = window['rxjs'];
let defer = Rx.defer;
let of = Rx.of;

function ObservableFactory(n) {
  return of(n)
}
let counter = 0;
let source$ = defer(() => ObservableFactory(counter++));

source$.subscribe((data) => console.log('1: ', data));
source$.subscribe((data) => console.log('2: ', data));