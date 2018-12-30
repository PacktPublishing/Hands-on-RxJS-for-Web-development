
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
const { of } = Rx;
const { ajax } = Rx.ajax;
let { mergeMap, expand } = Rx.operators;
console.clear();

const list = document.querySelector('.list');
const moreButtton = document.querySelector('.more'); 

const getItems = (index, result = []) => {
  return ajax.get('http://127.0.0.1:4001/list-data?page=' + index).pipe(
  mergeMap(
        (d) => {
          result = result.concat(d.response.data)
          if ('nextIndex' in d.response) {
            return getItems(d.response.nextIndex, result);
          }
          debugger;
        return of(result);
        }, 
    null, // selector function - we don't need it here.
    1) // Maximum concurrency, 1 - to prevent race conditions
  )
}

getItems(0).subscribe(result => {

      result.forEach((item) => {
        const newSpan = document.createElement('span');
        newSpan.innerHTML = item;
        list.appendChild(newSpan);
      })
}); 