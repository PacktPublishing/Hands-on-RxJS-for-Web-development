//js
let Rx = window['rxjs'];
const {defer} = Rx;
const {take, repeat} = Rx.operators;
const {ajax} = Rx.ajax;
console.clear();

let counter=0;
const getData = () => defer(() => ajax('http://localhost:4001/list-data?page='+counter++))
.pipe(repeat(2))

let repetableObservable = getData();

repetableObservable.subscribe(
  (data) => console.log(data.response),
  console.warn
)
