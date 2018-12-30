// examples 1-2-3-4

let Rx = window['rxjs'];
const {ajax} = Rx.ajax;
const {fromEvent, Observable, of} = Rx;
let {map, filter, debounceTime, distinctUntilChanged, switchMap, switchMapTo, switchAll, tap, timestamp, materialize, dematerialize} = Rx.operators;
console.clear();

function makeWikiSearch (value) {
    return $.ajax({
        url: 'https://en.wikipedia.org/w/api.php',
        dataType: 'jsonp',
        data: {
            action: 'opensearch',
            format: 'json',
            search: value
        }
    }).promise();
}

const $input = document.querySelector('#textInput');

// 2.tap
const output$ = fromEvent($input, 'keyup').pipe(
  map(e => e.target.value),
  tap((value) => console.log('value after map ', value)),
  filter(text => text.length > 2),
  debounceTime(750),
  distinctUntilChanged(),
  tap((value) => console.log('value after distinct ', value)),
  switchMap((text) => makeWikiSearch(text))
)
output$.subscribe();

// 3.timestamp
// const output$ = fromEvent($input, 'keyup').pipe(
//   map(e => e.target.value),
//   filter(text => text.length > 2),
//   debounceTime(750),
//   distinctUntilChanged(),
//   timestamp(),
//   tap((value) => console.log('value after distinct ', value)),
//   switchMap((text) => makeWikiSearch(text))
// )
// output$.subscribe()


// 4. materialize/dematerialize
// const output$ = fromEvent($input, 'keyup').pipe(
//   map(e => e.target.value),
//   filter(text => text.length > 2),
//   debounceTime(750),
//   distinctUntilChanged(),
//   materialize(),
//   tap((value) => console.log('value after distinct ', value)),
//   dematerialize(),
//   switchMap((text) => makeWikiSearch(text))
// )
// output$.subscribe();






// materialize/dematerialize - second example
let Rx = window['rxjs'];
const {range, 
       combineLatest,
       interval,
       Subject,
       queueScheduler,
       asapScheduler,
       asyncScheduler,
       animationFrameScheduler,
       VirtualTimeScheduler,
       timer
      } = Rx;
const {observeOn, subscribeOn, map, timestamp, materialize, tap, dematerialize} = Rx.operators;
console.clear();


let source = range(0, 5)
.pipe(
  map((x) => {
    if (x > 3) {throw new Error();}
    return x;
  }),
  materialize(),
  tap(console.log),
  dematerialize()
);

source.subscribe(console.log, console.warn)


//rxjs-spy
// https://unpkg.com/rxjs-spy@7/bundles/rxjs-spy.min.umd.js
let Rx = window['rxjs'];
const {range, 
       combineLatest,
       interval,
       Subject,
       queueScheduler,
       asapScheduler,
       asyncScheduler,
       animationFrameScheduler,
       VirtualTimeScheduler,
       timer
      } = Rx;
const {map, timestamp, materialize, tap, dematerialize} = Rx.operators;
const { create, detect } = rxjsSpy;
const { tag } = rxjsSpy.operators

console.clear();


window.spy = create();

let source = interval(1000)
.pipe(
  map((x) => x + 1),
  tag('interval1')
);

let source2 = interval(500)
.pipe(
  map((x) => x + 10),
  tag('interval2')
);

source.subscribe();
source2.subscribe();

