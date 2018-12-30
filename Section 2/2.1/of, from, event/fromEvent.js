//html
<input type="text" id="myinput" class="form-control" placeholder="Enter text...">
//js

let Rx = window.Rx = window['rxjs'];
let {map, debounceTime} = Rx.operators;

const inputElement = document.querySelector('#myinput');

Rx.fromEvent(inputElement, 'keyup').pipe(
  map(e => e.target.value),
  debounceTime(750),
)
.subscribe(
console.log
);