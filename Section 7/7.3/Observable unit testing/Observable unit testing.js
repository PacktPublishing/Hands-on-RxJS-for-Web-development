//links for codepen
//js
https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.3.1/rxjs.umd.js
https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js
https://cdnjs.cloudflare.com/ajax/libs/jasmine/3.3.0/jasmine.min.js
https://cdnjs.cloudflare.com/ajax/libs/jasmine/3.3.0/jasmine-html.min.js
https://cdnjs.cloudflare.com/ajax/libs/jasmine/3.3.0/boot.js
//css
https://cdnjs.cloudflare.com/ajax/libs/jasmine/3.3.0/jasmine.css


//Unit tests

// done callback
let Rx = window['rxjs'];
const {of, 
       defer,       
       queueScheduler,
       asapScheduler,
       asyncScheduler,
       animationFrameScheduler,
       VirtualTimeScheduler} = Rx;
const {map} = Rx.operators;
const {TestScheduler} = Rx.testing;
console.clear();

const {ajax} = Rx.ajax;

const getRange = () => {
    return of(0, 1, 2, 3).pipe(
      map(x => x + 1)
    )
  }

const getRangeAsync = () => {
    return of(0, 1, 2, 3, asyncScheduler)
      .pipe(
        map(x => x + 1)
      )
  }

describe('testing Sync sequences', () => {
  it('getRange should return 1..2..3..4 values', () => {
    let result: number[] = [];

    getRange().subscribe(value => result.push(value));
    expect(result).toEqual([1,2,3,4]);
  });
});

 describe('testing getRangeAsync with Async sequences', () => {
    it('getRangeAsync should return 1..2..3..4 values - no DONE callback', () => {
      let result: number[] = [];

      getRangeAsync().subscribe(value => result.push(value));

      expect(result).toEqual([1, 2, 3, 4]);
    });

    it('getRangeAsync should return 1..2..3..4 values - with DONE callback', (done) => {
      let result: number[] = [];

      getRangeAsync().subscribe(
        value => result.push(value),
        null,
        () => {
          expect(result).toEqual([1, 2, 3, 4]);
          done();
        }
      );
    });
  });




// VirtualScheduler
let Rx = window['rxjs'];
const {of, 
       defer,       
       queueScheduler,
       asapScheduler,
       asyncScheduler,
       animationFrameScheduler,
       VirtualTimeScheduler} = Rx;
const {take, repeatWhen, repeat, delay} = Rx.operators;
const {TestScheduler} = Rx.testing;
console.clear();

const {ajax} = Rx.ajax;

const getData = (timeSec, sched) => ajax.get('http://localhost:4001/list-data')
.pipe(
  repeatWhen((notification) => notification.pipe(
    delay(timeSec * 1000, sched),
    take(2)
  )
))

xdescribe('getData with VirtualTimeScheduler', () => {
	let oldAjaxGet, mockData;
	beforeEach(() => {
		oldAjaxGet = ajax.get;
		mockData = {salary: 10000}
		ajax.get = () => defer(()=>of(mockData));
	});

	afterEach(() => { ajax.get = oldAjaxGet;})

	it('should return expected data 3 times', () => {
		let cumulativeArray = [];
		const sched = new VirtualTimeScheduler();

		getData(1, sched).subscribe((data) => {
      console.log('tt')
			cumulativeArray.push(data)
		});
    sched.flush();
		expect(cumulativeArray.length).toEqual(3);
		expect(cumulativeArray[cumulativeArray.length-1]).toEqual(mockData);
	})
})




// TestScheduler.run
let Rx = window['rxjs'];
const {of, 
       defer,       
       queueScheduler,
       asapScheduler,
       asyncScheduler,
       animationFrameScheduler,
       VirtualTimeScheduler} = Rx;

const {take, repeatWhen, repeat, delay} = Rx.operators;
const {TestScheduler} = Rx.testing;
console.clear();
const {ajax} = Rx.ajax;

const createTestScheduler = () => {
  return new TestScheduler((actual, expected) => {
  console.log('expected', actual, expected);
  expect(_.isEqual(actual, expected)).toBeTruthy();
});
}


const getData = (timeSec) => ajax.get('http://localhost:4001/list-data')
.pipe(
  repeatWhen((notification) => notification.pipe(
    delay(timeSec * 1000),
    take(2)
  )
))


