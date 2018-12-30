//html

<div class="container">    
    <div class="card wrapper">
      <div class="card-header">
        <h5>'repeatWhen' example</h5>
      <button class="btn btn-danger pause-btn">Pause</button>
      </div>
      <div class="card-body list">
        <ul class="list-group">
        </ul>
      </div>
    </div>
 </div>


//css
h3 {
  float: left;
}

.wrapper {
  width: 90%;
}

.card-header h5 {
  display: inline;
  line-height: 38px;
}

.pause-btn {
  float: right;
  margin-right: 5px;
}

//js
let Rx = window['rxjs'];
const {Subject, of, forkJoin, fromEvent, EMPTY} = Rx;
const { ajax } = Rx.ajax;
let {map, switchMap, delay, startWith, repeatWhen, tap} = Rx.operators;
console.clear();

const list = document.querySelector('.list-group');

const pauseBtnClick$ = (function() {
 let repeatStatus = true;
 const pauseBtn = document.querySelector('.pause-btn');
 return fromEvent(pauseBtn, 'click').pipe(
    map(() => {
      repeatStatus = !repeatStatus;
      return repeatStatus;
    }),
   tap((repeatStatus) => {  
     pauseBtn.innerHTML = repeatStatus ? 'Pause' : 'Resume';
     pauseBtn.classList.toggle('btn-danger');
     pauseBtn.classList.toggle('btn-success');
   }),
  startWith(true)
);
})()

const getData = (timeSec) => ajax.get('http://localhost:4001/list-data')
.pipe(
  repeatWhen((notification) => notification.pipe(
    delay(timeSec * 1000)
  )
))

let repetableObservable$ = getData(3);

const result$ = pauseBtnClick$.pipe(
  switchMap((repeatStatus) => {
    console.log('repeatStatus ', repeatStatus);
   if (repeatStatus) {
      return repetableObservable$
    }
    return EMPTY;
  })
)
      
result$.subscribe(
  (response) => updateListView(response),
  console.warn
)

function updateListView(response) {
  console.log(response);
  const items  = response.response.data;
  list.innerHTML = ''
  items.forEach((itemText) => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.innerHTML = itemText;
    list.append(listItem);
  })
}