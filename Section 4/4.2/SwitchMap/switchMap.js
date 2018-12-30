//html 
 <div class="container">
    <div class="page-header">
      <h1>RxJS 6 SwitchMap </h1>
    </div>
    <div class="row-fluid">
      <form role="form">
        <div class="form-group">
          <label for="textInput">Search in Wikipedia</label>
          <input type="text" id="textInput" class="form-control" placeholder="Enter text..." autocomplete="off">
        </div>
      </form>
    </div>
    <div class="row-fluid">
      <ul id="results"></ul>
    </div>
  </div>

//css
li {
  cursor: pointer;
}

//js
let Rx = window['rxjs'];
const {ajax} = Rx.ajax;
const {fromEvent, Observable, of} = Rx;
let {tap, map, filter, debounceTime, distinctUntilChanged, switchMap, switchMapTo, switchAll} = Rx.operators;

function makeWikiSearch (value) {
    return $.ajax({
        url: 'https://en.wikipedia.org/w/api.php',
        dataType: 'jsonp',
        data: {
            action: 'opensearch',
            format: 'json',
            search: value
        }
    }).promise();
}

const $input = document.querySelector('#textInput');
const $results = $('#results');

// Get all distinct key up events from the input and only fire if long enough and distinct
fromEvent($input, 'keyup').pipe(
  map(e => e.target.value),
  debounceTime(750),
  distinctUntilChanged(),
  //map((text) => makeWikiSearch(text)),
  //switchAll()
  switchMap((text) => makeWikiSearch(text))
  //switchMapTo(makeWikiSearch('test'))
)
.subscribe(
    (response) => {
      const data = response[1];
      const listItems = data.map(str => $('<li>').text(str))
      $results.empty().append(listItems)
      $results.children().on('click', (event) => {
        $input.value = event.target.innerHTML;
        $results.empty()
      })
   }
);