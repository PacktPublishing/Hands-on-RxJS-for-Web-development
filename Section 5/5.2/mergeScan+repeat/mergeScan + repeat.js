//html
<div class="container list"><button class="more disabed">More...</button>  
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
const {interval, of, from, Subject, empty, fromEvent, concat, defer} = Rx;
const { ajax } = Rx.ajax;
let {mergeScan, delay, catchError, repeat} = Rx.operators;
console.clear();

const itemsContainer = document.querySelector('.container');
const moreButton = document.querySelector('.more'); 
const baseUrl = 'http://127.0.0.1:4001/list-data?page=';


const getInitialData = (prefetchPages) => {
  let counter=0;
  return defer(() => ajax(baseUrl + counter++)).pipe(repeat(prefetchPages));
}

const getItems = (prefetchPages) => {
  const initialData$ = getInitialData(prefetchPages);
  
  const fetchMoreEvents$ = fromEvent(moreButton, 'click');
  const moreItems$ = fetchMoreEvents$.pipe(
        mergeScan((prevAjaxResponse, next) => {
                if ('nextIndex' in prevAjaxResponse.response) {
                  return ajax.get(baseUrl + prevAjaxResponse.response.nextIndex)
                }
              return empty();
              },
              { response: {nextIndex: prefetchPages} }, // Initial acc value
              1 // Maximum concurrency, 1 - to prevent race conditions
            )
          )

  return concat(initialData$, moreItems$);
}

const allItems$ = getItems(2);


allItems$.subscribe(d => {
      d.response.data.forEach((item) => {
        
        const newSpan = document.createElement('span');
        newSpan.innerHTML = item;
        itemsContainer.insertBefore(newSpan, moreButton);
        
        if (!('nextIndex' in d.response)) moreButton.disabled = true;
      })
}); //Add new items to list