let Rx = window.Rx = window['rxjs'];
let {map, debounceTime} = Rx.operators;
let {fromEvent} = Rx;

const inputElement = document.querySelector('#myinput');

fromEvent(inputElement, 'keyup').pipe(
  map(e => e.target.value),
  debounceTime(750),
)
.subscribe(
console.log
);