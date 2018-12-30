//js

let Rx = window['rxjs'];
const {interval, 
       BehaviorSubject,
       Subject,
       asyncScheduler
      } = Rx;
const {tap, map, observeOn, first} = Rx.operators;
console.clear();

const dispatcher = (new Subject())
.pipe(observeOn(asyncScheduler));

let did = false; // condition

dispatcher.pipe(
  tap((value) => {
		if(!did) {
			did = true;
			dispatcher.next("SECOND");
		}
	}))
	.subscribe(console.log);

dispatcher.next("INITIAL");