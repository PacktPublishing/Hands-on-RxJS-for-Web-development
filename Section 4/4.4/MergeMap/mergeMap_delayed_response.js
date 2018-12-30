//html
<div class="container list">  
</div>

//css
.container {
  margin: 15px;
  border: 1px solid silver;
  position: fixed;
  overflow: auto;
  width: 80%;
  height: 400px;
  background-color: white;
}

span {
  display: inline-block;
  width: 50px;
  height: 50px;
  margin: 3px;
  border: 1px solid blue;
  line-height: 50px;
  text-align: center;
}


//js
let Rx = window['rxjs'];
const { of, throwError } = Rx;
const { ajax } = Rx.ajax;
let { mergeMap, delay, mergeMapTo } = Rx.operators;
console.clear();

const list = document.querySelector('.list');
const requestUrl = 'http://127.0.0.1:4001/request-data';
const responseUrl = 'http://127.0.0.1:4001/get-response?dataId='

const getItems = (url, maxCounter, dataId) => {
  if (maxCounter === 0) return throwError({message: 'max retry count exceeded'});
  
  return ajax.get(url).pipe(
   mergeMap(
        (d) => {
          if ('dataId' in d.response) {
            dataId = d.response.dataId;
            return getItems(responseUrl + dataId, maxCounter, dataId);
          }
          
          if (d.response.ready) {
            return of(d.response.data)
          } else {
            return of(1).pipe(
              delay(1000),
              mergeMapTo(getItems(responseUrl + dataId, maxCounter - 1, dataId)));
          }
        }, 
    null, // selector function - we don't need it here.
    1) // Maximum concurrency, 1 - to prevent race conditions
  )
}

getItems(requestUrl, 5, null).subscribe(
  result => {
      result.forEach((item) => {
        const newSpan = document.createElement('span');
        newSpan.innerHTML = item;
        list.appendChild(newSpan);
      })
   },
  err => console.warn(err.message)
); 