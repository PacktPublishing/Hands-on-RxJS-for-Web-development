// js

let Rx = window['rxjs'];
const { of } = Rx;
const { ajax } = Rx.ajax;
let { mergeMap, mergeAll, bufferCount } = Rx.operators;
console.clear();

const getAllIds = () => of([1,2,3,4,5,6,7,8,9,10])
getAllIds().subscribe((data) => console.log('Initial array', data));

const deleteFromDB = (chunkIds) => {
  console.log('Ids to delete ', chunkIds);
  // return ajax.post('https://some_url/delete', {ids: chunkIds})
  return of({success: true, ids: chunkIds});
}

const deleteChunked = () => {
  return getAllIds().pipe(
    mergeAll(), // emits one by one 1..2..3..4....10
    bufferCount(2,2), // emits [1,2] , [3,4] .... [9, 10]
    mergeMap((chunkIds) => deleteFromDB(chunkIds))
  )
} 

deleteChunked().subscribe((data, index) => console.log('Deleted data', data))

