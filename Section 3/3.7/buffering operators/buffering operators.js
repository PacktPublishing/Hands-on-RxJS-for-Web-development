//bufferCount and bufferTime

let Rx = window['rxjs'];
let {interval, fromEvent, empty, timer} = Rx;
let {bufferTime, bufferCount } = Rx.operators;
console.clear();

const sourceInterval$ = timer(0, 1000); //emit value every second

const buffered$ = sourceInterval$.pipe(
  bufferCount(2,2) // bufferSize equals StartBufferEvery
  bufferCount(3,2) // bufferSize equals StartBufferEvery
  bufferCount(2,3) // bufferSize equals StartBufferEvery
  //bufferTime(3000)
)

buffered$.subscribe(x => console.log(x));



// buffer
let Rx = window['rxjs'];
let {interval, timer} = Rx;
let {buffer} = Rx.operators;
console.clear();

const source$ = timer(0, 1000);
const closingNotifier$ = interval(3000);
const buffered$ = source$.pipe(
  buffer(closingNotifier$)
 );
buffered$.subscribe(x => console.log(x));


// bufferWhen
let Rx = window['rxjs'];
let {interval, fromEvent} = Rx;
let {bufferWhen} = Rx.operators;
console.clear();

const source$ = interval(1000);
const closingNotifier$ = interval(2000);
const buffered$ = source$.pipe(
  bufferWhen(() => {
  console.log('Call factory function');
  return interval(3000)
})
 );
buffered$.subscribe(x => console.log(x));


// bufferToggle
let Rx = window['rxjs'];
let {interval, fromEvent, empty, timer} = Rx;
let {bufferToggle, share} = Rx.operators;
console.clear();

const sourceInterval$ = interval(1000); //emit value every second

const startInterval$ = interval(5000); //emit value every 5 seconds

const closingInterval = (val) => interval(3000); //emit value after 3s
//let counter = 0;
//const closingInterval = (val) => caounter++%2 ? interval(3000) : empty(); //emit value after 3s

//every 5s a new buffer will start, collecting values for 3s and emit
const buffered$ = sourceInterval$.pipe(
  bufferToggle(
    startInterval$,
    closingInterval
  )
);


buffered$.subscribe(x => console.log(x));