describe('repeatWhen with scheduler.run', () => {
   let oldValue, scheduler;
    beforeEach(() =>{
      scheduler = createTestScheduler();
      oldValue = ajax.get
    });
  
  afterEach(() => { ajax.get = oldValue;});
  
    it('should repeat initial ajax call in 1 second', () => {
    scheduler.run((helpers) =>{ 
      const { cold, hot, expectObservable } = helpers;
      const valuesMap = {a: 5};
      let mock = cold('a|', valuesMap);
      ajax.get = jasmine.createSpy('ajax.get').and.returnValue(mock);
      
      const expected = "a 1s a 1s a|";

      expectObservable(getData(1)).toBe(expected, valuesMap);
    })
  })
})



// TestScheduler.run with switchMap
let Rx = window['rxjs'];
const {of, 
       defer,       
       queueScheduler,
       asapScheduler,
       asyncScheduler,
       animationFrameScheduler,
       VirtualTimeScheduler} = Rx;
const {switchMap, repeat, tap, filter, debounceTime, distinctUntilChanged} = Rx.operators;
const {TestScheduler} = Rx.testing;
console.clear();

const {ajax} = Rx.ajax;

let makeWikiSearch;
const $input = document.querySelector('#textInput');

const getInputObservable = () => Rx.fromEvent($input, 'keyup').pipe(
  // map(e => e.target.value),
  filter(text => text.length > 2),
  debounceTime(750),
  distinctUntilChanged(),
  switchMap((text) => makeWikiSearch(text))
)

const scheduler = new TestScheduler((actual, expected) => {
  console.log('expected', actual, expected);
  expect(_.isEqual(actual, expected)).toBeTruthy();
});


describe('switchMap', () => {
   let oldValue, oldValue2;
    beforeEach(() =>{
      oldValue = Rx.fromEvent;
      oldValue2 = makeWikiSearch
    });
  
  afterEach(() => {
    Rx.fromEvent = oldValue;
    makeWikiSearch = oldValue2;
  });
  
    it('should repeat initial ajax call in 1 second', () => {
      scheduler.run((helpers) =>{ 
        const { cold, hot, expectObservable, expectSubscriptions, flush } = helpers;

        Rx.fromEvent = () => cold('a 800ms b 700ms c 1700ms |', {a: 'a', b: 'aaa', c: 'aaab'});
        makeWikiSearch = () => cold("(a|)", {a: ['text1','text2','text3']});

        const expected = "2252ms r 950ms |";

        expectObservable(getInputObservable()).toBe(expected, {r: ['text1','text2','text3']});
      })
    })
})




// TestScheduler.run vs TestScheduler
let Rx = window['rxjs'];
const {of, 
       defer,       
       queueScheduler,
       asapScheduler,
       asyncScheduler,
       animationFrameScheduler,
       VirtualTimeScheduler} = Rx;

const {take, repeatWhen, repeat, delay} = Rx.operators;
const {TestScheduler} = Rx.testing;
console.clear();
const {ajax} = Rx.ajax;

const createTestScheduler = () => {
  return new TestScheduler((actual, expected) => {
  console.log('expected', actual, expected);
  expect(_.isEqual(actual, expected)).toBeTruthy();
});
}


const getData = (timeSec) => ajax.get('http://localhost:4001/list-data')
.pipe(
  repeatWhen((notification) => notification.pipe(
    delay(timeSec * 1000),
    take(2)
  )
))


describe('repeatWhen with scheduler.run', () => {
   let oldValue, scheduler;
    beforeEach(() =>{
      scheduler = createTestScheduler();
      oldValue = ajax.get
    });
  
  afterEach(() => { ajax.get = oldValue;});
  
    it('should repeat initial ajax call in 1 second', () => {
    scheduler.run((helpers) =>{ 
      const { cold, hot, expectObservable } = helpers;
      const valuesMap = {a: 5};
      let mock = cold('a|', valuesMap);
      ajax.get = jasmine.createSpy('ajax.get').and.returnValue(mock);
      
      const expected = "a 1s a 1s a|";

      expectObservable(getData(1)).toBe(expected, valuesMap);
    })
  })
})


describe('repeatWhen with testScheduler.flush', () => {
   let oldValue, scheduler;
    beforeEach(() =>{
      scheduler = createTestScheduler();
      oldValue = ajax.get;
      asyncScheduler.constructor.delegate = scheduler;
    });
  
  afterEach(() => {
    ajax.get = oldValue;
    asyncScheduler.constructor.delegate = undefined;
  });
  
  it('should repeat initial ajax call in 1 second', () => {
    scheduler.maxFrames = 10000;
    const valuesMap = {a: 4};
    let mock = scheduler.createColdObservable('(a|)', valuesMap);
    ajax.get = () => mock;
    const expected = "aa(a|)";

    scheduler.expectObservable(getData(0.01)).toBe(expected, valuesMap);
    
    scheduler.flush();
  })
})




