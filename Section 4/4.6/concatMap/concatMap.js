//html
<div class="container">    
    <div class="card wrapper">
      <div class="card-header">
        <h3>ConcatMap Example</h3>
      </div>
      <div class="card-body list">
        <ul class="list-group">
          <li class="list-group-item" id="item1">item1 <button type="button" class="btn btn-danger" onclick="deleteClick(1)">Delete</button></li>
          <li class="list-group-item" id="item2">item2 <button type="button" class="btn btn-danger" onclick="deleteClick(2)">Delete</button></li>
          <li class="list-group-item" id="item3">item3 <button type="button" class="btn btn-danger" onclick="deleteClick(3)">Delete</button></li>
        </ul>
      </div>
    </div>
 </div>


//css
.wrapper {
  width: 90%;
}

.card-header h3 {
  display: inline;
}

button {
  float: right;
  margin-right: 5px;
}


//js
let Rx = window['rxjs'];
const {Subject, of} = Rx;
const { ajax } = Rx.ajax;
let {concatMap, mergeMap, delay} = Rx.operators;
console.clear();

const deleteSubject = new Subject();

const deleteClick = (id) => deleteSubject.next(id);
const deleteItem = (id) => {
  // return ajax.post(deleteUrl, headers, {id})
  return of({id}).pipe(delay(2000));
}
const deleteItems$ = deleteSubject.asObservable().pipe(
        concatMap(
            (id, index) => {
                if (index === 1) {
                    return deleteItem(id).pipe(delay(2000))
                }
                return deleteItem(id)
            },
            null) // selector function - we don't need it here.
);

deleteItems$.subscribe((response) => {
  console.log('Item to delete:', response);
    document.querySelector(`#item${response.id}`).remove();
});