let Rx = window['rxjs'];
const { interval, of } = Rx;
const { take, map, catchError } = Rx.operators;

 interval(500).pipe(
   take(4),
  // map(x => {
  //   if (x === 2) throw {code: 404, message: "not found"}
  //   return x;
  // }),
  //  catchError(err => of(err))
 )
.subscribe(
  (data) => console.log('onNext', data),
  (err) => console.log('onError', err)
)