//js

let Rx = window['rxjs'];
const {of, throwError} = Rx;
const {take, retryWhen, mergeMap, delay, concat} = Rx.operators;
const {ajax} = Rx.ajax;
console.clear();

const getData = (counter) => ajax('http://localhost:4001/list-data').pipe(
  retryWhen(
    (error) => error.pipe(
      delay(1000), 
      take(counter), 
      concat(throwError({error: 'Sorry, there was an error (after 3 retries)'}))
    )
  )
)

// const getData = (counter) => ajax('http://localhost:4001/list-data').pipe(
//   retryWhen(
//     (error) => {
//         console.log('retryWhen callback run: ');
//         return error.pipe(
//           mergeMap((errorMessage, index) => {
//             console.log('index = ', index);
//             return of(1).pipe(delay(1000 * (index + 1)));
//           }),
//           take(counter),
//           concat(throwError({error: 'Sorry, there was an error (after +'+counter+'+ retries)'}))
//           )
//   })
// )

let retriableObservable = getData(5);

retriableObservable.subscribe(
  (data) => console.log('onNext handler run:', data.response),
  (errorMessage) => console.warn('Error handler run: ', errorMessage)
)