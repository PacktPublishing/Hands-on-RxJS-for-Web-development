let Rx = window['rxjs'];
let {Observable} = Rx;

let observable = Observable.create((observer) => {

  let id = setInterval(() => {
    observer.next('hi')
    //observer.complete()
  }, 1000);
});

observable.subscribe(
  console.log, // onNext
  console.warn, // onError
  () => console.log('completeHandler') // onComplete
) // hi, hi, hi ....