let Rx = window['rxjs'];
const { from } = Rx;
const { distinctUntilChanged, distinct, distinctUntilKeyChanged } = Rx.operators;
console.clear();

from([1,2,3,4,4,5])
 // .pipe(distinctUntilChanged())

 // from([{v:1}, {v:2}, {v:2}, {v:3}])
   // .pipe(
      // distinctUntilChanged()
     // distinctUntilChanged((prev, next) => prev.v === next.v)
     // distinctUntilChanged(null, (item) => item.v)
     // distinct((item) => item.v)
     // distinctUntilKeyChanged('v')
 // )
 // from([{v:1}, {v:2}, {v:2}, {v:3}, {v:2}])
 //   .pipe(
 //     //distinct((item) => item.v)
 //      // distinctUntilKeyChanged('v')
 // )
.subscribe(
  (data) => console.log('onNext', data),
  (err) => console.log('onError', err)
)