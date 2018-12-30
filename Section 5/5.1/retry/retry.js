//js

let Rx = window['rxjs'];

const {take, retry} = Rx.operators;
const {ajax} = Rx.ajax;
console.clear();

const getData = () => ajax('http://localhost:4001/list-data').pipe(
  retry(4)
)
let retriableObservable = getData();

retriableObservable.subscribe(
  (data) => console.log(data.response),
  console.warn
)