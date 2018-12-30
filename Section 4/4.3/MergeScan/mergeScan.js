//html
<div class="container list"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><button class="more disabed">More...</button>  
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
const {interval, of, from, Subject, empty, fromEvent} = Rx;
const { ajax } = Rx.ajax;
let {mergeScan, delay, catchError, switchMap} = Rx.operators;
console.clear();

const itemsContainer = document.querySelector('.container');
const moreButton = document.querySelector('.more'); 

const fetchMoreEvents$ = fromEvent(moreButton, 'click');

const items$ = fetchMoreEvents$.pipe(
  mergeScan((prevAjaxResponse, next) => {
          if ('nextIndex' in prevAjaxResponse.response) {
            return ajax.get('http://127.0.0.1:4001/list-data?page=' + prevAjaxResponse.response.nextIndex)
          }
        return empty();
        },
        { response: {nextIndex: 1} }, // Initial acc value
        1 // Maximum concurrency, 1 - to prevent race conditions
    )
)
items$.subscribe(d => {
      d.response.data.forEach((item) => {
        
        const newSpan = document.createElement('span');
        newSpan.innerHTML = item;
        itemsContainer.insertBefore(newSpan, moreButton);
        
        if (!('nextIndex' in d.response)) moreButton.disabled = true;
      })
}); //Add new items to list